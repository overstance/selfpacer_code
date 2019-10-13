import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import BlogToolBar from '../Navigation/BlogNav/toolBar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from '../Navigation/Footer/Footer';
import * as actions from '../../store/actions/index';
import BlogSectionMenuDrawer from '../Navigation/BlogNav/blogSectionMenuDrawer';
import BlogFooter from '../Navigation/BlogNav/blogFooterSection/BlogFooter';
import NonBlogSearch from '../Search/nonBlogSearch/NonBlogSearch';

class Layout extends Component {
    
    state = {
        showSideDrawer: false,
        showBlogSectionMenu: false,

        showNonBlogSearch: false
    }

    componentDidUpdate(prevProps) {
        if(this.props.location !== prevProps.location) {
            this.setState({ showNonBlogSearch: false });
            this.props.onClearSearchMessages()
        }
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

    showNonBlogSearch = () => {
        this.setState({ showNonBlogSearch: true});
    }

    closeNonBlogSearch = () => {
        this.setState({ showNonBlogSearch: false});
    }

    render() {
        return (
            <div className={classes.Site} >
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
                            showSearch={this.showNonBlogSearch}
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
                        userId={this.props.userId}
                        />
                        : null
                    }
                    <main>
                        {this.props.children}
                    </main>
                    { this.state.showNonBlogSearch ?
                        <NonBlogSearch 
                            showSearch={this.state.showNonBlogSearch}
                            closeSearch={this.closeNonBlogSearch}
                        />
                        : null
                    }
                </div>
                { this.props.isBlogPage ?
                    <BlogFooter /> : null
                }
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
        onClearSearchMessages: () => dispatch(actions.clearSearchMessages())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

