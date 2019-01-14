import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import NavBackdrop from '../../UserInterface/Backdrop/NavBackdrop';
import Aux from '../../../hoc/Auxiliary';
import { Link } from 'react-router-dom';
// import LogoDarkBlue from '../../../assets/images/logo-darkBlue.png';
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
            <NavBackdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Link to='/' onClick={props.onAuth} className={classes.LogoContainer}>
                    <div className={classes.HomeIcon}/>
                    <div className={classes.Logo}/>
                </Link>
                {props.isAuth ? 
                <Link 
                to="/profile" 
                onClick={props.onAuth} 
                className={classes.UserProfilePanel}
                >
                    <div className={classes.UserIconColumn}><div className={classes.UserIcon}></div></div>
                    <div className={classes.UserNameColumn}>
                        <div>Hi,</div>
                        <div className={classes.UserName}>{props.userName}</div>
                    </div>
                </Link>
                : null }
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