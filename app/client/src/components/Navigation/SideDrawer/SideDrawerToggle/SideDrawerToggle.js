import React from 'react';
import classes from './SideDrawerToggle.css';

const sideDrawerToggle = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={classes.SideDrawerToggle} onClick={props.clicked} viewBox="0 0 32 32">
        <path d="M25 17.5H7c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5h18c.828 0 1.5.671 1.5 1.5s-.672 1.5-1.5 1.5zm1.5 3.5c0-.828-.672-1.5-1.5-1.5H7c-.829 0-1.5.672-1.5 1.5s.671 1.5 1.5 1.5h18c.828 0 1.5-.672 1.5-1.5zm0-10c0-.829-.672-1.5-1.5-1.5H7c-.829 0-1.5.671-1.5 1.5s.671 1.5 1.5 1.5h18c.828 0 1.5-.671 1.5-1.5z"/>
    </svg>
);

export default sideDrawerToggle;