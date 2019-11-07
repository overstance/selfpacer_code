import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './UserCollection.module.css';
import Grid from '../../../components/UserInterface/Grid/Grid';
import Resource from '../../../components/Resource/Resource';
import EditCollection from '../../../components/Dialogues/editCollection/EditCollection';
import PublishCollection from '../../../components/Dialogues/publishCollection/publishCollection';
import UnpublishCollection from '../../../components/Dialogues/unpublishCollection/unpublishCollection';
import ScrollButton from '../../../components/UserInterface/ScrollToTop/ScrollButton';
import CollectionNav from '../CollectionNav/CollectionNav';
import Dialogue from '../../../components/Dialogues/Dialogue/Dialogue';
import PostActionInfo from '../../../components/PostActionInfo/PostActionInfo';


class UserCollection extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
        window.scroll(0, 0);
        if (this.props.match.params.id) {

          this.props.onFetchCollectionById(this.props.match.params.id);

            if (this.props.clickedCollectionAttributes._id === '') {
                this.props.onFetchCollectionAttributes(this.props.match.params.id);
            }
        } else {
            this.props.history.push('/collections');
        }
    }

    componentDidUpdate(prevProps) {
        // check if all resources in collection are still present in database, else update.

        if(this.props.confirmedCollectedResourcesIds !== prevProps.confirmedCollectedResourcesIds && this.props.clickedCollectionAttributes._id === this.props.match.params.id) {
            let confirmedResourceIds = this.props.confirmedCollectedResourcesIds;
            
            if (confirmedResourceIds && confirmedResourceIds.length !== this.props.clickedCollectionAttributes.resources.length) {
                this.props.onUpdateCollectedResources(confirmedResourceIds, this.props.clickedCollectionAttributes._id)
            } 
        }
    }

    componentWillUnmount() {
        this.props.onClearDeleteCollectionMessages();
        this.props.onResetCollectedResources();
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    state = {
        resourceToDeleteId: null,
        resourceToDeleteTitle: null,
        // collectionId: this.props.clickedCollectionAttributes._id,

        showDeleteCollectionItemModal: false,
        showEditCollectionModal: false,
        showPublishCollectionModal: false,
        showUnpublishCollectionModal: false,

        showCollectionEmptyDialogue: false,
        showDeleteCollectionModal: false
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    resourceClickedHandler = ( id, views ) => {
        this.props.onIncreaseResourceViewCount( id, views);

        if (this.props.isAuthenticated) {
           
            const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);

            if (checkViewed.length === 0) {
                this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
            }           
        }        
    };

    confirmDeleteHandler = ( resourceId, resourceTitle ) => {

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
        this.props.onDeleteCollectionItem( this.state.resourceToDeleteId, this.props.clickedCollectionAttributes._id, this.props.collectedResources, this.props.confirmedCollectedResourcesIds );

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
        } else if (!this.props.clickedCollectionAttributes.public && 
            this.props.collectedResources.length === 0 ) {
                this.setState({ showCollectionEmptyDialogue: true});
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
        this.props.onPublishCollection(this.props.clickedCollectionAttributes._id);
    }

    unpublishConfirmedHandler = () => {
        this.props.onUnpublishCollection(this.props.clickedCollectionAttributes._id);
    }

    closeCollectionEmptyHandler = () => {
        this.setState({ showCollectionEmptyDialogue: false });
    }

    deleteCollectionCloseHandler = () => {
        this.setState({ showDeleteCollectionModal: false});
    }

    deleteCollectionHandler = () => {
        this.setState({ showDeleteCollectionModal: true });
    }

    deleteCollectionConfirmedHandler = () => {
        this.props.onDeleteCollection(this.props.clickedCollectionAttributes._id);

        this.setState({ showDeleteCollectionModal: false});
    }


    likeHandler = (id, likes) => {
        this.props.onSetLikedResource( id );
        this.props.onResourceLiked(id, likes);

        this.props.onUpdateUserLikeCount( this.props.userId, this.props.userLikeCount ); 
    }

    render() {
       
        let userCollection = 
        <Spinner isComponent/>

        if (!this.props.loading && this.props.collectedResources.length > 0) {
            userCollection = this.props.collectedResources.map( (resource, i) => (
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
                clicked={() => this.resourceClickedHandler(resource._id, resource.views)}
                likeclicked={() => this.likeHandler( resource._id, resource.likes )}
                deletable
                isCollection
                deleteClicked={() => this.confirmDeleteHandler( resource._id, resource.title )}
                />
            ));
        } else if (this.props.loading || this.props.collectedResources === undefined) {
            userCollection =
            <Spinner isComponent/>
        } else if (!this.props.loading && this.props.collectedResources.length === 0 && !this.props.fetchcollectedResourceError) {
            userCollection =
            <PostActionInfo isSuccess>
                This collection is empty.
            </PostActionInfo>
        } else if ( !this.props.loading && this.props.fetchcollectedResourceError) {
            userCollection =
            <PostActionInfo isFailed>
                {this.props.fetchcollectedResourceError}
            </PostActionInfo>
        }
        
        let content =
        <div className={classes.Collection}>  
            <div className={classes.HeaderWrapper}>
                <CollectionNav 
                    published={this.props.clickedCollectionAttributes.public}
                    editClicked={this.editCollectionHandler}
                    publishClicked={this.publishCollectionHandler}
                    deleteClicked={this.deleteCollectionHandler}
                />
                <div className={classes.CollectionInfo}>
                    <div className={classes.Title}>
                        {this.props.clickedCollectionAttributes.title + '   '}
                        {this.props.clickedCollectionAttributes.public ? 
                            <div className={classes.PublicTag}>Public</div> : null
                        }
                        {
                            this.props.clickedCollectionAttributes.lastUpdated ?
                            <div className={classes.updated}>
                                <span>updated:</span>
                                {new Date(this.props.clickedCollectionAttributes.lastUpdated).toLocaleDateString()}
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className={classes.Container}>
                {userCollection}
            </div>    
        </div>

        if (this.props.deleteCollectionLoading) {
            content =
            <Spinner isComponent/>
        }

        if (this.props.deleteCollectionSuccessInfo) {
            content = 
            <div className={classes.ContainerItem}>
                <Dialogue
                showDialogue
                isPostSubmitDialogue
                withGoBackButton 
                handleBack={this.handleBack}>
                    {this.props.deleteCollectionSuccessInfo}
                </Dialogue>
            </div>
            
        } else if (this.props.deleteCollectionError) {
            content =
            <div className={classes.ContainerItem}>
                <Dialogue
                showDialogue
                isPostSubmitDialogue 
                withGoBackButton 
                handleBack={this.handleBack}>
                    {this.props.deleteCollectionError}
                </Dialogue>
            </div>
             
        }

        return (
            <Grid>                
                {content} 
                <Dialogue 
                isDeleteCollectionItem
                showDialogue={this.state.showDeleteCollectionItemModal}
                closeDialogue={this.deleteCollectionItemCloseHandler}
                itemTitle={this.state.resourceToDeleteTitle}
                cancelDelete={this.cancelDeleteHandler}
                confirmDelete={this.deleteConfirmedHandler}
                /> 
                <EditCollection 
                showDialogue={this.state.showEditCollectionModal}
                closeDialogue={this.editCollectionCloseHandler}
                closeModal={this.editCollectionCloseHandler}
                /> 
                <PublishCollection 
                showDialogue={this.state.showPublishCollectionModal}
                closeDialogue={this.publishCollectionCloseHandler}
                closeModal={this.publishCollectionCloseHandler}
                collectionTitle={this.props.clickedCollectionAttributes.title}
                cancelPublish={this.publishCollectionCloseHandler}
                // confirmPublish={this.publishConfirmedHandler}
                /> 
                <UnpublishCollection 
                showDialogue={this.state.showUnpublishCollectionModal}
                closeDialogue={this.unpublishCollectionCloseHandler}
                closeModal={this.unpublishCollectionCloseHandler}
                collectionTitle={this.props.clickedCollectionAttributes.title}
                cancelUnpublish={this.unpublishCollectionCloseHandler}
                confirmUnpublish={this.unpublishConfirmedHandler}
                /> 
                <Dialogue
                isDeleteCollection 
                showDialogue={this.state.showDeleteCollectionModal}
                closeDialogue={this.deleteCollectionCloseHandler}
                collectionTitle={this.props.clickedCollectionAttributes.title}
                cancelDelete={this.deleteCollectionCloseHandler}
                confirmDelete={this.deleteCollectionConfirmedHandler}
                /> 
                <Dialogue
                isCollectionEmpty
                showDialogue={this.state.showCollectionEmptyDialogue}
                closeDialogue={this.closeCollectionEmptyHandler}
                closeModal={this.closeCollectionEmptyHandler}
                />
                <ScrollButton scrollStepInPx="50" delayInMs="16.66" showUnder={160} />
            </Grid> 
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.user._id,
        loading: state.collection.loading,
        collectedResources: state.collection.collectedResources,
        confirmedCollectedResourcesIds: state.collection.confirmedCollectedResourcesIds,
        fetchcollectedResourceError: state.collection.fetchcollectedResourceError,
        clickedCollectionAttributes: state.collection.clickedCollectionAttributes,
        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount,

        deleteCollectionSuccessInfo: state.collection.deleteCollectionSuccessInfo,
        deleteCollectionError: state.collection.deleteCollectionError,
        deleteCollectionLoading: state.collection.deleteCollectionLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCollectionById: ( id ) => dispatch( actions.fetchCollectionById( id ) ),
        onFetchCollectionAttributes: (id) => dispatch(actions.fetchCollectionAttributes( id )),

        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),

        onDeleteCollectionItem: ( resourceId, collectionId, collectedResources, confirmedCollectedResourcesIds ) => dispatch(actions.deleteCollectionItem( resourceId, collectionId, collectedResources, confirmedCollectedResourcesIds )),
        // onPublishCollection: (collectionId) => dispatch( actions.publishCollection(collectionId)),
        onUnpublishCollection: (collectionId) => dispatch( actions.unpublishCollection(collectionId)),
        onDeleteCollection: (collectionId) => dispatch( actions.deleteCollection(collectionId)),

        onClearDeleteCollectionMessages: () => dispatch( actions.clearDeleteCollectionMessages()),
        onResetCollectedResources: () => dispatch(actions.resetCollectedResources()),
        onUpdateCollectedResources: (confirmedResourceIds, collectionId) => dispatch(actions.updateCollectedResources(confirmedResourceIds, collectionId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCollection);