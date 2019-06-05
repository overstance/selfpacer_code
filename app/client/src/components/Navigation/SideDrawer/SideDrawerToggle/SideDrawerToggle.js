import React from 'react';
import classes from './SideDrawerToggle.css';

const sideDrawerToggle = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={classes.SideDrawerToggle} onClick={props.clicked} fill="#3A2D80" viewBox="0 0 24 24">
        <path d="M22 14H2c-1.104 0-2-.896-2-2s.896-2 2-2h20c1.104 0 2 .896 2 2s-.896 2-2 2zm2 8c0-1.105-.896-2-2-2H2c-1.104 0-2 .895-2 2 0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2zm0-20c0-1.104-.896-2-2-2H2C.896 0 0 .896 0 2s.896 2 2 2h20c1.104 0 2-.896 2-2z"/>
    </svg>
);

export default sideDrawerToggle;