import React, { Component } from 'react';
import classes from './UserCollections.module.css';
import {connect} from 'react-redux';
import UserCollectionContainer from './userCollectionContainer/userCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';

class UserCollections extends Component {

    componentDidMount() {
        if (this.props.user._id) {
            this.props.onFetchUserCollections(this.props.user._id);
        }   
    }

    componentWillUnmount() {
        this.props.onClearMessages();
    }

    collectionClickedHandler = (title, lastUpdated, id, description, published) => {
        const dateToString = new Date(lastUpdated).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, lastUpdated: dateToString, id: id, description: description, public: published} );
    }
    
    render() {     

        let userCollections = <Spinner isComponent/>;

        if (!this.props.loading) {
            if ( this.props.collections.length === 0) {
                userCollections = 
                <PostActionInfo isSuccess>
                    You have no collections.
                </PostActionInfo>   
            } else if (this.props.userCollectionsFetchErrors) {
                userCollections = 
                <PostActionInfo isFailed>
                    {this.props.userCollectionsFetchErrors}
                </PostActionInfo>
            } else {
            userCollections = this.props.collections.map( (collection, i) => (
                <UserCollectionContainer
                key={i}
                id={collection._id} 
                title={collection.title}
                itemCount={collection.resources.length}
                lastUpdated={new Date(collection.lastUpdated).toLocaleDateString()}
                description={collection.description}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public)}
                />
            ));
            }
        }     

        return (         
            <div className={classes.CollectionWrapper}>
                {userCollections}
            </div>
        );
    }
};

const mapStateToProps = state => ({
    collections: state.collection.userCollections,
    loading: state.collection.loading,
    userCollectionsFetchErrors: state.collection.userCollectionsFetchErrors,
    user: state.auth.user,
    recentlyViewed: state.resource.recentlyViewedResources
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserCollections: (userId) => dispatch( actions.fetchUserCollections(userId)),
        // onFetchRecentlyViewedResources: (userId) => dispatch(actions.fetchRecentlyViewedResources(userId)),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);