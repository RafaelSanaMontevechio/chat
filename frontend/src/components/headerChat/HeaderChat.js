import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';

import './headerChat.css';

const HeaderChat = ({ currencyContact }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));

  const classes = useStyles();
  return (
    <div className="header">
      <div className={classes.root}>
        <Avatar className={classes.purple}>
          {currencyContact.substr(0, 1)}
        </Avatar>
        <span>{currencyContact}</span>
      </div>
    </div>
  );
};

export default HeaderChat;
