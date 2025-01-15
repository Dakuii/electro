//models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // Store image URL or file path
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String, // Store category as a string
    required: true,
    enum: ["Phones", "Laptops", "SmartWatches", "Earphones"], // Example categories
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
