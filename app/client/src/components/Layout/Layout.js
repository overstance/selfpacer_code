import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawertoggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    logoutHandler = () => {
        this.props.onLogout();
    }

    render() {
        console.log(this.props);
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    sideDrawerToggleClicked={this.sideDrawertoggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        //isAuthenticated: state.auth !== false
        isAuthenticated: state.auth.isAuthenticated,
        //onLogout: state.auth.onLogout
    }
};

/*const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
        //onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/home'))
    };
};*/
export default connect(mapStateToProps)(Layout);