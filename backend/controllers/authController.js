const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get Profile
const profileUser = async (req, res) => {
  try {
    const user = req.user; // Assuming the user is populated by the middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the user profile information, including phone and address
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone, // Add phone field
      address: user.address, // Add address field
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new email is already taken by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update the user's name, email, phone, and address if provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone; // Update phone number
    user.address = address || user.address; // Update address

    // Save the updated user
    await user.save();

    // Respond with the updated user info
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone, // Include phone number
      address: user.address, // Include address
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Request Password Reset Link
// const requestPasswordReset = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     // Set token and expiration
//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();

//     // Send email
//     const resetUrl = `${req.protocol}://${req.get(
//       "host"
//     )}/api/auth/reset-password/${resetToken}`;
//     const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Password Reset Request",
//       text: message,
//     });

//     res.status(200).json({ message: "Reset link sent to email" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set token and expiration
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Create a reset URL pointing to your frontend (React app)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// // Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user by token and check expiration
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined; // Clear reset token
    user.resetPasswordExpire = undefined; // Clear expiration
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendEmailToAdmin = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to admin
    const adminEmailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name} (${email})`,
      text: message,
    };

    await transporter.sendMail(adminEmailOptions);

    // Response email to user
    const userEmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      text: `Hello ${name},\n\nThank you for reaching out to us! We have received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nBest regards,\nSupport Team`,
    };

    await transporter.sendMail(userEmailOptions);

    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
  sendEmailToAdmin,
};
