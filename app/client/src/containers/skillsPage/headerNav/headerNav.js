import React from 'react';
import classes from './headerNav.module.css';


const exploreHeaderNav = (props) => {
    
    const allClasses = [classes.All];
    if (props.allActived) {
        allClasses.push(classes.Active);
    }

    const creativeClasses = [classes.Creative];
    if (props.creativeActived) {
        creativeClasses.push(classes.Active);
    }

    const businessClasses = [classes.Business];
    if (props.businessActived) {
        businessClasses.push(classes.Active);
    }

    const technologyClasses = [classes.Technology];
    if (props.technologyActived) {
        technologyClasses.push(classes.Active);
    }

    const scienceClasses = [classes.Science];
    if (props.scienceActived) {
        scienceClasses.push(classes.Active);
    }

    const lifestyleClasses = [classes.Lifestyle];
    if (props.lifestyleActived) {
        lifestyleClasses.push(classes.Active);
    }

    return (
        props.show ?
            <ul className={classes.navigation}>
                <li className={allClasses.join(' ')} onClick={props.allClicked}>All</li>
                <li className={creativeClasses.join(' ')} onClick={props.creativeClicked}>Creative</li>
                <li className={businessClasses.join(' ')} onClick={props.businessClicked}>Business</li>
                <li className={technologyClasses.join(' ')} onClick={props.technologyClicked}>Technology</li>
                <li className={scienceClasses.join(' ')} onClick={props.scienceClicked}>Science</li>
                <li className={lifestyleClasses.join(' ')} onClick={props.lifeStyleClicked}>Life-style</li>
            </ul>
            : null
    );
}

export default exploreHeaderNav;
