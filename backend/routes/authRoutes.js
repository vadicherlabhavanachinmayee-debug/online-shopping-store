const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================
// REGISTER USER
// =====================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body); // 🔍 DEBUG LINE

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  }catch (error) {
  setMessage({
    text: error.response?.data?.message || "Server error",
    type: "error"
  });
}

});


// =====================
// LOGIN USER
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.isAdmin ? "admin" : "user"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
