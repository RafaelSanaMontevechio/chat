import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const Buttons = ({ setRoomIdNull, showSearch }) => {
  return (
    <div className="flex flex-shrink p-2 bg-white mb-2 rounded-md shadow-lg">
      <button className="focus:outline-none hover:text-purple-800" onClick={setRoomIdNull}>
        <HomeRoundedIcon className="ml-2" />
      </button>
      <button className="focus:outline-none hover:text-purple-800" type="input" onClick={showSearch}>
        <SearchIcon className="ml-2" />
      </button>
      <button className="focus:outline-none hover:text-purple-800">
        <GroupAddRoundedIcon className="ml-2" />
      </button>
    </div>
  );
};

export default Buttons;
