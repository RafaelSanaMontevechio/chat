import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import './avatar.css';

const UserAvatar = ({ userName, image }) => {
  return (
    <div className="avatar">
      <Avatar src={`data:${image.type};base64,${image.base64}`} />
      <span>{userName}</span>
    </div>
  );
};

export default UserAvatar;
