import React from 'react';
import { NavLink } from 'react-router-dom';

import './loginHeader.css';

const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="login-options">
        <span>
          <NavLink className="link" activeClassName="active" to="/login">
            Login
          </NavLink>
        </span>
        <span className="mf-5">
          <NavLink className="link" activeClassName="active" to="/register">
            Cadastrar
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default LoginHeader;
