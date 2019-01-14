import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './ConfirmResource.css';
// import Grid from '../../../components/UserInterface/Grid/Grid';
import Resource from '../../../components/Resource/Resource';
import Container from '../../../components/UserInterface/Container/Container';
// import PostDeleteDialogue from '../../../components/UserInterface/PostSubmitDialogue/PostSubmitDialogue';
/* import DeleteCollectionItem from '../../../components/Dialogues/deleteCollectionItem/deleteCollectionItem';
import EditCollection from '../../../components/Dialogues/editCollection/EditCollection';
import PublishCollection from '../../../components/Dialogues/publishCollection/publishCollection';
import UnpublishCollection from '../../../components/Dialogues/unpublishCollection/unpublishCollection';
import DeleteCollection from '../../../components/Dialogues/deleteCollection/deleteCollection'; */
// import Button from '../../../components/UserInterface/Button/Button';


class ConfirmResource extends Component {

    componentDidMount() {
        this.props.onFetchUnconfirmed();
    }

    /* componentWillUnmount() {
        this.props.onClearDeleteCollectionMessages();
    } */
    
      /* componentWillReceiveProps(nextProps) {
        if (nextProps.collectedResources === null && this.props.resource.loading) {
          this.props.history.push('/not-found');
        }
    } */

    state = {
        /* resourceToDeleteId: null,
        resourceToDeleteTitle: null,
        collectionId: this.props.clickedCollectionAttributes.id,

        showDeleteCollectionItemModal: false,
        showEditCollectionModal: false,
        showPublishCollectionModal: false,
        showUnpublishCollectionModal: false,
        showDeleteCollectionModal: false */
    }

    confirmResourceHandler = ( resourceId ) => {
        this.props.onConfirmResource(resourceId)
    }

    deleteUnconfirmedResourceHandler = ( resourceId ) => {
        this.props.onDeleteUnconfirmedResource(resourceId)    
    }

    render() {
       
        let unconfirmedResources = 
        <div className={classes.Container}>
            <div className={classes.Spinner}><Spinner /></div>
        </div>

        if (!this.props.loading) {
            unconfirmedResources = this.props.unconfirmedResources.map( (resource, i) => (
                <Resource 
                key={i}
                id={resource._id} 
                link={resource.link}
                image={resource.img}
                title={resource.title}
                likes={resource.likes}
                lastUpdated={resource.lastUpdated}
                avgRating={resource.avgRating}
                tutor={resource.tutor}
                enrollees={resource.enrollees}
                duration={resource.duration}
                level={resource.level}
                author={resource.author}
                youtubeViews={resource.youtubeviews}
                publishDate={resource.publishDate}
                source={resource.source}
                type={resource.type}
                videoCount={resource.videoCount}
                confirmClicked={() => this.confirmResourceHandler( resource._id )}
                deleteClicked={() => this.deleteUnconfirmedResourceHandler( resource._id )}
                dateAdded={new Date(resource.dateAdded).toLocaleDateString()}
                toConfirm
                deletable
                />
            ));
        }
        
        if (!this.props.loading && this.props.unconfirmedResources.length === 0) {
            unconfirmedResources =
            <div className={classes.PostAddInfo}>
                <div>You have no unconfirmed resources.</div>
            </div>
        }  
        

        return (
            <Container>
                <div style={{'paddingTop': '10px'}}>
                    {unconfirmedResources}
                </div>
            </Container>  
        );
    };
};

