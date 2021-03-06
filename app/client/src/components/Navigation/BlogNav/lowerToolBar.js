import React/* , { Component } */ from 'react';
import classes from './blogNav.module.css';
import { NavLink } from 'react-router-dom';

const lowerToolBar = (props) => {
    let activeLink = props.activeLink;

    let homeIcon= [classes.LowertoolBarIcon];
    let popularIcon = [classes.LowertoolBarIcon];
    let latestIcon = [classes.LowertoolBarIcon];
    let sectionsIcon = [classes.LowertoolBarIcon];

    let lowerToolbarSectionMenuTextClasses = [classes.lowerToolbarSectionMenuText];

    // let basePath = activeLink.split("/")[1];
    let secondPath = activeLink.split("/")[2];

    if ( activeLink === "/blog" ) {
        homeIcon.push(classes.NavIconActive);
    }

    if (secondPath === "popular_blogposts") {
        popularIcon.push(classes.NavIconActive);
    }

    if (secondPath === "latest_blogposts") {
        latestIcon.push(classes.NavIconActive);
    }

    if (secondPath === "sections") {
        sectionsIcon.push(classes.NavIconActive);
        lowerToolbarSectionMenuTextClasses.push(classes.NavActive);
    }

    // console.log(activeLink, secondPath);

    return (
        <nav className={classes.LowerToolBar}>
            <NavLink
                className={classes.LowerToolBarMenu}
                activeClassName={classes.NavActive} 
                role="menuitem" 
                aria-label="to blog home" 
                to="/blog"
                exact
            >
                <svg className={homeIcon.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 7.478l6.788 7.863.019.023.042.043c.06.076.142.278.151.343V22H5l-.001-6.219c.011-.096.093-.298.131-.351l.043-.044.039-.046L12 7.478m0-2.549c-.253 0-.505.1-.698.297l-7.604 8.809C3.313 14.43 3 15.197 3 15.75V23c0 .553.447 1 1 1h16c.552 0 1-.447 1-1v-7.25c0-.553-.313-1.32-.698-1.716l-7.604-8.809c-.193-.197-.445-.296-.698-.296zm11.737 7.395L20 8.247V1c0-.553-.447-1-1-1s-1 .447-1 1v5.065L12.737.324c-.379-.414-1.096-.414-1.475 0l-11 12c-.373.407-.346 1.04.062 1.413s1.04.345 1.413-.062l9.587-10.459c.373-.407.979-.407 1.352 0l9.587 10.459c.197.216.466.325.737.325.241 0 .483-.087.676-.263.407-.373.434-1.006.061-1.413z"/>
                </svg>
                Home
            </NavLink>
            <NavLink
                className={classes.LowerToolBarMenu}
                activeClassName={classes.NavActive} 
                role="menuitem"
                aria-label="to popular blog" 
                to="/blog/popular_blogposts"
            >
                <svg className={popularIcon.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23.992.889C23.99.824 23.971.764 23.955.7c-.014-.055-.021-.111-.045-.161-.021-.047-.057-.086-.086-.129-.039-.057-.075-.113-.125-.16-.009-.008-.012-.02-.021-.027-.034-.028-.075-.039-.111-.063-.056-.035-.108-.072-.172-.096-.061-.022-.124-.029-.188-.038C23.162.02 23.123 0 23.077 0h-7.385c-.511 0-.923.413-.923.923 0 .511.412.924.923.924h5.374l-7.685 8.94L8.827 7.84c-.219-.142-.488-.181-.74-.116-.252.067-.464.239-.583.47L.102 22.656c-.232.454-.053 1.01.4 1.242.136.07.279.102.42.102.336 0 .659-.184.823-.502L8.682 9.944l4.374 2.831c.389.25.9.177 1.201-.174l7.896-9.188v4.894c0 .511.413.923.924.923.51 0 .923-.412.923-.922V.923c0-.012-.007-.023-.008-.034z"/>
                </svg>
                Popular
            </NavLink>
            <NavLink
                className={classes.LowerToolBarMenu}
                activeClassName={classes.NavActive} 
                role="menuitem" 
                aria-label="to latest blog" 
                to="/blog/latest_blogposts"
            >
                <svg className={latestIcon.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 24C5.384 24 0 18.617 0 12S5.384 0 12 0c6.617 0 12 5.383 12 12s-5.383 12-12 12zm0-22C6.485 2 2 6.486 2 12s4.485 10 10 10c5.514 0 10-4.486 10-10S17.514 2 12 2zm4.242 5.758c-.391-.391-1.023-.391-1.414 0L13 9.586V4c0-.553-.448-1-1-1s-1 .447-1 1v7.996c-.001.133.026.265.077.39.029.067.078.121.121.181.032.047.052.1.094.142.041.042.095.061.141.094.061.042.113.092.182.12.123.052.254.079.385.079s.261-.027.384-.078c.12-.05.229-.122.319-.213.002-.001.003-.001.004-.002 0-.001.001-.001.002-.002l3.534-3.534c.39-.392.39-1.025-.001-1.415z"/>
                </svg>
                Latest
            </NavLink>
            <span 
                role="button" 
                aria-label="open sections"
                onClick={props.sectionClicked}
                onKeyDown={props.sectionKeyed}
                tabIndex="-1"
                className={lowerToolbarSectionMenuTextClasses.join(' ')}
            >
                <svg className={sectionsIcon.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21 2H3c-.553 0-1-.447-1-1s.447-1 1-1h18c.553 0 1 .447 1 1s-.447 1-1 1zm.999 6.333c0-.553-.447-1-1-1h-18c-.553 0-1 .447-1 1s.447 1 1 1h18c.553 0 1-.447 1-1zM22 15.667c0-.553-.447-1-1-1H3c-.553 0-1 .447-1 1s.447 1 1 1h18c.553 0 1-.447 1-1zM22 23c0-.553-.447-1-1-1H3c-.553 0-1 .447-1 1s.447 1 1 1h18c.553 0 1-.447 1-1z"/>
                </svg>
                Sections
            </span>
        </nav>
    );
}

export default lowerToolBar;