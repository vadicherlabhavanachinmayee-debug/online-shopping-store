const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminMiddleware = require("../middleware/adminMiddleware");

// PUBLIC: view products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADMIN: add product
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN: update product
router.put("/update/:id", adminMiddleware, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Product updated" });
});

// ADMIN: delete product
router.delete("/delete/:id", adminMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
