import React, { Component } from 'react';
import classes from './Collection.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import CollectionItem from '../../components/CollectionItem/CollectionItem';

class Collections extends Component {

    addToCollectionHandler = (collectionId, collectionResources) => {
        this.props.onAddResourceToCollection(collectionId, collectionResources, this.props.resourceToCollect.id);
    }

    render () {

        let collections = <Spinner />;

        if ( !this.props.loading ) {

            if ( this.props.collections.length === 0) {
                collections = 
                <div className={classes.PostAddInfo}>
                    <div>You have no collections!</div>
                </div>    
            } else {
                collections = this.props.collections.map((collection, i) => (
                    <CollectionItem 
                    key={i}
                    collectionName={collection.title}
                    collectionClicked={() => this.addToCollectionHandler(collection._id, collection.resources)}
                    />
                ))
            }
        };

        if ( this.props.addResourceToCollectionSuccessMessage === 'Resource Collected!') {
            collections = 
            <div className={classes.PostAddInfo}>
                <div>{this.props.addResourceToCollectionSuccessMessage}</div>
            </div> 
        }

        if ( !this.props.addResourceToCollectionSuccessMessage && this.props.addResourceToCollectionError) {
            collections = 
            <div className={classes.PostAddInfo}>
                <div>{this.props.addResourceToCollectionError}</div>
                <div>Please retry!</div>
            </div> 
        }

        return (
            <div>
                <Link className={classes.NewButton} to='/create_collection'>Create New Collection</Link>
               <div className={classes.CollectionsContainer}>
                   {collections}
               </div>    
            </div>
        )
    }
};

const mapStateToProps = state => ({
    userId: state.auth.user._id,
    resourceToCollect: state.collection.resourceToCollect,
    loading: state.collection.loading,
    collections: state.collection.userCollections,
    addResourceToCollectionSuccessMessage: state.collection.addResourceToCollectionSuccessMessage,
    addResourceToCollectionError: state.collection.addResourceToCollectionError
});

const mapDispatchToProps = dispatch => {
    return {
        onAddResourceToCollection: (collectionId, collectionResources, resourceToAdd) => dispatch(actions.addResourceToCollection(collectionId, collectionResources, resourceToAdd))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);


