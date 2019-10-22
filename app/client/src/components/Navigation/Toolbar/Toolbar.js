import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import RightNavigationItems from '../RightNavigationItems/RightNavigationItems'
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import { Link } from 'react-router-dom';
import Container from '../../UserInterface/Container/Container';
import Logo from '../../UserInterface/Logo/Logo';

const toolbar = (props) => (
    <header>
        <Container>
            <nav className={classes.Toolbar}>
                <SideDrawerToggle 
                    triggerRef={props.drawerTriggerRef}
                    clicked={props.sideDrawerToggleClicked}
                    keyboarded={props.sideDrawerToggleClickedOnKey} 
                    isOpen={props.sideDrawerOpen}
                />
                <nav className={classes.DesktopOnly}>
                    <NavigationItems
                        isAuthenticated={props.isAuth}
                    />
                </nav>
                <nav className={classes.LogoContainer}>
                    <Link 
                        to= "/" 
                        role="menuitem"
                        aria-label="site logo go home"
                        className={classes.ToolBarLogo}
                    >
                        <Logo />
                    </Link>
                </nav>
                <RightNavigationItems
                    isAuthenticated={props.isAuth}
                    showSearch={props.showSearch}
                    showSearchOnKey={props.showSearchOnKey}
                />
            </nav>
        </Container>
    </header>
);

export default toolbar;