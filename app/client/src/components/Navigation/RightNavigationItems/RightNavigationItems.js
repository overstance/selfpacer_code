import React, { Component } from 'react';
import classes from './RightNavigationItems.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as actions from '../../../store/actions/index';


class RightNavigationItems extends Component {

    render() {
        return(
            <div className={classes.NavigationItems}>
                {   this.props.isAuthenticated /* && !this.props.showSideDrawer */ ? 
                    <div className={classes.ItemContainer}>
                        <Link to="/profile">  
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.User} viewBox="0 0 32 32">
                                <path d="M15.999 0C7.162 0 0 7.164 0 16s7.162 16 15.999 16C24.837 32 32 24.837 32 16S24.837 0 15.999 0zm0 6.194c3.136 0 5.679 2.543 5.679 5.677 0 3.136-2.543 5.679-5.679 5.679-3.129 0-5.681-2.543-5.681-5.679 0-3.134 2.552-5.677 5.681-5.677zm0 22.193c-3.786 0-7.181-1.713-9.451-4.396 1.213-2.289 3.583-3.859 6.354-3.859.156 0 .311.025.458.07.837.27 1.716.45 2.638.45.924 0 1.809-.18 2.637-.45.15-.044.307-.07.462-.07 2.766 0 5.141 1.57 6.352 3.859-2.269 2.682-5.662 4.396-9.45 4.396z"/>
                            </svg>
                        </Link> 
                    </div>                
                    : 
                    <div className={classes.ItemContainer}>
                        <Link to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.LoginIcon} viewBox="0 0 20 20">
                                <path d="M16.251 17.343h-3.282c-.258 0-.469-.211-.469-.468v-1.563c0-.259.211-.47.469-.47h3.282c.69 0 1.249-.559 1.249-1.25V6.094c0-.692-.559-1.251-1.249-1.251h-3.282c-.258 0-.469-.211-.469-.468V2.813c0-.259.211-.47.469-.47h3.282C18.32 2.343 20 4.022 20 6.094v7.499c0 2.07-1.68 3.75-3.749 3.75zm-1.837-7.852L7.853 2.929c-.586-.586-1.603-.176-1.603.665v3.749H.938c-.52 0-.938.419-.938.938v3.749c0 .52.418.938.938.938H6.25v3.749c0 .84 1.017 1.25 1.603.664l6.562-6.562c.362-.367.362-.961-.001-1.328z"/>
                            </svg>
                        </Link>
                    </div>
                }
                <div className={classes.ItemContainer}>
                    <Link to="/search">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className={classes.SearchIcon} viewBox="0 0 32 32">
                            <path d="M26.061 23.939l-5.23-5.231c.972-1.398 1.501-3.054 1.501-4.792 0-4.64-3.775-8.416-8.415-8.416-4.639 0-8.414 3.775-8.416 8.417.002 4.64 3.776 8.416 8.414 8.416l.003-1.5v1.5c1.739 0 3.395-.529 4.792-1.503l5.23 5.231c.292.293.676.439 1.06.439s.768-.146 1.061-.439c.585-.586.585-1.536 0-2.122zm-12.144-4.607h-.004c-2.983 0-5.411-2.43-5.413-5.416.002-2.986 2.431-5.416 5.416-5.416 2.986 0 5.415 2.429 5.415 5.416 0 1.447-.563 2.808-1.586 3.831-1.022 1.022-2.382 1.585-3.828 1.585z"/>
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.SearchIcon} viewBox="0 0 20 20">
                            <path d="M19.713 17.28l-3.889-3.889c-.176-.174-.414-.271-.664-.271h-.636c1.077-1.378 1.716-3.109 1.716-4.992 0-4.482-3.631-8.113-8.112-8.113S.015 3.646.015 8.128c0 4.48 3.632 8.113 8.113 8.113 1.884 0 3.616-.642 4.992-1.719v.637c0 .25.098.487.272.662l3.889 3.891c.367.365.96.365 1.324 0l1.104-1.104c.366-.367.366-.961.004-1.328zM8.128 13.12c-2.757 0-4.992-2.23-4.992-4.992 0-2.758 2.231-4.992 4.992-4.992 2.758 0 4.992 2.23 4.992 4.992 0 2.758-2.23 4.992-4.992 4.992z"/>
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