const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");

// Create a new user
async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
}

// Get all users (excluding passwords)
async function getAllUsers() {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

// User login
async function userLogin({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    return null;
  }
}

module.exports = { createUser, getAllUsers, userLogin };
