import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../middleware/auth.middleware.js';

/**
 * Login with username and password
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'பயனர்பெயர் மற்றும் கடவுச்சொல் கட்டாயமாகும் (Username and Password are required).'
      });
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const user = await User.findOne({ username: cleanUsername });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல் (Invalid username or password).'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'உங்கள் கணக்கு முடக்கப்பட்டுள்ளது (Your account has been deactivated).'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல் (Invalid username or password).'
      });
    }

    // Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT Token (valid 7 days)
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        fullName: user.fullName
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள் (Login successful).',
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get current authenticated user details
 */
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Seed Default Users if none exist
 */
export const seedDefaultUsers = async (req, res) => {
  try {
    const defaultUsers = [
      {
        username: 'superadmin',
        password: 'Admin@123',
        fullName: 'Super Administrator',
        email: 'superadmin@jothidam.portal',
        role: 'superadmin',
        preferredLanguage: 'en',
        isActive: true
      },
      {
        username: 'admin',
        password: 'Admin@123',
        fullName: 'System Administrator',
        email: 'admin@jothidam.portal',
        role: 'admin',
        preferredLanguage: 'en',
        isActive: true
      },
      {
        username: 'user',
        password: 'User@123',
        fullName: 'Standard User',
        email: 'user@jothidam.portal',
        role: 'user',
        preferredLanguage: 'en',
        isActive: true
      }
    ];

    const results = [];
    for (const u of defaultUsers) {
      const exists = await User.findOne({ username: u.username });
      if (!exists) {
        const created = new User(u);
        await created.save();
        results.push({ username: u.username, role: u.role, status: 'created' });
      } else {
        // If legacy mixed Tamil fullName is present, normalize it to clean English name
        if (exists.fullName.includes('(') || exists.fullName.includes('கண்காணிப்பாளர்') || exists.fullName.includes('நிர்வாகி') || exists.fullName.includes('பயனர்')) {
          exists.fullName = u.fullName;
          await exists.save();
        }
        results.push({ username: u.username, role: u.role, status: 'already_exists' });
      }
    }

    if (res) {
      return res.status(200).json({
        success: true,
        message: 'Default users seeded successfully.',
        results
      });
    }
    return results;
  } catch (error) {
    if (res) {
      return res.status(500).json({ success: false, error: error.message });
    }
    console.error('Seed users error:', error);
  }
};

/**
 * Register a new standard user
 */
export const register = async (req, res) => {
  try {
    const { username, fullName, email, password, confirmPassword, preferredLanguage } = req.body;

    if (!username || !fullName || !password) {
      return res.status(400).json({
        success: false,
        error: 'பயனர்பெயர், முழு பெயர் மற்றும் கடவுச்சொல் கட்டாயமாகும் (Username, Full Name, and Password are required).'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'கடவுச்சொற்கள் பொருந்தவில்லை (Passwords do not match).'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் கொண்டிருக்க வேண்டும் (Password must be at least 6 characters long).'
      });
    }

    const cleanUsername = String(username).trim().toLowerCase();
    
    // Check if username already exists
    const existingUser = await User.findOne({ username: cleanUsername });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'இந்த பயனர்பெயர் ஏற்கனவே உள்ளது (Username already exists. Please choose another).'
      });
    }

    // Check if email already registered (if email provided)
    const cleanEmail = email ? String(email).trim().toLowerCase() : '';
    if (cleanEmail) {
      const existingEmail = await User.findOne({ email: cleanEmail });
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          error: 'இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது (Email is already registered).'
        });
      }
    }

    const newUser = new User({
      username: cleanUsername,
      fullName: String(fullName).trim(),
      email: cleanEmail,
      password,
      role: 'user', // Standard user for public self-registration
      preferredLanguage: ['ta', 'en', 'hi', 'te', 'kn', 'ml'].includes(preferredLanguage) ? preferredLanguage : 'ta',
      isActive: true,
      lastLogin: new Date()
    });

    await newUser.save();

    // Generate JWT Token (valid 7 days)
    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        role: newUser.role,
        fullName: newUser.fullName
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது (Account registered successfully).',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        preferredLanguage: newUser.preferredLanguage,
        lastLogin: newUser.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Reset / Forgot Password for user
 */
export const resetPassword = async (req, res) => {
  try {
    const { username, verifyDetail, newPassword, confirmPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'பயனர்பெயர் மற்றும் புதிய கடவுச்சொல் கட்டாயமாகும் (Username and New Password are required).'
      });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'கடவுச்சொற்கள் பொருந்தவில்லை (Passwords do not match).'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'புதிய கடவுச்சொல் குறைந்தது 6 எழுத்துகள் கொண்டிருக்க வேண்டும் (New password must be at least 6 characters long).'
      });
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const user = await User.findOne({ username: cleanUsername });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'பயனர் கணக்கு காணப்படவில்லை (User account not found).'
      });
    }

    // Verification check if verifyDetail is provided (matches email or fullName)
    if (verifyDetail) {
      const cleanVerify = String(verifyDetail).trim().toLowerCase();
      const matchesEmail = user.email && user.email.toLowerCase() === cleanVerify;
      const matchesFullName = user.fullName && user.fullName.toLowerCase().includes(cleanVerify);
      if (!matchesEmail && !matchesFullName) {
        return res.status(400).json({
          success: false,
          error: 'சரிபார்ப்பு விவரம் பொருந்தவில்லை (Verification details do not match the account record).'
        });
      }
    }

    // Update password (Mongoose pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது (Password has been reset successfully. You can now login).'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
