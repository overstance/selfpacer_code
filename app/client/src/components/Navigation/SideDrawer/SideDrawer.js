import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UserInterface/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';
//import BackdropCloser from '../../UserInterface/Backdrop/BackdropCloser/BackdropCloser';



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
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} closeSideDrawer={props.onAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;

//<BackdropCloser show={props.open} clicked={props.closed} />