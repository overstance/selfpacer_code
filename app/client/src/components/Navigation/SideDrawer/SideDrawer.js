import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import NavBackdrop from '../../UserInterface/Backdrop/NavBackdrop';
import Aux from '../../../hoc/Auxiliary';
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
        <Aux>
            <NavBackdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Link to='/' onClick={props.onAuth} className={classes.LogoContainer}>
                    <Logo isSidedrawer/>
                </Link>
                <nav>
                    <NavigationItems 
                    isAuthenticated={props.isAuth} 
                    closeSideDrawer={props.onAuth}
                    showSideDrawer={props.showSideDrawer}
                    />
                </nav>
                 
            </div>
        </Aux>
    );
};

export default sideDrawer;

//<BackdropCloser show={props.open} clicked={props.closed} />