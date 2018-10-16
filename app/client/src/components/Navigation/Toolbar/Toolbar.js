import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import SearchbarToggle from '../../SearchBar/SearchbarToggle/SearchbarToggle';
import Searchbar from '../../SearchBar/SearchBar';
import { Link } from 'react-router-dom';


const toolbar = (props) => (
    <div className={classes.Container}>
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Link to={props.isAuth ? "/home" : "/"}><Logo /></Link>
            </div>
            <div className={classes.SearchBar + ' ' + classes.DesktopOnly}>
                <Searchbar show />
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
        <div className={classes.MobileSearchBar}>
            <Searchbar show={props.showSearchbar} />
        </div>
    </div>
);

export default toolbar;