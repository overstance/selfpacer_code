import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem} >
        <NavLink
            to={props.link}
            exact={props.exact}
            className={props.active ? classes.active : null}
            onClick={props.isAuthenticating}
        > 
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;