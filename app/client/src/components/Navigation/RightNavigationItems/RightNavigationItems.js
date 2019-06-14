import React, { Component } from 'react';
import classes from './RightNavigationItems.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';


class RightNavigationItems extends Component {

    render() {
        return(
            <div className={classes.NavigationItems}>
                {   this.props.isAuthenticated && !this.props.showSideDrawer ? 
                    <div className={classes.ItemContainer}>
                        <Link to="/profile">  
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.User} viewBox="0 0 32 32">
                                <path d="M15.999 0C7.162 0 0 7.164 0 16s7.162 16 15.999 16C24.837 32 32 24.837 32 16S24.837 0 15.999 0zm0 6.194c3.136 0 5.679 2.543 5.679 5.677 0 3.136-2.543 5.679-5.679 5.679-3.129 0-5.681-2.543-5.681-5.679 0-3.134 2.552-5.677 5.681-5.677zm0 22.193c-3.786 0-7.181-1.713-9.451-4.396 1.213-2.289 3.583-3.859 6.354-3.859.156 0 .311.025.458.07.837.27 1.716.45 2.638.45.924 0 1.809-.18 2.637-.45.15-.044.307-.07.462-.07 2.766 0 5.141 1.57 6.352 3.859-2.269 2.682-5.662 4.396-9.45 4.396z"/>
                            </svg>
                        </Link> 
                    </div>                
                    : null
                }
                <div className={classes.ItemContainer}>
                    <Link to="/search">
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.SearchIcon} viewBox="0 0 32 32">
                            <path d="M26.061 23.939l-5.23-5.231c.972-1.398 1.501-3.054 1.501-4.792 0-4.64-3.775-8.416-8.415-8.416-4.639 0-8.414 3.775-8.416 8.417.002 4.64 3.776 8.416 8.414 8.416l.003-1.5v1.5c1.739 0 3.395-.529 4.792-1.503l5.23 5.231c.292.293.676.439 1.06.439s.768-.146 1.061-.439c.585-.586.585-1.536 0-2.122zm-12.144-4.607h-.004c-2.983 0-5.411-2.43-5.413-5.416.002-2.986 2.431-5.416 5.416-5.416 2.986 0 5.415 2.429 5.415 5.416 0 1.447-.563 2.808-1.586 3.831-1.022 1.022-2.382 1.585-3.828 1.585z"/>
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

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onFetchUserAssets: ( userId ) => dispatch(actions.fetchUserAssets( userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightNavigationItems);