import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import SearchBar from '../../SearchBar/SearchBar';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <div className={classes.SearchBarWrap}>
            <SearchBar />
        </div>
        {props.isAuthenticated ? <NavigationItem link="/api/logout">Log out</NavigationItem> : <NavigationItem link="/api/login">Log in</NavigationItem>}
        {!props.isAuthenticated ? <NavigationItem link="/api/register">Sign Up</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="#">custompage</NavigationItem> : null}
        <NavigationItem link="#">Explore</NavigationItem>
    </ul>
);

export default navigationItems;