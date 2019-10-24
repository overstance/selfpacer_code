import React, { Component } from 'react';
import classes from './PinnedCollections.module.css';
import {connect} from 'react-redux';
import SharedCollectionContainer from '../SharedCollections/sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';


class PinnedCollections extends Component {

    componentDidMount() {
        this.props.onFetchUserPinnedCollections(this.props.userId);
    }

    componentWillUnmount() {
        this.props.onClearMessages();
    }

    collectionClickedHandler = (title, date, id, description, published, curator) => {
        const dateToString = new Date(date).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, date: dateToString, id: id, description: description, public: published, curator: curator} );
    }

    render () {

        let userPinnedCollections = <Spinner isComponent/>;

        if (!this.props.loading) {
            if ( this.props.collections.length === 0) {
                userPinnedCollections = 
                <PostActionInfo isSuccess>
                    You have no pinned collections.
                </PostActionInfo>   
            } else if (this.props.error) {
                userPinnedCollections = 
                <PostActionInfo isFailed>
                    {this.props.error}
                </PostActionInfo>
            } else {
            userPinnedCollections = this.props.collections.map( (collection, i) => (
                <SharedCollectionContainer
                    key={i}
                    id={collection._id} 
                    title={collection.title}
                    itemCount={collection.resources.length}
                    date={new Date(collection.date).toLocaleDateString()}
                    collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description, collection.public, collection.curator)}
                    description={collection.description}
                    curator={collection.curator}
                    isPinned
                />
            ));
            }
        }     
        return (
            <div className={classes.CollectionWrapper}>
                {userPinnedCollections}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user._id,
    loading: state.collection.fetchUserPinnedCollectionsLoading,
    error: state.collection.fetchUserPinnedCollectionsError,
    collections: state.collection.userPinnedCollections
});

const mapDispatchToProps = dispatch => {
    return {
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes )),
        onFetchUserPinnedCollections: (userId) => dispatch(actions.fetchUserPinnedCollections(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedCollections);