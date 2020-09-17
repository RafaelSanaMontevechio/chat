import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './message.css';

const Message = ({ user, data }) => {
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
    <ScrollToBottom className="messages">
      <ul className="list">
        {!data ? <span> aguarde</span> : data.map(showmMessage)}
      </ul>
    </ScrollToBottom>
  );
};

export default Message;
