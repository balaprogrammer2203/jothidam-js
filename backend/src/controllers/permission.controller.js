import RolePermission, { DEFAULT_ROLE_PERMISSIONS } from '../models/RolePermission.js';

/**
 * Ensure role permissions exist in MongoDB, initialize or upgrade schema if needed
 */
export const ensureDefaultPermissions = async () => {
  try {
    const roles = Object.keys(DEFAULT_ROLE_PERMISSIONS);
    for (const roleKey of roles) {
      const defaultData = DEFAULT_ROLE_PERMISSIONS[roleKey];
      const exists = await RolePermission.findOne({ role: roleKey });
      if (!exists) {
        await RolePermission.create(defaultData);
      } else {
        // Upgrade legacy names if needed
        if (exists.name?.includes('(') || !exists.nameHi) {
          exists.name = defaultData.name;
          exists.nameTa = defaultData.nameTa;
          exists.nameHi = defaultData.nameHi;
          exists.nameTe = defaultData.nameTe;
          exists.nameKn = defaultData.nameKn;
          exists.nameMl = defaultData.nameMl;
          await exists.save();
        }
      }
    }
  } catch (err) {
    console.error('Error ensuring default permissions:', err);
  }
};

/**
 * Get all role permissions
 */
export const getAllPermissions = async (req, res) => {
  try {
    await ensureDefaultPermissions();
    const permissions = await RolePermission.find().lean();
    
    // Format into map keyed by role
    const permissionsMap = {};
    permissions.forEach((p) => {
      permissionsMap[p.role] = p;
    });

    res.status(200).json({
      success: true,
      data: permissionsMap
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get permissions for a specific role
 */
export const getRolePermission = async (req, res) => {
  try {
    const { role } = req.params;
    let perm = await RolePermission.findOne({ role }).lean();
    if (!perm && DEFAULT_ROLE_PERMISSIONS[role]) {
      perm = await RolePermission.create(DEFAULT_ROLE_PERMISSIONS[role]);
    }

    if (!perm) {
      return res.status(404).json({ success: false, error: `Role '${role}' not found.` });
    }

    res.status(200).json({ success: true, data: perm });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Update permissions for a specific role
 */
export const updateRolePermission = async (req, res) => {
  try {
    const { role } = req.params;
    const updateData = req.body;
    const clientLang = req.headers['accept-language'] || req.query.lang || 'en';

    // Super Admin cannot revoke its own core admin privileges
    if (role === 'superadmin') {
      updateData.canAccessAdmin = true;
      updateData.canManagePermissions = true;
      updateData.canManageUsers = true;
    }

    const updated = await RolePermission.findOneAndUpdate(
      { role },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    const localizedRoleName = clientLang === 'ta' ? (updated.nameTa || updated.name) : updated.name;

    res.status(200).json({
      success: true,
      message: `Permissions updated successfully for '${localizedRoleName}'.`,
      data: updated
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Reset all permissions to factory defaults
 */
export const resetPermissionsToDefault = async (req, res) => {
  try {
    const roles = Object.keys(DEFAULT_ROLE_PERMISSIONS);
    for (const roleKey of roles) {
      await RolePermission.findOneAndUpdate(
        { role: roleKey },
        { $set: DEFAULT_ROLE_PERMISSIONS[roleKey] },
        { upsert: true }
      );
    }

    const all = await RolePermission.find().lean();
    res.status(200).json({
      success: true,
      message: 'All role permissions have been reset to factory defaults.',
      data: all
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
