import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import { Link } from 'react-router-dom';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Link to={props.isAuth ? "/api/current_user" : "/"}><Logo /></Link>
        </div>
        <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>

);

export default toolbar;