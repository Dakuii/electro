const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
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
        role: user.role, // Include the role in the response
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

    res
      .status(200)
      .json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (quantity > product.quantity) {
      return res
        .status(400)
        .json({ message: `Only ${product.quantity} units available.` });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ user: req.user._id, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex >= 0) {
      // Update quantity if the product is already in the cart
      const newQuantity =
        cart.products[existingProductIndex].quantity + quantity;
      if (newQuantity > product.quantity) {
        return res
          .status(400)
          .json({ message: `Only ${product.quantity} units available.` });
      }
      cart.products[existingProductIndex].quantity = newQuantity;
    } else {
      // Add new product to the cart
      cart.products.push({ product: productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    // Reduce the quantity of the product in the inventory
    product.quantity -= quantity;
    await product.save();

    res
      .status(200)
      .json({ message: "Product added to cart and inventory updated.", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Your cart is empty." });
    }

    const cartDetails = cart.products.map((item) => {
      const product = item.product;
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantityInCart: item.quantity,
        category: product.category, // Add category
        image: product.image, // Add image
      };
    });

    res.status(200).json({ cart: cartDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cart Quantity with stock changes
const updateCartQuantity = async (req, res) => {
  const { productId, newQuantity } = req.body;

  if (!productId || newQuantity === undefined) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex >= 0) {
      const currentQuantityInCart =
        cart.products[existingProductIndex].quantity;

      if (newQuantity > currentQuantityInCart) {
        // Increasing the quantity in cart, reduce product stock
        const quantityToIncrease = newQuantity - currentQuantityInCart;

        if (product.quantity < quantityToIncrease) {
          return res
            .status(400)
            .json({ message: `Only ${product.quantity} units available.` });
        }

        // Update product quantity in stock
        product.quantity -= quantityToIncrease;
      } else if (newQuantity < currentQuantityInCart) {
        // Decreasing the quantity in cart, increase product stock
        const quantityToDecrease = currentQuantityInCart - newQuantity;

        // Update product quantity in stock
        product.quantity += quantityToDecrease;
      }

      // Update the quantity in the cart
      cart.products[existingProductIndex].quantity = newQuantity;

      // Save the changes to the cart and product
      await cart.save();
      await product.save();

      res.status(200).json({ message: "Cart updated successfully.", cart });
    } else {
      return res
        .status(404)
        .json({ message: "Product not found in your cart." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Item from Cart and Restore Stock
const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const productInCartIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productInCartIndex >= 0) {
      const productInCartQuantity = cart.products[productInCartIndex].quantity;

      // Restore the stock by adding the quantity of the product in the cart
      product.quantity += productInCartQuantity;

      // Remove the product from the cart
      cart.products.splice(productInCartIndex, 1);

      // Save changes to the cart and product
      await cart.save();
      await product.save();

      res.status(200).json({
        message: "Product removed from cart and stock updated.",
        cart,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Product not found in the cart." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  addToCart,
  viewCart,
  updateCartQuantity,
  removeItemFromCart,
};