const mapStateToProps = state => {
    return {
        /* isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.user._id,
        collectedResources: state.collection.collectedResources,
        fetchcollectedResourceError: state.collection.fetchcollectedResourceError,
        clickedCollectionAttributes: state.collection.clickedCollectionAttributes,
        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount,

        deleteCollectionSuccessInfo: state.collection.deleteCollectionSuccessInfo,
        deleteCollectionError: state.collection.deleteCollectionError,
        deleteCollectionLoading: state.collection.deleteCollectionLoading */
        unconfirmedResources: state.resource.unconfirmedResources,
        loading: state.resource.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUnconfirmed: () => dispatch(actions.fetchUnconfirmed()),
        onConfirmResource: (resourceId) => dispatch(actions.confirmResource(resourceId)),
        onDeleteUnconfirmedResource: (resourceId) => dispatch(actions.deleteUnconfirmedResource(resourceId))
        /* onFetchCollectionById: ( id ) => dispatch( actions.fetchCollectionById( id ) ),

        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),

        onDeleteCollectionItem: ( resourceId, collectionId, history ) => dispatch(actions.deleteCollectionItem( resourceId, collectionId, history )),
        // onPublishCollection: (collectionId) => dispatch( actions.publishCollection(collectionId)),
        onUnpublishCollection: (collectionId) => dispatch( actions.unpublishCollection(collectionId)),
        onDeleteCollection: (collectionId) => dispatch( actions.deleteCollection(collectionId)),

        onClearDeleteCollectionMessages: () => dispatch( actions.clearDeleteCollectionMessages()), */
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmResource);

/* 
{this.state.showDeleteCollectionItemModal ? 
    <DeleteCollectionItem 
    showDialogue={this.state.showDeleteCollectionItemModal}
    closeDialogue={this.deleteCollectionItemCloseHandler}
    closeModal={this.deleteCollectionItemCloseHandler}
    itemTitle={this.state.resourceToDeleteTitle}
    cancelDelete={this.cancelDeleteHandler}
    confirmDelete={this.deleteConfirmedHandler}
    />: null
}
{this.state.showEditCollectionModal ? 
    <EditCollection 
    showDialogue={this.state.showEditCollectionModal}
    closeDialogue={this.editCollectionCloseHandler}
    closeModal={this.editCollectionCloseHandler}
    />: null
}
{this.state.showPublishCollectionModal ? 
    <PublishCollection 
    showDialogue={this.state.showPublishCollectionModal}
    closeDialogue={this.publishCollectionCloseHandler}
    closeModal={this.publishCollectionCloseHandler}
    collectionTitle={this.props.clickedCollectionAttributes.title}
    cancelPublish={this.publishCollectionCloseHandler}
    // confirmPublish={this.publishConfirmedHandler}
    />: null
}
{this.state.showUnpublishCollectionModal ? 
    <UnpublishCollection 
    showDialogue={this.state.showUnpublishCollectionModal}
    closeDialogue={this.unpublishCollectionCloseHandler}
    closeModal={this.unpublishCollectionCloseHandler}
    collectionTitle={this.props.clickedCollectionAttributes.title}
    cancelUnpublish={this.unpublishCollectionCloseHandler}
    confirmUnpublish={this.unpublishConfirmedHandler}
    />: null
}
{this.state.showDeleteCollectionModal ? 
    <DeleteCollection 
    showDialogue={this.state.showDeleteCollectionModal}
    closeDialogue={this.deleteCollectionCloseHandler}
    closeModal={this.deleteCollectionCloseHandler}
    collectionTitle={this.props.clickedCollectionAttributes.title}
    cancelDelete={this.deleteCollectionCloseHandler}
    confirmDelete={this.deleteCollectionConfirmedHandler}
    />: null
}
handleBack = () => {
    this.props.history.goBack()
}

resourceClickedHandler = ( id, views ) => {
    this.props.onIncreaseResourceViewCount( id, views);

    // console.log(platform, id);

    if (this.props.isAuthenticated) {
        
        const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);

        // console.log(checkViewed.length);

        if (checkViewed.length === 0) {
            this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
        }           
    }        
};

confirmDeleteHandler = ( resourceId, resourceTitle ) => {

    // console.log('confirm delete started');

    this.setState({ 
        resourceToDeleteId: resourceId,
        resourceToDeleteTitle: resourceTitle,
        showDeleteCollectionItemModal: true
    });

    
}

deleteCollectionItemCloseHandler = () => {
    this.setState({ showDeleteCollectionItemModal: false });
}

deleteConfirmedHandler = () => {
    this.props.onDeleteCollectionItem( this.state.resourceToDeleteId, this.state.collectionId, this.props.history );

    this.setState({ 
        resourceToDeleteId: null,
        resourceToDeleteTitle: null,
        showDeleteCollectionItemModal: false
    });

}

cancelDeleteHandler = () => {
    this.setState({ 
        resourceToDeleteId: null,
        resourceToDeleteTitle: null,
        showDeleteCollectionItemModal: false
    });
}

editCollectionHandler = () => {
    this.setState({ showEditCollectionModal: true});
}

editCollectionCloseHandler = () => {
    this.setState({ showEditCollectionModal: false });
}

publishCollectionHandler = () => {

    if( this.props.clickedCollectionAttributes.public ) {
        this.setState({ showUnpublishCollectionModal: true });
    } else {
        this.setState({  showPublishCollectionModal: true });
    }       
}

publishCollectionCloseHandler = () => {
    this.setState({ showPublishCollectionModal: false});
}

unpublishCollectionCloseHandler = () => {
    this.setState({ showUnpublishCollectionModal: false});
}

publishConfirmedHandler = () => {
    this.props.onPublishCollection(this.props.clickedCollectionAttributes.id);
}

unpublishConfirmedHandler = () => {
    this.props.onUnpublishCollection(this.props.clickedCollectionAttributes.id);
}

deleteCollectionCloseHandler = () => {
    this.setState({ showDeleteCollectionModal: false});
}

deleteCollectionHandler = () => {
    this.setState({ showDeleteCollectionModal: true });
}

deleteCollectionConfirmedHandler = () => {
    this.props.onDeleteCollection(this.props.clickedCollectionAttributes.id);

    this.setState({ showDeleteCollectionModal: false});
}


likeHandler = (id, likes) => {
    this.props.onSetLikedResource( id );
    this.props.onResourceLiked(id, likes);

    this.props.onUpdateUserLikeCount( this.props.userId, this.props.userLikeCount ); 
}
*/