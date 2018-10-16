import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
//import searchBar from '../../SearchBar/SearchBar';
import SearchBar from '../../SearchBar/SearchBar';


class NavigationItems extends Component {


    render() {
        return(
            <ul className={classes.NavigationItems}>

                <li className={classes.SearchBarWrap}>
                    <SearchBar />
                </li>
                {this.props.isAuthenticated ? <NavigationItem link="/logout" isAuthenticating={this.props.closeSideDrawer}>Log out</NavigationItem> : <NavigationItem link="/login" isAuthenticating={this.props.closeSideDrawer}>Log in</NavigationItem>}
                {!this.props.isAuthenticated ? <NavigationItem link="/register" isAuthenticating={this.props.closeSideDrawer}>Sign Up</NavigationItem> : null}
                {this.props.isAuthenticated ? <NavigationItem link="/home" >custompage</NavigationItem> : null}
                <NavigationItem 
                    link="/explore"
                    isAuthenticating={this.props.closeSideDrawer}
                >
                    Explore
                </NavigationItem>
            </ul> 
        );
    }
};
   

export default NavigationItems;

//{this.props.isAuthenticated ? <li className={classes.NavigationItem} ><a href="/api/logout">Log out</a></li> : <NavigationItem link="/login">Log in</NavigationItem>}