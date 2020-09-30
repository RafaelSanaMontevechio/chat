import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import UserAvatar from '../avatar';

import { signOut } from '../../api/user';

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
      <div className="flex flex-shrink p-2 bg-gray-700 text-white mb-2 rounded-md shadow-lg">
        <UserAvatar userName={user.firstName} image={image} />

        <button
          className="focus:outline-none flex items-center ml-16"
          type="button"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon className="focus:outline-none  hover:text-green-600" />
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
    </>
  );
};

export default User;
