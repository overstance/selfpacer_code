import React from 'react';
import classes from './CollectionsNav.module.css';
import { Link } from 'react-router-dom';


const collectionsNav = (props) => {
    
    const mineClasses = [classes.Mine];
    if (props.mineActived) {
        mineClasses.push(classes.Active);
    }

    const sharedClasses = [classes.Shared];
    if (props.sharedActived) {
        sharedClasses.push(classes.Active);
    }

    const pinnedClasses = [classes.Pinned];
    if (props.pinnedActived) {
        pinnedClasses.push(classes.Active);
    }

    const featuredClasses = [classes.Featured];
    if (props.featuredActived) {
        featuredClasses.push(classes.Active);
    }

    /* const createClasses = [classes.Create];
    if (props.createActived) {
        createClasses.push(classes.Active);
    } */

    /* const lifestyleClasses = [classes.Lifestyle];
    if (props.lifestyleActived) {
        lifestyleClasses.push(classes.Active);
    } */

    return (
        // props.show ?
        <ul className={classes.navigation}>
            <li className={mineClasses.join(' ')} onClick={props.mineClicked}>My-collections</li>
            <li className={featuredClasses.join(' ')} onClick={props.featuredClicked}>Featured</li>
            <li className={sharedClasses.join(' ')} onClick={props.sharedClicked}>Shared</li>
            <li className={pinnedClasses.join(' ')} onClick={props.pinnedClicked}>Pinned</li>
            <Link className={classes.Create} to={props.createRoute}>Create-new</Link>
            {/* <li className={lifestyleClasses.join(' ')} onClick={props.lifeStyleClicked}>Humanities</li> */}
        </ul>
            // : null
    );
}

export default collectionsNav;
