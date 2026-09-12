import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'jothidam_portal_jwt_secret_key_2026';

/**
 * Verify Bearer JWT Token
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'அங்கீகார டோக்கன் தேவை (Authorization token required).'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'பயனர் கணக்கு காணப்படவில்லை (User not found).'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'உங்கள் கணக்கு முடக்கப்பட்டுள்ளது (Your account is deactivated).'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'செல்லுபடியாகாத அங்கீகார டோக்கன் (Invalid or expired token).'
    });
  }
};

/**
 * Require specific user role(s)
 */
export const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'அங்கீகரிக்கப்படாத அணுகல் (Unauthorized access).'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `அணுகல் அனுமதி இல்லை (Access denied. Required role: ${allowedRoles.join(' or ')}).`
      });
    }

    next();
  };
};
