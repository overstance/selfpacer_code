import React, { Component } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import SearchBar from '../../SearchBar/SearchBar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';


class NavigationItems extends Component {

    profileClickedHandler = () => {
        this.props.onFetchUserCollections( this.props.userId );
        this.props.onFetchUserAssets( this.props.userId );
    }

    render() {
        return(
            <ul className={classes.NavigationItems}>

                <li className={classes.SearchBarWrap}>
                    <SearchBar />
                </li>
                {this.props.isAuthenticated && !this.props.showSideDrawer ? 
                <Link style={{ 'paddingLeft': '15px'}} to="/profile" 
                onClick={this.profileClickedHandler}
                >
                    <div className={classes.User}></div>
                </Link> 
                : null}
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

const mapStateToProps = state => ({
    userId: state.auth.user._id
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onFetchUserAssets: ( userId ) => dispatch(actions.fetchUserAssets( userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);