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

  console.log(result);

  const renderizaLinha = (element) => {
    return (
      <button
        key={element.roomId}
        className="result-btn"
        onClick={() => func(element.roomId, element.contact)}
      >
        <div className="result">
          {!element.image ? (
            <Avatar className="ml-10">{element.contact.substr(0, 1)}</Avatar>
          ) : (
            <Avatar
              src={`data:${element.image.type};base64,${element.image.base64}`}
            />
          )}
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
