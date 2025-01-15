//controllers/adminController.js
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamped filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
}).single("image"); // Expecting an image file from the request

// Add a new product
const addProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading image", error: err.message });
    }

    const { name, price, description, quantity, category } = req.body;

    // Ensure image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    try {
      const newProduct = new Product({
        name,
        price,
        description,
        image: req.file.path, // Store image path
        quantity,
        category,
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding product", error: error.message });
    }
  });
};

// Update an existing product
const updateProduct = async (req, res) => {
    const { id } = req.params;
  
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading image", error: err.message });
      }
  
      // Destructure the fields sent via form data
      const { name, price, description, quantity, category } = req.body;
      let image = req.body.image || ''; // Keep the original image if not updating
  
      if (req.file) {
        image = req.file.path;
      }
  
      console.log("After upload - Image Path: ", image);
  
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { name, price, description, image, quantity, category },
          { new: true } // To return the updated document
        );
  
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        // Log the updated product for debugging
        console.log("Updated Product: ", updatedProduct);
  
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
      }
    });
  };
  
  
// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};


module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
};
