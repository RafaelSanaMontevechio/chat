import axios from 'axios';

import { getTokenLocalStorage } from './user';

const BASE_URL = 'http://localhost:3001';

const getToken = () => {
  const token = getTokenLocalStorage();
  return token;
};

export const initiateChat = async (contactId) => {
  const token = getToken();
  await axios.post(
    `${BASE_URL}/room/initiate`,
    {
      userIds: [contactId],
      type: 'consumer_to_consumer',
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getRooms = async () => {
  const token = getToken();
  const result = await axios.get(`${BASE_URL}/room/get-rooms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// export const postMessage = async (message, roomId) => {
//   const token = getToken();

//   await axios.post(
//     `${BASE_URL}/room/${roomId}/message`,
//     {
//       messageText: message,
//     },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// };

export const getConversationByRoomId = async (roomId) => {
  const token = getToken();
  const conversation = await axios.get(`${BASE_URL}/room/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return conversation.data;
};
