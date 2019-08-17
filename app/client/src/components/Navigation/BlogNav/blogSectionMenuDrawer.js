import React from 'react';
// import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './blogNav.module.css';
import Backdrop from './blogNavBackdrop';
import SectionMenuItems from './blogSectionMenuItems';
// import Aux from '../../../hoc/Auxiliary';
// import { Link } from 'react-router-dom';
// import Logo from '../../UserInterface/Logo/Logo';



const sideDrawer = (props) => {
    let attachedClasses = [classes.SectionMenuDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SectionMenuDrawer, classes.Open];
    }

    if (props.onMenuSelect === true) {
        attachedClasses = [classes.SectionMenuDrawer, classes.Open];
    }

    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                {/* <Link to='/' onClick={props.onAuth} className={classes.LogoContainer}>
                    <Logo isSidedrawer/>
                </Link> */}
                <nav className={classes.SectionMenuItems}>
                    <SectionMenuItems onMenuSelected={props.onMenuSelect}/>
                </nav>
                 
            </div>
        </div>
    );
};

export default sideDrawer;