import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';

import './account.css';

const Profile = () => {
  return <p>Profile</p>;
};

const MyAccount = () => {
  return <p>Account</p>;
};

const Account = () => {
  const [onOff, setOnOff] = useState(false);

  const turnOnOff = () => {
    if (onOff === false) {
      setOnOff(true);
    } else {
      setOnOff(false);
    }
  };
  return (
    <div className="account">
      <div className="account__header">
        <button
          className={`account__header--${onOff ? 'btn' : 'btn_focus'} mf-15`}
          onClick={turnOnOff}
        >
          <span className="">Profile</span>
        </button>

        <button
          className={`account__header--${!onOff ? 'btn' : 'btn_focus'} mf-15`}
          onClick={turnOnOff}
        >
          <span className="">Account</span>
        </button>
      </div>
      <Divider variant="middle" />
      <div className="account__main">
        {!onOff ? <Profile /> : <MyAccount />}
      </div>
    </div>
  );
};

export default Account;
