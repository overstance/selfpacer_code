import React, { Component } from 'react';
import classes from './Collection.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../../UserInterface/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';
import CollectionItem from '../../../CollectionItem/CollectionItem';
import PostActionInfo from '../../../PostActionInfo/PostActionInfo';

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

        let collections = <Spinner isComponent/>;

        if ( !this.props.loading ) {

            if ( this.props.collections.length === 0) {
                collections = 
                <PostActionInfo isSuccess>
                    <div>You have no collections!</div>
                </PostActionInfo>   
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
            <PostActionInfo isSuccess>
                <span>Resource already added to:</span>
                {' ' + this.props.resourceAlreadyCollectedTitle}
            </PostActionInfo>  
        }

        if ( this.props.addResourceToCollectionSuccessMessage === 'Resource Collected!') {
            collections = 
            <PostActionInfo isSuccess>
                <span>{this.props.addResourceToCollectionSuccessMessage}</span>
            </PostActionInfo> 
        }

        if ( !this.props.addResourceToCollectionSuccessMessage && this.props.addResourceToCollectionError) {
            collections = 
            <PostActionInfo isFailed>
                {this.props.addResourceToCollectionError + ' : Please retry!'}
            </PostActionInfo> 
        }

        return (
            <div>
               <div className={classes.CollectionsContainer}>
                    { this.props.addResourceToCollectionSuccessMessage || this.props.addResourceToCollectionError || this.props.resourceAlreadyCollectedTitle
                     ? 
                     null :
                        <Link className={classes.NewButton} to='/create_collection'>create-new</Link>
                    }
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


