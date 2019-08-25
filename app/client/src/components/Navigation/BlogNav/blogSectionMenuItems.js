import React from 'react';
// import classes from './blogNav.module.css';
import { NavLink } from 'react-router-dom';

const blogSectionMenuItems = (props) => {

    const menus = [
        {name: 'Business', link: '/blog/business'},
        {name: 'Creative', link: '/blog/creative'},
        {name: 'Science', link: '/blog/science'},
        {name: 'Technology', link: '/blog/technology'},
        {name: 'Life-Style', link: '/blog/life-style'},
        {name: 'Reviews', link: '/blog/reviews'},
        {name: 'Videos', link: '/blog/videos'},
        {name: 'Podcasts', link: '/blog/podcasts'}
    ];

    const menuItems = menus.map((menu, i) => ( <NavLink to={menu.link} onClick={props.onMenuSelected} key={i}>{menu.name}</NavLink>));

    return(menuItems)
}

export default blogSectionMenuItems;