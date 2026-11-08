const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  stock: {
    type: Number
  }
});

// Export model
module.exports = mongoose.model("Product", productSchema);
