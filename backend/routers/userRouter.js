const express = require("express");
const { createUser, getAllUsers, userLogin } = require("../models/userModel");
const { validateUserInput } = require("../middleware/validateUserInput");

const router = express.Router();

// Route to create a new user
router.post("/", validateUserInput, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await createUser({ name, email, password });
    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await userLogin({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    } else {
      const { password: _, ...safeUser } = user;
      return res.status(200).json(safeUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
