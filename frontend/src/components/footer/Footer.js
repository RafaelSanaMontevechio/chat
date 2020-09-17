import React from 'react';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <span>Developed with </span> &nbsp;
      <FavoriteTwoToneIcon /> &nbsp;
      <span>by Rafael Sana Montevechio</span>
    </div>
  );
};

export default Footer;
