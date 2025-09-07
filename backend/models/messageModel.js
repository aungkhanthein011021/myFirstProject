const prisma = require("../prismaClient");

// Send a message
async function sendMessage({ senderId, receiverId, content }) {
  return await prisma.message.create({
    data: { senderId, receiverId, content },
  });
}

// Get chat history between two users
async function getChatHistory({ userId, friendId }) {
  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: "asc" },
    include: {
      sender: { select: { id: true, name: true } },
      receiver: { select: { id: true, name: true } },
    },
  });
}

module.exports = { sendMessage, getChatHistory };
