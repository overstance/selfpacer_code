import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';


class NavigationItems extends Component {

    render() {
        return(
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/collections" isAuthenticating={this.props.closeSideDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.Icon} viewBox="0 0 20 20">
                        <path d="M7.813 11.249H3.437c-.835 0-1.254 1.008-.664 1.602l1.285 1.211L.183 17.94c-.242.242-.242.641 0 .884l.992.992c.243.241.641.241.883 0l3.878-3.88 1.215 1.289c.589.59 1.597.172 1.597-.663v-4.376c.002-.52-.416-.937-.935-.937zm4.374-2.5h4.376c.836 0 1.254-1.013.664-1.602l-1.289-1.211 3.879-3.88c.242-.241.242-.64 0-.882l-.992-.992c-.242-.242-.641-.242-.883 0l-3.879 3.879-1.215-1.29c-.59-.589-1.599-.171-1.599.665v4.375c0 .519.419.938.938.938zm3.751 5.313l1.289-1.216c.59-.589.172-1.597-.664-1.597h-4.376c-.519 0-.938.417-.938.937v4.376c0 .835 1.013 1.253 1.603.663l1.211-1.285 3.879 3.879c.242.242.641.242.883 0l.992-.992c.242-.242.242-.641 0-.882l-3.879-3.883zM7.148 2.776L5.937 4.062 2.059.183c-.242-.242-.641-.242-.883 0l-.993.992c-.242.242-.242.641 0 .882l3.879 3.88L2.773 7.15c-.59.591-.172 1.599.664 1.599h4.375c.52 0 .937-.419.937-.938V3.437c.001-.833-1.011-1.251-1.601-.661z"/>
                    </svg>
                    Collections
                </NavigationItem>
                {this.props.isAuthenticated ? 
                    <NavigationItem link="/facilitate" isAuthenticating={this.props.closeSideDrawer}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.Icon} viewBox="0 0 20 20">
                            <path d="M19.619 8.386l-1.765-1.763c-.234-.235-.551-.366-.882-.366h-1.98V3.136c0-1.034-.837-1.871-1.871-1.871h-6.24c-1.033 0-1.872.837-1.872 1.871v3.119H3.03c-.331 0-.648.133-.884.366L.381 8.386c-.234.236-.365.552-.365.884v3.226h4.993v-.623c0-.344.28-.624.623-.624h1.249c.344 0 .624.28.624.624v.623h4.991v-.623c0-.344.28-.624.625-.624h1.247c.346 0 .624.28.624.624v.623h4.992V9.27c0-.332-.131-.648-.365-.884zm-7.123-2.131H7.505V3.761h4.991v2.494zm2.496 8.113c0 .346-.278.623-.624.623h-1.247c-.345 0-.625-.277-.625-.623v-.624H7.505v.624c0 .346-.28.623-.624.623H5.632c-.343 0-.623-.277-.623-.623v-.624H.016v3.744c0 .688.561 1.247 1.249 1.247h17.471c.69 0 1.249-.559 1.249-1.247v-3.744h-4.992v.624z"/>
                        </svg>
                        Facilitate
                    </NavigationItem> : null
                }
                {!this.props.isAuthenticated ? 
                    <NavigationItem link="/login" isAuthenticating={this.props.closeSideDrawer}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.Icon} viewBox="0 0 20 20">
                            <path d="M16.251 17.343h-3.282c-.258 0-.469-.211-.469-.468v-1.563c0-.259.211-.47.469-.47h3.282c.69 0 1.249-.559 1.249-1.25V6.094c0-.692-.559-1.251-1.249-1.251h-3.282c-.258 0-.469-.211-.469-.468V2.813c0-.259.211-.47.469-.47h3.282C18.32 2.343 20 4.022 20 6.094v7.499c0 2.07-1.68 3.75-3.749 3.75zm-1.837-7.852L7.853 2.929c-.586-.586-1.603-.176-1.603.665v3.749H.938c-.52 0-.938.419-.938.938v3.749c0 .52.418.938.938.938H6.25v3.749c0 .84 1.017 1.25 1.603.664l6.562-6.562c.362-.367.362-.961-.001-1.328z"/>
                        </svg>
                        Log-In
                    </NavigationItem>: null
                }
                <NavigationItem link="/blog" isAuthenticating={this.props.closeSideDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.Icon} viewBox="0 0 20 20">
                        <path d="M19.167 3.333H3.889c-.724 0-1.342.465-1.571 1.111H.833c-.46 0-.833.373-.833.833v9.445c0 1.073.87 1.944 1.944 1.944h17.223c.46 0 .833-.373.833-.834V4.167c0-.461-.373-.834-.833-.834zM1.666 14.723V6.11h.556v8.612c0 .154-.124.278-.278.278s-.278-.124-.278-.277zM18.334 15H3.869c.013-.091.02-.184.02-.277V5h14.445v10zM5.972 10.833h4.723c.23 0 .417-.187.417-.416V7.083c0-.23-.187-.417-.417-.417H5.972c-.229 0-.416.187-.416.417v3.334c0 .229.186.416.416.416zm.972-2.777h2.778v1.389H6.944V8.056zm-1.388 4.861v-.834c0-.229.187-.417.416-.417h4.723c.23 0 .417.188.417.417v.834c0 .23-.187.417-.417.417H5.972c-.23 0-.416-.187-.416-.417zm6.666 0v-.834c0-.229.187-.417.417-.417h3.611c.23 0 .417.188.417.417v.834c0 .23-.187.417-.417.417h-3.611c-.231 0-.417-.187-.417-.417zm0-5v-.834c0-.23.187-.417.417-.417h3.611c.23 0 .417.187.417.417v.834c0 .229-.187.417-.417.417h-3.611c-.231 0-.417-.188-.417-.417zm0 2.5v-.834c0-.229.187-.416.417-.416h3.611c.23 0 .417.187.417.416v.834c0 .229-.187.416-.417.416h-3.611c-.231 0-.417-.187-.417-.416z"/>
                    </svg>
                    Blog
                </NavigationItem>
                <NavigationItem 
                    link="/explore"
                    isAuthenticating={this.props.closeSideDrawer}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.Icon} viewBox="0 0 20 20">
                        <path d="M9.089 9.088c-.505.504-.505 1.32 0 1.824.502.504 1.32.504 1.824 0s.504-1.321 0-1.824c-.504-.504-1.322-.504-1.824 0zm.912-9.087C4.478.001 0 4.477 0 10s4.478 9.999 10.001 9.999C15.522 19.999 20 15.523 20 10S15.522.001 10.001.001zm5.085 5.97l-2.66 5.819c-.128.282-.354.507-.636.636l-5.82 2.66c-.671.307-1.362-.386-1.056-1.057l2.66-5.82c.129-.281.355-.508.636-.636l5.82-2.659c.671-.308 1.363.385 1.056 1.057z"/>
                    </svg>
                    Explore
                </NavigationItem>
            </ul> 
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);