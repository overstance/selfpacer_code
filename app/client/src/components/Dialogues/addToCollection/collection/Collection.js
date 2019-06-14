import React, { Component } from 'react';
import classes from './Collection.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../../UserInterface/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';
import CollectionItem from '../../../CollectionItem/CollectionItem';

class Collections extends Component {

    componentWillMount(){
        this.props.onClearMessages();
    }

    addToCollectionHandler = (collectionId, collectionResources, collectionTitle) => {

        let resources = collectionResources
        let resourceToCheck = this.props.resourceToCollect.id;

        const checkResource = resources.filter( resource => resource === resourceToCheck );

        if (checkResource.length !== 0) {
           this.props.onResourceAlreadyAdded( collectionTitle ); 
        } else {
            this.props.onAddResourceToCollection(collectionId, collectionResources, this.props.resourceToCollect.id);
        }
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
                    collectionClicked={() => this.addToCollectionHandler(collection._id, collection.resources, collection.title)}
                    />
                ))
            }
        };

        if ( this.props.resourceAlreadyCollectedTitle ) {
            collections = 
            <div className={classes.PostAddInfo}>
                <div>{'Resource Already Added To: ' + this.props.resourceAlreadyCollectedTitle}</div>
            </div> 
        }

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
                { this.props.addResourceToCollectionSuccessMessage ? null :
                    <Link className={classes.NewButton} to='/create_collection'>Create New Collection</Link>
                }
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
    resourceAlreadyCollectedTitle: state.collection.resourceAlreadyCollectedTitle,
    addResourceToCollectionSuccessMessage: state.collection.addResourceToCollectionSuccessMessage,
    addResourceToCollectionError: state.collection.addResourceToCollectionError
});

const mapDispatchToProps = dispatch => {
    return {
        onAddResourceToCollection: (collectionId, collectionResources, resourceToAdd) => dispatch(actions.addResourceToCollection(collectionId, collectionResources, resourceToAdd)),
        onResourceAlreadyAdded: (collectionTitle) => dispatch( actions.resourceAlreadyAdded(collectionTitle)),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);


