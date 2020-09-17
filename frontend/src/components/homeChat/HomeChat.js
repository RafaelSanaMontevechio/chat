import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import uuid from 'uuid/v4';

import io from 'socket.io-client';

import { getConversationByRoomId } from '../../api/room';

import Welcome from '../welcome';
import HeaderChat from '../../components/headerChat';
// import Message from '../../components/message';

import './homeChat.css';

const socket = io('http://localhost:3001');

const HomeChat = ({ user, data, currencyContact }) => {
  socket.emit('join', user._id);
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
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
  }, [messages]);

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

  const validations = yup.object().shape({
    message: yup.string().required(),
  });

  const showmMessage = (message) => {
    return (
      <li
        className={`list__item list__item--${
          message.postedByUserId === user._id ? 'mine' : 'other'
        }`}
        key={message.messageId}
      >
        <span
          className={`message message--${
            message.postedByUserId === user._id ? 'mine' : 'other'
          }`}
        >
          {message.message}
        </span>
      </li>
    );
  };

  return (
    <div className="home-chat-container">
      {!data ? (
        <Welcome user={user} />
      ) : (
        <>
          <div className="header-home-chat">
            <HeaderChat currencyContact={currencyContact} />
          </div>
          <div className="messages-home-chat">
            <ScrollToBottom className="messages">
              <ul className="list">
                {!messages ? <span> aguarde</span> : messages.map(showmMessage)}
              </ul>
            </ScrollToBottom>
          </div>
          <div className="input-home-chat">
            <Formik
              initialValues={{ message: '' }}
              onSubmit={handleFormSubmit}
              validationSchema={validations}
            >
              <Form className="form-message">
                <div className="div-form-message">
                  <Field
                    className="message-field"
                    type="text"
                    name="message"
                    placeholder="Message"
                  />
                  <ErrorMessage
                    className="message-error"
                    component="span"
                    name="message"
                  />
                </div>
                <div className="send-btn">
                  <button className="send" type="submit">
                    <SendSharpIcon />
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeChat;
