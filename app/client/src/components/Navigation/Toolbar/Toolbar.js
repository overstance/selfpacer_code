import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import RightNavigationItems from '../RightNavigationItems/RightNavigationItems'
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import { Link } from 'react-router-dom';
import Container from '../../UserInterface/Container/Container';
import Logo from '../../UserInterface/Logo/Logo';


/*
use the div with className {classes.container}
to give the toolbar a background color that stretches
100% of viewport width and is fixed atop. Remember to uncomment the .Container class
in Toolbar.module.css and enable margin-top for .Content class in Layout.module.css
*/


const toolbar = (props) => (
    <div className={classes.Container}>
        <Container>
            <header className={classes.Toolbar}>
                <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
                <nav className={classes.DesktopOnly}>
                    <NavigationItems
                        isAuthenticated={props.isAuth}
                    />
                </nav>
                <div className={classes.LogoContainer}>
                    <Link to= "/" className={classes.ToolBarLogo}>
                        <Logo />
                    </Link>
                </div>
                <RightNavigationItems
                    isAuthenticated={props.isAuth}
                />
            </header>
        </Container>
    </div>
);

export default toolbar;