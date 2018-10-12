import React from 'react';
//import { Link } from 'react-router-dom';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
//import searchBar from '../../SearchBar/SearchBar';
import SearchBar from '../../SearchBar/SearchBar';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>

        <li className={classes.SearchBarWrap}>
            <SearchBar />
        </li>
        {props.isAuthenticated ? <NavigationItem link="/logout" isAuthenticating={props.closeSideDrawer}>Log out</NavigationItem> : <NavigationItem link="/login" isAuthenticating={props.closeSideDrawer}>Log in</NavigationItem>}
        {!props.isAuthenticated ? <NavigationItem link="/register" isAuthenticating={props.closeSideDrawer}>Sign Up</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/home" >custompage</NavigationItem> : null}
        <NavigationItem link="/explore" isAuthenticating={props.closeSideDrawer} >Explore</NavigationItem>
    </ul>
);

export default navigationItems;

//{props.isAuthenticated ? <li className={classes.NavigationItem} ><a href="/api/logout">Log out</a></li> : <NavigationItem link="/login">Log in</NavigationItem>}