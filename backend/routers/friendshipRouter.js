const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendsList,
} = require("../models/friendshipModel");

const router = express.Router();

// Send a friend request
router.post("/request", async (req, res) => {
  const { requesterId, addresseeId } = req.body;
  try {
    const request = await sendFriendRequest({ requesterId, addresseeId });
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send friend request" });
  }
});

// Accept a friend request
router.post("/accept", async (req, res) => {
  const { requestId } = req.body;
  try {
    const accepted = await acceptFriendRequest({ requestId });
    res.status(200).json(accepted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept friend request" });
  }
});

// Get friends list for a user
router.get("/:userId/friends", async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await getFriendsList({ userId: parseInt(userId) });
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve friends list" });
  }
});

module.exports = router;
