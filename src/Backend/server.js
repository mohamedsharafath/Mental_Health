const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from any origin (for testing purposes only)
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for the "joinRoom" event
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId); // Join the room
    console.log(`User joined room: ${roomId}`);
    io.to(roomId).emit('userJoined', `${socket.id} joined the room`); // Notify others
  });

  // Listen for the "leaveRoom" event
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId); // Leave the room
    console.log(`User left room: ${roomId}`);
    io.to(roomId).emit('userLeft', `${socket.id} left the room`); // Notify others
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Serve static files (if you have a frontend)
app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
