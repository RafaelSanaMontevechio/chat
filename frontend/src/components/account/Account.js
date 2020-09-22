import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';

import { uploadImage, getImage } from '../../api/user';

import './account.css';

//--------- PROFILE -----------------------------//
const Profile = ({ user }) => {
  const [image, setImge] = useState('');
  const handleInputChange = (event) => {
    setImge(event.target.files[0]);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    uploadImage(user._id, image);
  };
  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input type="file" name="image" onChange={handleInputChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

//--------- END PROFILE -----------------------------//

const MyAccount = () => {
  return <p>Account</p>;
};

const Account = ({ user }) => {
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
        {!onOff ? <Profile user={user} /> : <MyAccount />}
      </div>
    </div>
  );
};

export default Account;
