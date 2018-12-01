import React, { Component } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import SearchBar from '../../SearchBar/SearchBar';
//import { connect } from 'react-redux';


class NavigationItems extends Component {


    render() {
        return(
            <ul className={classes.NavigationItems}>

                <li className={classes.SearchBarWrap}>
                    <SearchBar />
                </li>
                {this.props.isAuthenticated && !this.props.showSideDrawer ? <NavigationItem link="/profile" isAuthenticating={this.props.closeSideDrawer}><div className={classes.User}></div></NavigationItem> : null}
                {this.props.isAuthenticated ? <NavigationItem link="/collections" isAuthenticating={this.props.closeSideDrawer}>Collections</NavigationItem> : null}
                {this.props.isAuthenticated ? <NavigationItem link="/my_asset" isAuthenticating={this.props.closeSideDrawer}>Assets</NavigationItem> : null}
                {!this.props.isAuthenticated ? <NavigationItem link="/login" isAuthenticating={this.props.closeSideDrawer}>LogIn</NavigationItem>: null}
                {!this.props.isAuthenticated ? <NavigationItem link="/register" isAuthenticating={this.props.closeSideDrawer}>SignUp</NavigationItem> : null}
                <NavigationItem link="/blogs" isAuthenticating={this.props.closeSideDrawer}>Blogs</NavigationItem>
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