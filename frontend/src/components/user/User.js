import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import { signOut, getImage } from '../../api/user';

import './user.css';

const User = ({ user, showAccount }) => {
  const history = useHistory();
  const [image, setImage] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (user._id) {
        const result = await getImage(user._id);
        setImage(result.img);
        // console.log(result.img);
      }
    }
    fetchData();
  }, [user._id]);

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
        <div className="user">
          <Avatar src={`data:${image.contentType};base64,${image.base64}`} />
          <span>{user.firstName}</span>
        </div>
        <div className="options">
          <button
            type="button"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
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
