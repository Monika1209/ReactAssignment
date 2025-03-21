const io = require('socket.io')(5000, {
    cors: { origin: "*" }
  });
  
  io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);
  
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });
  });
  