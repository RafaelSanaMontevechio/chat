import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    chatRoomId: String,
    messageId: String,
    message: String,
    postedByUserId: String,
    postedByUserName: String,
  },
  {
    timestamps: true,
    collection: 'chatmessages',
  }
);

chatMessageSchema.statics.createPostInChatRoom = async function (
  chatRoomId,
  messageId,
  message,
  postedByUserId,
  postedByUserName
) {
  try {
    const post = await this.create({
      messageId,
      message,
      chatRoomId,
      postedByUserId,
      postedByUserName,
    });
    return post;
  } catch (error) {
    throw error;
  }
};

chatMessageSchema.statics.getConversationByRoomId = async function (
  chatRoomId,
  options = {}
) {
  try {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } },

      // apply pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
};

chatMessageSchema.statics.markMessageRead = async function (
  chatRoomId,
  currentUserOnlineId
) {
  try {
    return this.updateMany(
      {
        chatRoomId,
        'readByRecipients.readByUserId': { $ne: currentUserOnlineId },
      },
      {
        $addToSet: {
          readByRecipients: { readByUserId: currentUserOnlineId },
        },
      },
      {
        multi: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('ChatMessage', chatMessageSchema);
