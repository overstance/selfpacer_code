import React, { Component } from 'react';
import classes from './blogNav.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as actions from '../../../store/actions/index';


class RightNavigationItems extends Component {

    render() {
        return(
            <div className={classes.RightNavItems}>
                {   this.props.isAuthenticated ? 
                    <div className={classes.ItemContainer}>
                        <Link to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.User} viewBox="0 0 24 24">
                                <path d="M12 2c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4m0-2C8.686 0 6 2.687 6 6s2.686 6 6 6c3.313 0 6-2.687 6-6s-2.687-6-6-6zm6 14c2.206 0 4 1.794 4 4v3c0 .552-.448 1-1 1H3c-.551 0-1-.448-1-1v-3c0-2.206 1.794-4 4-4h.537c.164.064.437.186.648.279.508.226 1.141.507 1.814.732.967.325 1.977.489 3.001.489s2.033-.164 3.002-.488c.671-.226 1.303-.507 1.812-.732.211-.094.484-.215.649-.279H18M18 12h-.757c-.418 0-1.618.692-2.878 1.115-.743.249-1.537.385-2.365.385s-1.623-.136-2.366-.385C8.374 12.692 7.175 12 6.757 12H6c-3.313 0-6 2.687-6 6v3c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-3c0-3.313-2.687-6-6-6z"/>
                            </svg>
                        </Link> 
                    </div>                
                    : 
                    // null
                    <div className={classes.ItemContainer}>
                        <Link to="/login">  
                            <span>Log In</span>
                        </Link> 
                        <Link to="/register">  
                            <span>Sign Up</span>
                        </Link>
                    </div>
                }
                <div className={classes.ItemContainer}>
                    <Link to="/blog_search">
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.SearchIcon} viewBox="0 0 24 24">
                            <path d="M23.707 22.293l-5.966-5.966C19.152 14.603 20 12.4 20 10c0-5.521-4.479-10-10-10S0 4.479 0 10s4.479 10 10 10c2.4 0 4.603-.848 6.327-2.259l5.966 5.966c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414zM10 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                        </svg>
                    </Link>
                </div>               
            </div> 
        );
    }
};

const mapStateToProps = state => ({
    userId: state.auth.user._id
});

/* const mapDispatchToProps = dispatch => {
    return {
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onFetchUserAssets: ( userId ) => dispatch(actions.fetchUserAssets( userId))
    };
}; */

export default connect(mapStateToProps/* , mapDispatchToProps */)(RightNavigationItems);