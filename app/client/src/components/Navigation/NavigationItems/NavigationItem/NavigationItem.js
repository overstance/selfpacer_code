import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    // <li className={classes.NavigationItem} >
        <NavLink
            to={props.link}
            exact={props.exact}
            className={classes.NavigationItem}
            activeClassName={classes.NavActive}
            onClick={props.isAuthenticating}
            role="menuitem" 
            aria-label={props.description}
        > 
            {props.children}
        </NavLink>
    // </li>
);

export default navigationItem;