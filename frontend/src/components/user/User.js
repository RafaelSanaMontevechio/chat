import React, { useState, useRef } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import { signOut } from '../../api/user';

import './user.css';

const User = ({ user }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef(<Menu />);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="user-container">
        <div className="user">
          <Avatar>US</Avatar>
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
            ref={ref}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink
                className="account"
                activeClassName="active"
                to="/user/account"
              >
                My account
              </NavLink>
            </MenuItem>
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
