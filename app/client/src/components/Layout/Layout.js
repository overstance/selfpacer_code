import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import BlogToolBar from '../Navigation/BlogNav/toolBar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import Footer from '../Navigation/Footer/Footer';
import * as actions from '../../store/actions/index';
import BlogSectionMenuDrawer from '../Navigation/BlogNav/blogSectionMenuDrawer'


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
        showSideDrawer: false,
        showBlogSectionMenu: false
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

    sectionMenuToggleHandler = () => {
        this.setState((prevState) => {
            return { showBlogSectionMenu: !prevState.showBlogSectionMenu}
        })
    }

    sectionMenuCloseHandler = () => {
        this.setState({ showBlogSectionMenu: false});
    }

    render() {
        return (
            <div className={classes.Site} /* pageType={this.props.pageType} */>
                {/* <div ref={this.myScrollRef}></div> */}
                <div className={classes.Content}>
                    {this.props.isBlogPage ? 
                        <BlogToolBar
                        isAuth={this.props.isAuthenticated} 
                        sectionMenuClicked={this.sectionMenuToggleHandler}
                        /> 
                        :
                        <Toolbar
                            isAuth={this.props.isAuthenticated}
                            sideDrawerToggleClicked={this.sideDrawertoggleHandler}
                            searchbarToggleClicked={this.searchbarToggleHandler}
                            exploreRefresh={this.onExploreRefresh}
                        />
                    }
                    { this.props.isBlogPage ? null :
                        <SideDrawer
                            isAuth={this.props.isAuthenticated}
                            open={this.state.showSideDrawer}
                            closed={this.sideDrawerClosedHandler}
                            onAuth={this.authenticatingHandler}
                            userName={this.props.userName}
                            showSideDrawer={this.state.showSideDrawer}
                        />
                    }
                    { this.props.isBlogPage ?
                        <BlogSectionMenuDrawer 
                        onMenuSelect={this.sectionMenuCloseHandler}
                        open={this.state.showBlogSectionMenu}
                        closed={this.sectionMenuCloseHandler}
                        />
                        : null
                    }
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

