import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';

const LoginHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__options}>
        <span>
          <NavLink
            className={styles.link}
            activeClassName={styles.active}
            to="/login"
          >
            Login
          </NavLink>
        </span>
        <span className={styles.mf5}>
          <NavLink
            className={styles.link}
            activeClassName={styles.active}
            to="/register"
          >
            Cadastrar
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default LoginHeader;
