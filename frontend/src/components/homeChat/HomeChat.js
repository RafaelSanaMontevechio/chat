import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';


import uuid from 'uuid/v4';

import io from 'socket.io-client';

import FormMessage from '../formMessage';

import { getConversationByRoomId } from '../../api/room';

import Welcome from '../welcome';
import HeaderChat from '../../components/headerChat';
// import Message from '../../components/message';

import './homeChat.css';
import data from '../../utils/data.json';

const socket = io(data.BASE_URL);

const HomeChat = ({ data, user, contactName, contactImage }) => {
  socket.emit('join', user._id);
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      updateMessages([]);
      const result = await getConversationByRoomId(data);
      updateMessages(result.conversation);
    }
    fetchData();
  }, [data]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (data !== newMessage.chatRoomId) return;
      updateMessages([...messages, newMessage]);
    };
    socket.on('send-message', handleNewMessage);
    return () => socket.off('send-message', handleNewMessage);
  }, [messages, data]);

  const handleFormSubmit = async (event, { resetForm }) => {
    const messageId = uuid();
    let message = event.message.trim();
    socket.emit('send-message', {
      messageId,
      roomId: data,
      postedByUserId: user._id,
      postedByUserName: user.firstName,
      message,
    });
    resetForm({ values: '' });
  };


  const showmMessage = (message) => {
    return (
      <div
        key={message.messageId}
        className={`container--${message.postedByUserId === user._id ? 'mine' : 'other'
          }`}
      >
        {message.postedByUserId !== user._id ? (
          <span className="sender">{message.postedByUserName}</span>
        ) : null}
        <span
          className={`message message--${message.postedByUserId === user._id ? 'mine' : 'other'
            }`}
        >
          {message.message}
        </span>
      </div>
    );
  };

  return (
    <div>
      {!data ? (
        <Welcome user={user} />
      ) : (
          <>
            <HeaderChat contactName={contactName} contactImage={contactImage} />

            <div className="messages-home-chat">
              <ScrollToBottom className="messages">
                {!messages ? <span> aguarde</span> : messages.map(showmMessage)}
              </ScrollToBottom>
            </div>

            <FormMessage handleFormSubmit={handleFormSubmit} />
          </>
        )}
    </div>
  );
};

export default HomeChat;
