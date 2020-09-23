import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import UserAvatar from '../avatar';

import { signOut } from '../../api/user';

import './user.css';

const User = ({ user, image, showAccount }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const account = () => {
    showAccount();
    handleClose();
  };

  return (
    <>
      <div className="user-container">
        <UserAvatar userName={user.firstName} image={image} />
        <div className="options">
          <button
            type="button"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon className="menu" />
          </button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={account}>My account</MenuItem>
            <Divider variant="middle" />
            <MenuItem onClick={() => signOut(history)}>
              <span className="logout">Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default User;
