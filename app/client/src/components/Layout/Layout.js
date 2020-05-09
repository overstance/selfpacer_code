import React, { Component, Fragment } from 'react';
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
import BlogSearch from '../Search/blogSearch/blogSearch';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.sideDrawerIndicator = React.createRef();
        this.sideDrawerTrigger = React.createRef();
        this.nonBlogSearchTrigger = React.createRef();
        this.blogSearchTrigger = React.createRef();
    }
    
    state = {
        showSideDrawer: false,
        showBlogSectionMenu: false,

        showNonBlogSearch: false,
        showBlogSearch: false
    }

    componentDidUpdate(prevProps) {
        if(this.props.location !== prevProps.location) {
            this.setState({ showNonBlogSearch: false });
            this.setState({ showBlogSearch: false });
            this.props.onClearSearchMessages();
            // console.log(this.props.location.pathname);
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false }, () => {
            this.sideDrawerTrigger.current.focus();
        });
    }

    closeDrawerByBackdropOnKey = (event) => {
        if (event.key === "Enter" || event.key === "Tab") {
            this.setState({ showSideDrawer: false }, () => {
                this.sideDrawerTrigger.current.focus();
            });
        }
    }

    authenticatingHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawertoggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        }, () => {
            if(this.state.showSideDrawer === true) {
                this.sideDrawerIndicator.current.focus();
            }

            if(this.state.showSideDrawer === false) {
                this.sideDrawerTrigger.current.focus()
            }
        });
    }

    sideDrawerToggleHandlerOnKey = (event) => {
        // console.log(event.key);
        if(event.key === "Enter") {
            this.setState((prevState) => {
                return { showSideDrawer: !prevState.showSideDrawer };
            }, () => {
                this.sideDrawerIndicator.current.focus();
            });
        }
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

    showBlogSearchOnKey = (event) => {
        if(event.key === "Enter") {
            this.setState({ showBlogSearch: true});  
        }
    }

    closeNonBlogSearch = () => {
        this.setState({ showNonBlogSearch: false}, () => {
            this.nonBlogSearchTrigger.current.focus();
        });
    }
    
    closeNonBlogSearchByKey = (event) => {
        // console.log(event.key);
        if(event.key === "Enter" || event.key === "Tab") {
            this.setState({ showNonBlogSearch: false}, () => {
                this.nonBlogSearchTrigger.current.focus();
            });   
        }
    }

    showBlogSearch = () => {
        this.setState({ showBlogSearch: true});
    }

    showSearchOnKey = (event) => {
        // event.preventDefault();
        // console.log(event.key);

        if (event.key === "Enter") {
            this.setState({ showNonBlogSearch: true});
        }
    }

    closeBlogSearch = () => {
        this.setState({ showBlogSearch: false}, () => {
            this.blogSearchTrigger.current.focus();
        });
    }

    closeBlogSearchByBackdropOnKey = (event) => {
        if(event.key === "Enter" || event.key === "Tab") {
            this.setState({ showBlogSearch: false}, () => {
                this.blogSearchTrigger.current.focus();
            });   
        }
    }

    render() {
        return (
            <div className={classes.Site} >
                {this.props.isBlogPage ? 
                    <BlogToolBar
                        isAuth={this.props.isAuthenticated} 
                        sectionMenuClicked={this.sectionMenuToggleHandler}
                        showBlogSearch={this.showBlogSearch}
                        blogSearchActive={this.state.showBlogSearch}
                        showBlogSearchOnKey={this.showBlogSearchOnKey}
                        blogSearchTriggerRef={this.blogSearchTrigger}
                        activeLink={this.props.location.pathname}
                    /> 
                    :
                    <Fragment>
                        { this.props.isSiteHomeOrAuth ?
                            null :
                            <Toolbar
                            drawerTriggerRef={this.sideDrawerTrigger}
                            nonBlogSearchTriggerRef={this.nonBlogSearchTrigger}
                            isAuth={this.props.isAuthenticated}
                            sideDrawerToggleClicked={this.sideDrawertoggleHandler}
                            sideDrawerToggleClickedOnKey={this.sideDrawerToggleHandlerOnKey}
                            showSearch={this.showNonBlogSearch}
                            showSearchOnKey={this.showSearchOnKey}
                            sideDrawerOpen={this.state.showSideDrawer}
                            />
                        }
                    </Fragment>
                    
                }
                <div className={classes.Content}>
                    { this.props.isBlogPage || this.state.showSideDrawer === false ? null :
                        <SideDrawer
                            drawerIndicatorRef={this.sideDrawerIndicator}
                            isAuth={this.props.isAuthenticated}
                            open={this.state.showSideDrawer}
                            closed={this.sideDrawerClosedHandler}
                            closeByBackdropOnKey={this.sideDrawerClosedHandler}
                            // closeByBackdropBlur={this.closeDrawerByBackdropBlur}
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
                    <Fragment>
                        {this.props.children}
                    </Fragment>
                    { this.state.showNonBlogSearch ?
                        <NonBlogSearch 
                            showSearch={this.state.showNonBlogSearch}
                            closeSearch={this.closeNonBlogSearch}
                            closeSearchByBackdrop={this.closeNonBlogSearchByKey}
                        />
                        : null
                    }
                    { this.state.showBlogSearch && this.props.isBlogPage ?
                        <BlogSearch 
                            showBlogSearch={this.state.showBlogSearch}
                            closeBlogSearch={this.closeBlogSearch}
                            closeBlogSearchByBackdrop={this.closeBlogSearchByBackdropOnKey}
                        />
                        : null
                    }
                </div>
                { this.props.isBlogPage ?
                    <BlogFooter />
                    : null
                }
                {   this.props.isSiteHomeOrAuth ?
                    null :
                    <Footer />
                }
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
        isBlogPage: state.auth.isBlogPage,
        isSiteHomeOrAuth: state.auth.isSiteHomeOrAuth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClearSearchMessages: () => dispatch(actions.clearSearchMessages())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

