const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // your frontend Live Server origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Join a private room for the user
  socket.on("join", (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // Handle sending message
  socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
    // Save message to DB
    const prisma = require("./prismaClient");
    const message = await prisma.message.create({
      data: { senderId, receiverId, content },
    });

    // Emit to receiver's room
    io.to(`user-${receiverId}`).emit("receiveMessage", message);
    // Emit back to sender too (so they see it instantly)
    io.to(`user-${senderId}`).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
