import React, { useState, useEffect } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import UserAvatar from '../avatar';

import { getRooms } from '../../api/room';

import './room.css';

const Room = ({ func }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getRooms();
      const arr = Object.values(result);
      setResult(arr[0]);
    }
    fetchData();
  }, []);

  const renderizaLinha = (element) => {
    return (
      <button
        key={element.roomId}
        className="result-btn"
        onClick={() => func(element.roomId, element.contact, element.image)}
      >
        <div className="result">
          <UserAvatar userName={element.contact} image={element.image} />
        </div>
      </button>
    );
  };

  return (
    <div className="room-container">
      <span className="span">Chats recentes</span>
      <ScrollToBottom className="rooms__actives">
        {result.map(renderizaLinha)}
      </ScrollToBottom>
    </div>
  );
};

export default Room;
