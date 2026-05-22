const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("./Db");
const nodemailer = require("nodemailer");

// ── Helper: generate JWT ──
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ────────────────────────────────────────
// @desc    Register a new user (OTP step)
// @route   POST /api/auth/signup
// @access  Public
// ────────────────────────────────────────
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id, is_verified FROM users WHERE email = $1",
      [email]
    );

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60000); // 10 minutes

    if (existingUser.rows.length > 0) {
      if (existingUser.rows[0].is_verified) {
        return res.status(400).json({
          success: false,
          message: "An account with this email already exists.",
        });
      } else {
        // User exists but unverified, update their details and send new OTP
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
          "UPDATE users SET password = $1, name = $2, otp = $3, otp_expires = $4 WHERE email = $5",
          [hashedPassword, name, otp, otpExpires, email]
        );
      }
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user as unverified
      await pool.query(
        "INSERT INTO users (name, email, password, otp, otp_expires, is_verified) VALUES ($1, $2, $3, $4, $5, $6)",
        [name, email, hashedPassword, otp, otpExpires, false]
      );
    }

    // Send email with OTP (or log to console if no SMTP configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail', // change to your email provider
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        await transporter.sendMail({
          from: `"NutriSmart" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Your Signup Verification OTP",
          text: `Your OTP for NutriSmart signup is: ${otp}. It is valid for 10 minutes.`,
        });
        console.log(`OTP sent to ${email}`);
      } catch (err) {
        console.error("Email sending failed", err);
      }
    } else {
      console.log(`\n========================================`);
      console.log(`OTP FOR ${email} IS: ${otp}`);
      console.log(`========================================\n`);
    }

    res.status(201).json({
      success: true,
      message: "OTP sent to email. Please verify to complete signup.",
      requiresOtp: true,
      email: email
    });
  } catch (error) {
    next(error);
  }
};

// ────────────────────────────────────────
// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
// ────────────────────────────────────────
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required." });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    const user = result.rows[0];
    if (user.is_verified) {
      return res.status(400).json({ success: false, message: "User is already verified." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    if (new Date() > new Date(user.otp_expires)) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please sign up again." });
    }

    // Verify user and clear OTP
    await pool.query(
      "UPDATE users SET is_verified = true, otp = null, otp_expires = null WHERE email = $1",
      [email]
    );

    const token = generateToken(user.id);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
    });

  } catch (error) {
    next(error);
  }
};

// ────────────────────────────────────────
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.is_verified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first. You can re-submit the signup form to get a new OTP.",
      });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ────────────────────────────────────────
// @desc    Get logged in user
// @route   GET /api/auth/me
// @access  Private
// ────────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    const user = result.rows[0];

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, verifyOtp, getMe };