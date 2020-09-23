import makeValidation from '@withvoid/make-validation';

import UserModel from '../models/User.js';
import ImageModel from '../models/Image.js';
import ChatRoomModel from '../models/ChatRoom.js';
import ChatMessageModel from '../models/ChatMessage.js';

export default {
  initiate: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          userIds: {
            type: types.array,
            options: { unique: true, empty: false, stringOnly: true },
          },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { userIds } = req.body;
      userIds.push(req.userId);

      const chatRoom = await ChatRoomModel.initiateChat(userIds);
      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      console.log('Initiate:', error);
      return res.status(500).json({ success: false, error: error });
    }
  },

  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(
        roomId,
        messagePayload,
        currentLoggedUser
      );
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  getRoomsByUserId: async (req, res) => {
    try {
      const myRooms = [];
      const { userId } = req;
      const rooms = await ChatRoomModel.getChatsByUserId(userId);
      if (!rooms) {
        return res.status(400).json({
          success: false,
          message: 'No rooms exists for this user id',
        });
      }
      rooms.forEach((element) => {
        element.userIds.splice(element.userIds.indexOf(userId), 1);
      });

      for (let i = 0; i < rooms.length; i++) {
        const user = await UserModel.getUserByIds(rooms[i].userIds);
        const image = await ImageModel.getImage(rooms[i].userIds);
        if (rooms[i].usersIds === user._id) {
          let img = null;
          if (image) {
            const emBase64 = image.data.toString('base64');
            img = {
              base64: emBase64,
              type: image.contentType,
            };
          }
          let room = {
            roomId: rooms[i]._id,
            contact: user[0].firstName,
            image: img,
          };
          myRooms.push(room);
        }
      }
      return res.status(200).json({
        myRooms,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },

  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 50,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(
        roomId,
        options
      );
      return res.status(200).json({
        conversation,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },

  markConversationReadByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        });
      }

      const currentLoggedUser = req.userId;
      const result = await ChatMessageModel.markMessageRead(
        roomId,
        currentLoggedUser
      );
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },

  getRecentConversation: async (req, res) => {},
};
