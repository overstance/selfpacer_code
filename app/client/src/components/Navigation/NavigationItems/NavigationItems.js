import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/api/login">Log in</NavigationItem>
        <NavigationItem link="/api/register">Sign Up</NavigationItem>
    </ul>
);

export default navigationItems;