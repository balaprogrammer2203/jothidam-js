import RolePermission, { DEFAULT_ROLE_PERMISSIONS } from '../models/RolePermission.js';

/**
 * Middleware to check if user's role has permission for an action on a table
 * @param {'read' | 'create' | 'update' | 'delete'} action
 */
export const enforcePermission = (action) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const { table } = req.params;

      // If no table in params, skip to next
      if (!table) return next();

      // If no authenticated user attached (e.g. if open route or public query), allow or check
      if (!user || !user.role) {
        return next();
      }

      // Super Admin has unrestricted bypass
      if (user.role === 'superadmin') {
        return next();
      }

      // Fetch dynamic role permission from DB (or fallback to defaults)
      let rolePerm = await RolePermission.findOne({ role: user.role }).lean();
      if (!rolePerm) {
        rolePerm = DEFAULT_ROLE_PERMISSIONS[user.role];
      }

      if (!rolePerm) {
        return res.status(403).json({
          success: false,
          error: `பயனர் நிலை '${user.role}' க்கான அனுமதி அமைப்புகள் கிடைக்கவில்லை (Permissions not found).`
        });
      }

      // Check table permission
      const tablePerm = rolePerm.tablePermissions?.[table];
      const isAllowed = tablePerm ? !!tablePerm[action] : false;

      if (!isAllowed) {
        const actionTaMap = {
          read: 'பார்வையிட (View / Read)',
          create: 'புதிய பதிவு சேர்க்க (Create)',
          update: 'திருத்த (Edit / Update)',
          delete: 'நீக்க (Delete)'
        };

        return res.status(403).json({
          success: false,
          error: `'${table}' அட்டவணையில் ${actionTaMap[action] || action} உங்கள் பயனர் நிலைக்கு (${user.role.toUpperCase()}) அனுமதி இல்லை (Access Denied: You lack ${action} permission on ${table}).`
        });
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      next();
    }
  };
};
