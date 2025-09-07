const prisma = require("../prismaClient");

// Middleware to validate user input for creating a new user
async function validateUserInput(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  if (name.length < 3 || name.length > 30) {
    return res
      .status(400)
      .json({ error: "Name must be between 3 and 30 characters" });
  }

  if (!/^[a-zA-Z0-9_ ]+$/.test(name)) {
    return res.status(400).json({
      error:
        "Name can only contain letters, numbers, and underscores, and spaces",
    });
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (email.length > 50) {
    return res
      .status(400)
      .json({ error: "Email must be less than 50 characters long" });
  }

  if (password.length < 8 || password.length > 100) {
    return res
      .status(400)
      .json({ error: "Password must be between 8 and 100 characters long" });
  }

  // Check uniqueness
  if (await prisma.user.findUnique({ where: { email } })) {
    return res.status(400).json({ error: "Email already in use" });
  }

  next();
}

module.exports = { validateUserInput };
