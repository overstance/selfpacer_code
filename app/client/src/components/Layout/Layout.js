import React, { Component } from 'react';
//import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import Footer from '../Navigation/Footer/Footer';
import Searchbar from '../SearchBar/SearchBar';
//import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showSearchbar: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    authenticatingHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawertoggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    searchbarToggleHandler = () => {
        this.setState((prevState) => {
            return { showSearchbar: !prevState.showSearchbar };
        });
    }

    logoutHandler = () => {
        this.props.onLogout();
    }

    render() {
        console.log(this.props);
        return (
            <div className={classes.Site}>
                <div className={classes.Content}>
                    <Toolbar
                        isAuth={this.props.isAuthenticated}
                        sideDrawerToggleClicked={this.sideDrawertoggleHandler}
                        searchbarToggleClicked={this.searchbarToggleHandler}
                    />
                    {this.state.showSearchbar ? <div className={classes.Searchbar}>
                        <Searchbar />
                    </div> : null}
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        onAuth={this.authenticatingHandler}
                    />
                    <main >
                        {this.props.children}
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        //isAuthenticated: state.auth !== false
        isAuthenticated: state.auth.isAuthenticated,
    }
};


export default connect(mapStateToProps)(Layout);