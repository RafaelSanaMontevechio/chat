import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const Buttons = ({ setRoomIdNull, showSearch }) => {
  return (
    <div className="flex flex-shrink p-2 bg-white mb-2 rounded-md shadow-lg">
      <button className="focus:outline-none" onClick={setRoomIdNull}>
        <HomeRoundedIcon className="icons" />
      </button>
      <button className="focus:outline-none" type="input" onClick={showSearch}>
        <SearchIcon className="" />
      </button>
      <button className="focus:outline-none">
        <GroupAddRoundedIcon className="" />
      </button>
    </div>
  );
};

export default Buttons;
