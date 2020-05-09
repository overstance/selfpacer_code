import React/* , { Component } */ from 'react';
import classes from './blogNav.module.css';
import { NavLink } from 'react-router-dom';

const mainNavItems = (props) => {

    let activeLink = props.activeLink;
    let sectionMenuTextClasses = [classes.sectionMenuText];
    let sectionMenuDropIconClasses = [classes.sectionMenuDropIcon];
    let sectionPath = activeLink.split("/")[2];
    // console.log(sectionPath);

    if (sectionPath === 'sections') {
        sectionMenuTextClasses.push(classes.NavActive);
        sectionMenuDropIconClasses.push(classes.NavIconActive);
    }
    
    return (    
        <nav className={classes.MainNavItems}>
            <NavLink className={classes.MainNavItem} activeClassName={classes.NavActive} exact to="/blog" role="menuitem" >Home</NavLink>
            <NavLink className={classes.MainNavItem} activeClassName={classes.NavActive} to="/blog/popular_blogposts" role="menuitem">Popular</NavLink>
            <NavLink className={classes.MainNavItem} activeClassName={classes.NavActive} to="/blog/latest_blogposts" role="menuitem">Latest</NavLink>
            <span 
                role="button" 
                aria-label="open section menu"
                onClick={props.sectionClicked}
                onKeyDown={props.sectionKeyed}
                tabIndex="-1"
                className={sectionMenuTextClasses.join(' ')}
            >
                Sections
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512"
                    className={sectionMenuDropIconClasses.join(' ')}
                >
                    <path d="M125.1 208h197.8c10.7 0 16.1 13 8.5 20.5l-98.9 98.3c-4.7 4.7-12.2 4.7-16.9 0l-98.9-98.3c-7.7-7.5-2.3-20.5 8.4-20.5zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/>
                </svg>
            </span>
        </nav>
    );
}

export default mainNavItems;  