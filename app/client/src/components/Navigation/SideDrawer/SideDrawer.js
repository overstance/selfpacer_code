import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import NavBackdrop from '../../UserInterface/Backdrop/NavBackdrop';
import { Link } from 'react-router-dom';
import Logo from '../../UserInterface/Logo/Logo';



const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    if (props.onAuth === true) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <section>
            <div
            role="menuitem"
            tabIndex="0"
            ref={props.drawerIndicatorRef}
            >
                Side menu opened
            </div>
            <nav className={attachedClasses.join(' ')}>
                <Link to='/' onClick={props.onAuth} className={classes.LogoContainer}>
                    <Logo isSidedrawer/>
                </Link>
                <nav className={classes.sideDrawerContainer}>
                    <NavigationItems 
                    isAuthenticated={props.isAuth} 
                    closeSideDrawer={props.onAuth}
                    showSideDrawer={props.showSideDrawer}
                    />
                </nav>     
            </nav>
            <NavBackdrop 
                show={props.open} 
                clicked={props.closed} 
                keyboarded={props.closeByBackdropOnKey}
            />
        </section>
    );
};

export default sideDrawer;