import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';

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
        onClick={() => func(element.roomId, element.contact)}
      >
        <div className="result">
          <Avatar className="ml-10">{element.contact.substr(0, 1)}</Avatar>
          <span className="ml-10">{element.contact}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="room-container">
      <span className="span">Chats recentes</span>
      <div className="">{result.map(renderizaLinha)}</div>
    </div>
  );
};

export default Room;
