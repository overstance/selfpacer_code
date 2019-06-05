import React, { Component } from 'react';
import classes from './RightNavigationItems.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';


class RightNavigationItems extends Component {

    render() {
        return(
            <div className={classes.NavigationItems}>
                {this.props.isAuthenticated && !this.props.showSideDrawer ? 
                <Link style={{ 'paddingLeft': '15px'}} to="/profile"
                >  
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.User} viewBox="0 0 36 36">
                        <path className={classes.UserFill} fill="#40FF70" d="M17.999 2C9.162 2 2 9.164 2 18s7.162 16 15.999 16C26.837 34 34 26.837 34 18S26.837 2 17.999 2zm0 6.194c3.136 0 5.679 2.543 5.679 5.677 0 3.136-2.543 5.679-5.679 5.679-3.129 0-5.681-2.543-5.681-5.679 0-3.134 2.552-5.677 5.681-5.677zm0 22.193c-3.786 0-7.181-1.713-9.451-4.396 1.213-2.289 3.583-3.859 6.354-3.859.156 0 .311.025.458.07.837.27 1.716.45 2.638.45.924 0 1.809-.18 2.637-.45.15-.044.307-.07.462-.07 2.766 0 5.141 1.57 6.352 3.859-2.269 2.682-5.662 4.396-9.45 4.396z"/>
                        <circle fill="none" stroke="#3A2D80" strokeWidth="4" strokeMiterlimit="10" cx="18" cy="18" r="16"/>
                    </svg>
                </Link> 
                : null}
                <Link to="/search"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.SearchIcon} fill="#3A2D80" viewBox="0 0 24 24">
                        <path d="M23.413 20.586l-5.076-5.077C19.386 13.928 20 12.035 20 10c0-5.514-4.486-10-10-10S0 4.486 0 10s4.486 10 10 10c2.035 0 3.928-.614 5.509-1.663l5.076 5.077c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.78.781-2.047 0-2.828zM4 10c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6z"/>
                    </svg>
                </Link>               
            </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(RightNavigationItems);