const express = require("express");
const { sendMessage, getChatHistory } = require("../models/messageModel");

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res
      .status(400)
      .json({ error: "senderId, receiverId, and content are required" });
  }

  try {
    const message = await sendMessage({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Get chat history between two users
router.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const history = await getChatHistory({
      userId: parseInt(userId),
      friendId: parseInt(friendId),
    });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

module.exports = router;
