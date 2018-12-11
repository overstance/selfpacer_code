import React from 'react';
import classes from './Toolbar.css';
//import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
//import SearchbarToggle from '../../SearchBar/SearchbarToggle/SearchbarToggle';
import Searchbar from '../../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Container from '../../UserInterface/Container/Container';
import LogoGreen from '../../../assets/images/logo-green.png';
//import LogoOrange from '../../../assets/images/logo-orange.png';


const toolbar = (props) => (
    <div className={classes.Container}>
        <Container>
            <header className={classes.Toolbar}>
                <div className={classes.Logo}>
                    <Link to= "/"><img src={LogoGreen} alt='logo' style={{'height': '45px'}} /></Link>
                </div>
                <div className={classes.NewSearchContainer + ' ' + classes.DesktopOnlySearchbar}>
                    <Searchbar show />
                </div>
                <div className={classes.Widgets}>
                    <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems
                        isAuthenticated={props.isAuth}
                    />
                </nav>
            </header>
            <div className={classes.NewSearchContainer + ' ' + classes.MobileSearchBar}>
                <Searchbar show />
            </div>
        </Container>
    </div>
);

export default toolbar;