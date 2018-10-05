import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import SearchbarToggle from '../../SearchBar/SearchbarToggle/SearchbarToggle'
import { Link } from 'react-router-dom';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Link to={props.isAuth ? "/home" : "/"}><Logo /></Link>
        </div>
        <div className={classes.Widgets}>
            <SearchbarToggle clicked={props.searchbarToggleClicked} />
            <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems
                isAuthenticated={props.isAuth}
            />
        </nav>
    </header>

);

export default toolbar;