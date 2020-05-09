import React from 'react';
import classes from './blogNav.module.css';
import { NavLink } from 'react-router-dom';

const blogSectionMenuItems = (props) => {

    const menus = [
        {name: 'Business'},
        {name: 'Creative'},
        {name: 'Science'},
        {name: 'Technology'},
        {name: 'Humanities'},
        {name: 'Reports'},
        {name: 'Reviews'}/* ,
        {name: 'Videos'},
        {name: 'Podcasts'} */
    ];

    const menuItems = menus.map((menu, i) => ( 
        <NavLink 
            to={`/blog/sections/${menu.name}`} 
            className={classes.SectionMenuItem}
            activeClassName={classes.NavActive}
            onClick={props.onMenuSelected} 
            key={i}>{menu.name}
        </NavLink>)
    );

    return(menuItems)
}

export default blogSectionMenuItems;