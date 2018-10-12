import React from 'react';
import classes from './ExploreHeaderNav.css'
import ExploreHeaderNavItem from './ExploreHeaderNavItem/ExploreHeaderNavItem';


const exploreHeaderNav = (props) => (
    <ul className={classes.navigation}>
        <ExploreHeaderNavItem clicked={props.creativeClicked}>Creative</ExploreHeaderNavItem>
        <ExploreHeaderNavItem clicked={props.businessClicked}>Business</ExploreHeaderNavItem>
        <ExploreHeaderNavItem clicked={props.technologyClicked}>Technology</ExploreHeaderNavItem>
        <ExploreHeaderNavItem clicked={props.lifeStyleClicked}>Life-style</ExploreHeaderNavItem>
    </ul>
);

export default exploreHeaderNav;
