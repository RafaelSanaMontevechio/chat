import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import './avatar.css';

const UserAvatar = ({ userName, image }) => {
  return (
    <>
      {image ? (
        <div className="avatar">
          <Avatar src={`data:${image.type};base64,${image.base64}`} />
          <span>{userName}</span>
        </div>
      ) : (
        <div className="avatar">
          <Avatar>{userName.substr(0, 1)}</Avatar>
          <span>{userName}</span>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
