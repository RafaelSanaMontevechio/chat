import React, { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

import { getUsersByName } from '../../api/user';
import { initiateChat } from '../../api/room';

import './search.css';

const Search = ({ handleClick }) => {
  const [users, setUsers] = useState([]);

  const handleTextChange = async (event) => {
    if (!event.target.value) {
      setUsers([]);
    } else {
      const data = await getUsersByName(event.target.value);
      setUsers(data.users);
    }
  };

  const renderizaLinha = (user) => {
    return (
      <button
        key={user._id}
        className="result-btn"
        onClick={() => {
          initiateChat(user._id);
          handleClick();
        }}
      >
        <div className="result">
          <Avatar className="ml-10">BL</Avatar>
          <span className="ml-10">{user.firstName}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="search">
      <div className="search-form">
        <form>
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            onChange={handleTextChange}
          />
          <button className="search-btn" onClick={handleClick}>
            <CloseIcon />
          </button>
        </form>
      </div>
      <div className="">{users.map(renderizaLinha)}</div>
    </div>
  );
};

export default Search;
