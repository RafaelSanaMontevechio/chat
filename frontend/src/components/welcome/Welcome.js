import React from 'react';

import uaiChat from '../../assets/uaiChat_e.png';
import './welcome.css';

const Welcome = ({ user }) => {
  return (
    <div className="main">
      <img src={uaiChat} alt="uaiChat" />
      <h2>Bem vindo, {user.firstName}</h2>
      <span>Começe uma conversa</span>
      <span>Você está logado como: {user.email}</span>
    </div>
  );
};

export default Welcome;
