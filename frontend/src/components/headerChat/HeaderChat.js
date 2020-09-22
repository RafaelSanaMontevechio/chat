import React from 'react';

import './headerChat.css';
import UserAvatar from '../avatar';

const HeaderChat = ({ contactName, contactImage }) => {
  return (
    <div className="header">
      <UserAvatar userName={contactName} image={contactImage} />
    </div>
  );
};

export default HeaderChat;
