import React from 'react';
import classes from './home.module.css';
import { Link } from 'react-router-dom';

const homeButton = (props) => (
    <Link role="menuitem" to={props.buttonLink} className={classes.homeButton}>
        {props.children}
    </Link>
);

export default homeButton;