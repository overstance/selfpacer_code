import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import BlogTopToolBar from '../Navigation/BlogNav/topToolBar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import Footer from '../Navigation/Footer/Footer';
import * as actions from '../../store/actions/index';


class Layout extends Component {
   /*  constructor(props) {
        super(props)
        this.myScrollRef = React.createRef()
    }

    componentDidMount = () => this.handleScrollOnLoad();
    componentDidUpdate = () => this.handleScrollOnLoad();

    handleScrollOnLoad = () => {
        const { index, selected } = this.props
        if (index === selected) {
          setTimeout(() => {
            this.myScrollRef.current.scrollIntoView({ behavior: 'smooth' })
          }, 500)
        }
    } */

    state = {
        showSideDrawer: false
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

    render() {
        return (
            <div className={classes.Site} /* pageType={this.props.pageType} */>
                {/* <div ref={this.myScrollRef}></div> */}
                <div className={classes.Content}>
                    {this.props.isBlogPage ? 
                        <BlogTopToolBar
                        isAuth={this.props.isAuthenticated} 
                        /> 
                        :
                        <Toolbar
                            isAuth={this.props.isAuthenticated}
                            sideDrawerToggleClicked={this.sideDrawertoggleHandler}
                            searchbarToggleClicked={this.searchbarToggleHandler}
                            exploreRefresh={this.onExploreRefresh}
                        />
                    }
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        onAuth={this.authenticatingHandler}
                        userName={this.props.userName}
                        showSideDrawer={this.state.showSideDrawer}
                    />
                    <main>
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
        userId: state.auth.user._id,
        isAuthenticated: state.auth.isAuthenticated,
        userName: state.auth.user.name,
        isBlogPage: state.auth.isBlogPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onFetchUserAssets: ( userId ) => dispatch(actions.fetchUserAssets( userId )),
        onLogoutUser: () => dispatch(actions.logout())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Layout);

