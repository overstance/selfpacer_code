import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import Footer from '../Navigation/Footer/Footer';


class Layout extends Component {
    state = {
        showSideDrawer: false
        /* showSearchbar: false */
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


    render() {
        return (
            <div className={classes.Site}>
                <div className={classes.Content}>
                    <Toolbar
                        isAuth={this.props.isAuthenticated}
                        sideDrawerToggleClicked={this.sideDrawertoggleHandler}
                        searchbarToggleClicked={this.searchbarToggleHandler}
                        /* showSearchbar={this.state.showSearchbar} */
                        exploreRefresh={this.onExploreRefresh}
                    />
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        onAuth={this.authenticatingHandler}
                        userName={this.props.userName}
                        showSideDrawer={this.state.showSideDrawer}
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

Layout.propTypes= {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userName: state.auth.user.name
    }
};



export default connect(mapStateToProps)(Layout);

