import React from 'react';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <span className="ml-10 ">Developed with </span> &nbsp;
      <FavoriteRoundedIcon className="heart" /> &nbsp;
      <span>by Rafael Sana Montevechio</span>
    </div>
  );
};

export default Footer;
