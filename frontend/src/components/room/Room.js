import React, { useState, useEffect } from 'react';

import ReactShadowScroll from 'react-shadow-scroll';

import UserAvatar from '../avatar';

import { getRooms } from '../../api/room';

import styles from './styles.module.css';

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
        className="flex flex-col"
        onClick={() => func(element.roomId, element.contact, element.image)}
      >
        <div className="">
          <UserAvatar userName={element.contact} image={element.image} />
        </div>
      </button>
    );
  };

  return (
    <>
      <div  className={styles.rooms}>
        <span className="">Chats recentes</span>
        <div className={styles.rooms__actives}>
          <ReactShadowScroll className="">
            {result.map(renderizaLinha)}
          </ReactShadowScroll>
        </div>
      </div>
    </>
  );
};

export default Room;
