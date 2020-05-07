import React, { Component, Fragment } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';


class NavigationItems extends Component {

    render() {
        let exploreIcon= [classes.Icon];
        let skillsIcon = [classes.Icon];
        let collectionsIcon = [classes.Icon];
        let facilitateIcon = [classes.Icon];

        let basePath = this.props.location.pathname.split("/")[1];
        // console.log(basePath);

        if (basePath === "explore") {
            exploreIcon.push(classes.NavActive);
        }

        if (basePath === "skills") {
            skillsIcon.push(classes.NavActive);
        }

        if (basePath === "collections") {
            collectionsIcon.push(classes.NavActive);
        }

        if (basePath === "facilitate") {
            facilitateIcon.push(classes.NavActive);
        }
        
        return(
            <Fragment>
                <NavigationItem 
                    link="/explore"
                    isAuthenticating={this.props.closeSideDrawer}
                    description='explore'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={exploreIcon.join(' ')} viewBox="0 0 20 20">
                        <path d="M9.089 9.088c-.505.504-.505 1.32 0 1.824.502.504 1.32.504 1.824 0s.504-1.321 0-1.824c-.504-.504-1.322-.504-1.824 0zm.912-9.087C4.478.001 0 4.477 0 10s4.478 9.999 10.001 9.999C15.522 19.999 20 15.523 20 10S15.522.001 10.001.001zm5.085 5.97l-2.66 5.819c-.128.282-.354.507-.636.636l-5.82 2.66c-.671.307-1.362-.386-1.056-1.057l2.66-5.82c.129-.281.355-.508.636-.636l5.82-2.659c.671-.308 1.363.385 1.056 1.057z" />
                    </svg>
                    Explore
                </NavigationItem>
                <NavigationItem 
                    link="/skills"
                    isAuthenticating={this.props.closeSideDrawer}
                    description='go to skills'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={skillsIcon.join(' ')} viewBox="0 0 576 512">
                        <path d="M208 0c-29.87 0-54.74 20.55-61.8 48.22-.75-.02-1.45-.22-2.2-.22-35.34 0-64 28.65-64 64 0 4.84.64 9.51 1.66 14.04C52.54 138 32 166.57 32 200c0 12.58 3.16 24.32 8.34 34.91C16.34 248.72 0 274.33 0 304c0 33.34 20.42 61.88 49.42 73.89-.9 4.57-1.42 9.28-1.42 14.11 0 39.76 32.23 72 72 72 4.12 0 8.1-.55 12.03-1.21C141.61 491.31 168.25 512 200 512c39.77 0 72-32.24 72-72V205.45c-10.91 8.98-23.98 15.45-38.36 18.39-4.97 1.02-9.64-2.82-9.64-7.89v-16.18c0-3.57 2.35-6.78 5.8-7.66 24.2-6.16 42.2-27.95 42.2-54.04V64c0-35.35-28.66-64-64-64zm368 304c0-29.67-16.34-55.28-40.34-69.09 5.17-10.59 8.34-22.33 8.34-34.91 0-33.43-20.54-62-49.66-73.96 1.02-4.53 1.66-9.2 1.66-14.04 0-35.35-28.66-64-64-64-.75 0-1.45.2-2.2.22C422.74 20.55 397.87 0 368 0c-35.34 0-64 28.65-64 64v74.07c0 26.09 17.99 47.88 42.2 54.04 3.46.88 5.8 4.09 5.8 7.66v16.18c0 5.07-4.68 8.91-9.64 7.89-14.38-2.94-27.44-9.41-38.36-18.39V440c0 39.76 32.23 72 72 72 31.75 0 58.39-20.69 67.97-49.21 3.93.67 7.91 1.21 12.03 1.21 39.77 0 72-32.24 72-72 0-4.83-.52-9.54-1.42-14.11 29-12.01 49.42-40.55 49.42-73.89z"/>
                    </svg>
                    Skills
                </NavigationItem>
                <NavigationItem 
                    link="/collections" 
                    isAuthenticating={this.props.closeSideDrawer}
                    description='go to collections'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={collectionsIcon.join(' ')} viewBox="0 0 20 20">
                        <path d="M7.813 11.249H3.437c-.835 0-1.254 1.008-.664 1.602l1.285 1.211L.183 17.94c-.242.242-.242.641 0 .884l.992.992c.243.241.641.241.883 0l3.878-3.88 1.215 1.289c.589.59 1.597.172 1.597-.663v-4.376c.002-.52-.416-.937-.935-.937zm4.374-2.5h4.376c.836 0 1.254-1.013.664-1.602l-1.289-1.211 3.879-3.88c.242-.241.242-.64 0-.882l-.992-.992c-.242-.242-.641-.242-.883 0l-3.879 3.879-1.215-1.29c-.59-.589-1.599-.171-1.599.665v4.375c0 .519.419.938.938.938zm3.751 5.313l1.289-1.216c.59-.589.172-1.597-.664-1.597h-4.376c-.519 0-.938.417-.938.937v4.376c0 .835 1.013 1.253 1.603.663l1.211-1.285 3.879 3.879c.242.242.641.242.883 0l.992-.992c.242-.242.242-.641 0-.882l-3.879-3.883zM7.148 2.776L5.937 4.062 2.059.183c-.242-.242-.641-.242-.883 0l-.993.992c-.242.242-.242.641 0 .882l3.879 3.88L2.773 7.15c-.59.591-.172 1.599.664 1.599h4.375c.52 0 .937-.419.937-.938V3.437c.001-.833-1.011-1.251-1.601-.661z"/>
                    </svg>
                    Collections
                </NavigationItem>
                {this.props.isAuthenticated ? 
                    <NavigationItem 
                        link="/facilitate" 
                        isAuthenticating={this.props.closeSideDrawer}
                        description='facilitate'    
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={facilitateIcon.join(' ')} viewBox="0 0 20 20">
                            <path d="M19.619 8.386l-1.765-1.763c-.234-.235-.551-.366-.882-.366h-1.98V3.136c0-1.034-.837-1.871-1.871-1.871h-6.24c-1.033 0-1.872.837-1.872 1.871v3.119H3.03c-.331 0-.648.133-.884.366L.381 8.386c-.234.236-.365.552-.365.884v3.226h4.993v-.623c0-.344.28-.624.623-.624h1.249c.344 0 .624.28.624.624v.623h4.991v-.623c0-.344.28-.624.625-.624h1.247c.346 0 .624.28.624.624v.623h4.992V9.27c0-.332-.131-.648-.365-.884zm-7.123-2.131H7.505V3.761h4.991v2.494zm2.496 8.113c0 .346-.278.623-.624.623h-1.247c-.345 0-.625-.277-.625-.623v-.624H7.505v.624c0 .346-.28.623-.624.623H5.632c-.343 0-.623-.277-.623-.623v-.624H.016v3.744c0 .688.561 1.247 1.249 1.247h17.471c.69 0 1.249-.559 1.249-1.247v-3.744h-4.992v.624z"/>
                        </svg>
                        Facilitate
                    </NavigationItem> : null
                }
                <NavigationItem 
                    link="/blog" 
                    isAuthenticating={this.props.closeSideDrawer}
                    description='go to blog'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.Icon} viewBox="0 0 20 20">
                        <path d="M19.167 3.333H3.889c-.724 0-1.342.465-1.571 1.111H.833c-.46 0-.833.373-.833.833v9.445c0 1.073.87 1.944 1.944 1.944h17.223c.46 0 .833-.373.833-.834V4.167c0-.461-.373-.834-.833-.834zM1.666 14.723V6.11h.556v8.612c0 .154-.124.278-.278.278s-.278-.124-.278-.277zM18.334 15H3.869c.013-.091.02-.184.02-.277V5h14.445v10zM5.972 10.833h4.723c.23 0 .417-.187.417-.416V7.083c0-.23-.187-.417-.417-.417H5.972c-.229 0-.416.187-.416.417v3.334c0 .229.186.416.416.416zm.972-2.777h2.778v1.389H6.944V8.056zm-1.388 4.861v-.834c0-.229.187-.417.416-.417h4.723c.23 0 .417.188.417.417v.834c0 .23-.187.417-.417.417H5.972c-.23 0-.416-.187-.416-.417zm6.666 0v-.834c0-.229.187-.417.417-.417h3.611c.23 0 .417.188.417.417v.834c0 .23-.187.417-.417.417h-3.611c-.231 0-.417-.187-.417-.417zm0-5v-.834c0-.23.187-.417.417-.417h3.611c.23 0 .417.187.417.417v.834c0 .229-.187.417-.417.417h-3.611c-.231 0-.417-.188-.417-.417zm0 2.5v-.834c0-.229.187-.416.417-.416h3.611c.23 0 .417.187.417.416v.834c0 .229-.187.416-.417.416h-3.611c-.231 0-.417-.187-.417-.416z"/>
                    </svg>
                    Blog
                </NavigationItem>
            </Fragment> 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationItems));