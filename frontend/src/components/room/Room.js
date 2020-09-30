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
        className="w-full focus:outline-none flex flex-col px-2 hover:bg-gray-300"
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
       <div className="w-full p-2 text-gray-600 text-sm shadow-md">
       <span >Chats</span>
       </div>
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
