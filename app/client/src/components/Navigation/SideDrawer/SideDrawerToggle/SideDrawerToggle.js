import React from 'react';
import classes from './SideDrawerToggle.module.css';

const sideDrawerToggle = (props) => (
    <div className={classes.toggleWrapper}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" className={classes.SideDrawerToggle} onClick={props.clicked} viewBox="0 0 32 32">
            <path d="M25 17.5H7c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5h18c.828 0 1.5.671 1.5 1.5s-.672 1.5-1.5 1.5zm1.5 3.5c0-.828-.672-1.5-1.5-1.5H7c-.829 0-1.5.672-1.5 1.5s.671 1.5 1.5 1.5h18c.828 0 1.5-.672 1.5-1.5zm0-10c0-.829-.672-1.5-1.5-1.5H7c-.829 0-1.5.671-1.5 1.5s.671 1.5 1.5 1.5h18c.828 0 1.5-.671 1.5-1.5z"/>
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" className={classes.SideDrawerToggle} onClick={props.clicked} viewBox="0 0 20 20">
            <path d="M.714 4.464h18.571c.396 0 .715-.321.715-.713V1.965c0-.395-.319-.715-.715-.715H.714c-.395 0-.714.32-.714.715v1.786c0 .392.319.713.714.713zm0 7.142h18.571c.396 0 .715-.321.715-.714V9.107c0-.395-.319-.714-.715-.714H.714c-.395.001-.714.32-.714.714v1.785c0 .393.319.714.714.714zm0 7.144h18.571c.396 0 .715-.321.715-.715v-1.786c0-.394-.319-.713-.715-.713H.714c-.395 0-.714.319-.714.713v1.786c0 .394.319.715.714.715z"/>
        </svg>
    </div>
    
);

export default sideDrawerToggle;