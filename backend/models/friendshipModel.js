const prisma = require("../prismaClient");

// Send a friend request
async function sendFriendRequest({ requesterId, addresseeId }) {
  return await prisma.friendship.create({
    data: { requesterId, addresseeId, status: "pending" },
  });
}

// Accept a friend request
async function acceptFriendRequest({ requestId }) {
  return await prisma.friendship.update({
    where: { id: requestId },
    data: { status: "accepted" },
    include: {
      requester: { select: { id: true, name: true, email: true } },
      addressee: { select: { id: true, name: true, email: true } },
    },
  });
}

// Get friends list for a user
async function getFriendsList({ userId }) {
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { requesterId: userId, status: "accepted" },
        { addresseeId: userId, status: "accepted" },
      ],
    },
    include: {
      requester: { select: { id: true, name: true, email: true } },
      addressee: { select: { id: true, name: true, email: true } },
    },
  });

  return friendships.map((f) =>
    f.requesterId === userId ? f.addressee : f.requester
  );
}

module.exports = { sendFriendRequest, acceptFriendRequest, getFriendsList };
