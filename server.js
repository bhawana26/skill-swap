// server.js
const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require('socket.io');
const socketIo = require("socket.io");
const connectDB = require("./config/db");
dotenv.config();
const app = express();
const skillSwapRoutes = require("./routes/swapRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const feedbackSupportRoutes = require("./routes/feedbackSupportRoutes");
const supportRoutes = require("./routes/supportRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const blockRoutes = require("./routes/blockRoutes");
const reportRoutes = require("./routes/reportRoutes");
const suggestionRoutes = require("./routes/suggestionsRoutes");
const matchRoutes = require("./routes/match");


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


// Basic Route
app.get("/", (req, res) => {
    res.send("Skill Swap Platform Backend is Running");
});

// API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/swaps", require("./routes/swapRoutes"));
app.use("/api/swap", require("./routes/swapRoutes"));
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/feedback", supportRoutes);
app.use("/api/support", feedbackSupportRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/block", blockRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/skillmatch", matchRoutes);



/* --- Socket.IO Setup ---
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });

  // Custom events
  socket.on("sendNotification", ({ toUserId, message }) => {
    io.emit(`notification:${toUserId}`, message); // emits to all listeners of `notification:userId`
  });
});  */

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Server Error" });
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// MongoDB Connection
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));
