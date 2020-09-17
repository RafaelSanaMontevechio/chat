import React from 'react';
import { NavLink } from 'react-router-dom';

import './notFound.css';

const NotFound = () => {
  return (
    <div className="notFound-container">
      <h1>Uai sô!</h1>
      <span>404 - Cadê a página</span>
      <NavLink className="" activeClassName="" to="/home">
        Vorta pá home
      </NavLink>
    </div>
  );
};

export default NotFound;
