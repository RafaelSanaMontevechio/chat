import socketio from 'socket.io';

import roomModel from '../models/ChatRoom.js';
import messageModel from '../models/ChatMessage.js';

const users = [];
let rooms = [];

const socketIO = async (server) => {
  const io = socketio();
  io.listen(server);

  io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('join', async (userId) => {
      // console.log(userId);
      let userOn = {
        socketId: socket.id,
        userId,
      };
      users.push(userOn);
      rooms = await roomModel.getChatsByUserId(userId);
      rooms.forEach((room) => {
        socket.join(room._id);
      });
    });

    socket.on('send-message', async (data) => {
      const message = await messageModel.createPostInChatRoom(
        data.roomId,
        data.messageId,
        data.message,
        data.postedByUserId,
        data.postedByUserName
      );
      console.log('DATA:', data);
      console.log('MESSAGE:', message);

      io.to(data.roomId).emit('send-message', message);
    });

    socket.on('disconnect', () =>
      console.log('We have a disconnect', socket.id)
    );
  });

  return io;
};

export default socketIO;
