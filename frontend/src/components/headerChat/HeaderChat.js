import React from 'react';

// import './headerChat.css';
import UserAvatar from '../avatar';

const HeaderChat = ({ contactName, contactImage }) => {
  return (
    <div className="flex p-2 bg-white mb-2 rounded-md shadow-lg">
      <UserAvatar userName={contactName} image={contactImage} />
    </div>
  );
};

export default HeaderChat;
