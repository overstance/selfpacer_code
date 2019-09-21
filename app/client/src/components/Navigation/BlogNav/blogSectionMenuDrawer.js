import React from 'react';
import classes from './blogNav.module.css';
import Backdrop from './blogNavBackdrop';
import SectionMenuItems from './blogSectionMenuItems';



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
                <nav className={classes.SectionMenuItems}>
                    <SectionMenuItems 
                        onMenuSelected={props.onMenuSelect}
                    />
                </nav>
                 
            </div>
        </div>
    );
};

export default sideDrawer;