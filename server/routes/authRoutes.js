const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

// 1. PUBLIC GET PROFILE ENDPOINT
router.get("/profile", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. PROTECTED PUT PROFILE ENDPOINT (ADMIN ONLY)
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. ADMIN REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. ADMIN LOGIN ROUTE (RESTRICTED TO san@gmail.com)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== "san@gmail.com") {
      return res.status(403).json({ error: "Access denied. Only Admin (san@gmail.com) can log in." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Admin account not found in database." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid admin password." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "MY_SECRET_KEY", { expiresIn: "1h" });
    res.json({ message: "Login successful", token: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;