import React, { useState } from 'react';

import ReactShadowScroll from 'react-shadow-scroll';
import CloseIcon from '@material-ui/icons/Close';

import { getUsersByName } from '../../api/user';
import { initiateChat } from '../../api/room';

import UserAvatar from '../avatar';

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
        key={user.user._id}
        className="result-btn"
        onClick={() => {
          initiateChat(user.user._id);
          handleClick();
        }}
      >
        <div className="result">
          <UserAvatar userName={user.user.firstName} image={user.img} />
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

      <ReactShadowScroll className="search__results">
        {users.map(renderizaLinha)}
      </ReactShadowScroll>
    </div>
  );
};

export default Search;
