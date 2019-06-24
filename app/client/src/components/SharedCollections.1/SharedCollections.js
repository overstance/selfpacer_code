import React, { Component } from 'react';
import classes from './SharedCollections.css';
import {connect} from 'react-redux';
import SharedCollectionContainer from './sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';

class SharedCollections extends Component {

    componentDidMount() {
        this.props.onFetchSharedCollectionsBySpec(this.props.userSpec);
        // this.props.onFetchUserPinnedCollections(this.props.user._id);
    }

    componentWillUnmount() {

    }

    collectionClickedHandler = (title, lastUpdated, id, description, published, featured) => {
        const dateToString = new Date(lastUpdated).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, lastUpdated: dateToString, id: id, description: description, public: published, featured: featured} );
    }

    render () {

        let sharedCollectionsBySpec = <div style={{ 'paddingTop': '2rem'}}><Spinner /></div>;

        if (!this.props.sharedCollectionsLoading) {
            if (this.props.sharedCollections.length === 0 ) {

                let userSpec = this.props.userSpec;

                sharedCollectionsBySpec = 
                <PostActionInfo isSuccess>
                    {'No shared collections for "' + userSpec + '" yet. Please check back later.'}
                </PostActionInfo>
            } else if (this.props.sharedCollectionsFetchErrors) {

                sharedCollectionsBySpec =
                <PostActionInfo>
                    {this.props.sharedCollectionsFetchErrors}
                </PostActionInfo>
            } else {
                sharedCollectionsBySpec = this.props.sharedCollections.map( (collection, i) => (
                <SharedCollectionContainer
                key={i}
                id={collection._id} 
                title={collection.title}
                itemCount={collection.resources.length}
                lastUpdated={new Date(collection.lastUpdated).toLocaleDateString()}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public, collection.featured)}
                description={collection.description}
                />
                ));                   
            }
        }

        return (
            <div>
                { this.props.sharedCollections.length === 0 ? null :
                     <div className={classes.Description}>
                        {'Shared category: "' + this.props.userSpec + '"'}
                     </div>
                }
                <div className={classes.CollectionWrapper}>               
                    {sharedCollectionsBySpec}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sharedCollectionsFetchErrors: state.collection.sharedCollectionsFetchErrors,
    sharedCollectionsLoading: state.collection.sharedCollectionsLoading,
    user: state.auth.user,
    userSpec: state.auth.user.specialization,
    sharedCollections: state.collection.sharedCollections,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSharedCollectionsBySpec: (userSpec) => dispatch(actions.fetchSharedCollectionsBySpec(userSpec)),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes )),
        onFetchUserPinnedCollections: (userId) => dispatch(actions.fetchUserPinnedCollections(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedCollections);