import React, { useState, useEffect } from 'react';

import SearchIcon from '@material-ui/icons/Search';

import { getUserLocalStorage } from '../../api/user';

import User from '../../components/user';
import Room from '../../components/room';
import Search from '../../components/search';
import HomeChat from '../../components/homeChat';
import Account from '../../components/account';
import Footer from '../../components/footer';

import './home.css';

const Home = () => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState([]);
  const [show, setShow] = useState(false);
  const [showAccountComponent, setShowAccountConponent] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [contact, setContact] = useState('');
  const [contactImage, setContactImage] = useState({});

  useEffect(() => {
    const data = getUserLocalStorage();
    setUser(data[0].user);
    setImage(data[0].img);
  }, []);

  const showSearch = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const showAccount = () => {
    if (showAccountComponent === false) {
      setShowAccountConponent(true);
    } else {
      setShowAccountConponent(false);
    }
  };

  const getRoomId = (roomId, contact, image) => {
    setRoomId(roomId);
    setContact(contact);
    setContactImage(image);
  };

  return (
    <>
      <div className="home-container">
        <div className="home-details">
          <User user={user} image={image} showAccount={showAccount} />
          {!show ? (
            <button className="btn-search" type="input" onClick={showSearch}>
              <div className="div-btn-search">
                <SearchIcon onClick={showSearch} /> <span>Find people</span>
              </div>
            </button>
          ) : null}

          {show ? (
            <Search handleClick={showSearch} />
          ) : (
            <Room user={user} image={image} func={getRoomId} />
          )}
        </div>
        <div className="home-chats">
          {!showAccountComponent ? (
            <HomeChat
              data={roomId}
              user={user}
              contactName={contact}
              contactImage={contactImage}
            />
          ) : (
            <Account user={user} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
