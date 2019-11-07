import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './SharedCollection.module.css';
import Grid from '../../../components/UserInterface/Grid/Grid';
import Resource from '../../../components/Resource/Resource';
import AddToCollection from '../../../components/Dialogues/addToCollection/addToCollection';
import ScrollButton from '../../../components/UserInterface/ScrollToTop/ScrollButton';
import CollectionNav from '../CollectionNav/CollectionNav';
import Dialogue from '../../../components/Dialogues/Dialogue/Dialogue';
import AjaxDialogueMessage from '../../../components/Dialogues/Dialogue/AjaxDialogueMessage/AjaxDialogueMessage';
import PostActionInfo from '../../../components/PostActionInfo/PostActionInfo';


class SharedCollection extends Component {

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
        collectionId: this.props.clickedCollectionAttributes._id,
        showPinCollectionModal: false,
        showUnpinCollectionModal: false,
        showCollectionModal: false,
        showFeatureModal: false,
        showUnfeatureModal: false,
        AuthenticateToCollectOrAdd: false,
        showAuthRequiredModal: false
    }

    collectHandler = ( id, image, title ) => {
        if (!this.props.isAuthenticated) {
            this.setState({ AuthenticateToCollectOrAdd: true, showAuthRequiredModal: true});
        } else if (this.props.isAuthenticated && this.props.userId) {
            this.props.onSetToCollectResource(id, image, title);
            this.props.onFetchUserCollections(this.props.userId);
            this.setState({ showCollectionModal: true });
        }
    }

    collectAuthDialogueCloseHandler = () => {
        this.setState({ showAuthRequiredModal: false, AuthenticateToCollectOrAdd: false });
    }

    collectModalCloseHandler = () => {
        this.setState({ showCollectionModal: false });
        this.props.onClearAddToCollectionMessages();
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    resourceClickedHandler = ( id, views ) => {
        this.props.onIncreaseResourceViewCount( id, views);
        const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);
        if (checkViewed.length === 0) {
            this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
        }                   
    };

    pinCollectionCloseHandler = () => {
        this.setState({ showPinCollectionModal: false});
    }

    pinCollectionHandler = () => {
        this.props.onClearPinCollectionMessages();
        this.setState({ showPinCollectionModal: true });
    }

    pinCollectionConfirmedHandler = () => {
        this.props.onPinCollection(this.props.clickedCollectionAttributes._id, this.props.userId, this.props.pinnedCollectionIds);

        // this.setState({ showPinCollectionModal: false});
    }

    unpinCollectionCloseHandler = () => {
        this.setState({ showUnpinCollectionModal: false});
    }

    unpinCollectionHandler = () => {
        this.props.onClearPinCollectionMessages();
        this.setState({ showUnpinCollectionModal: true });
    }

    unpinCollectionConfirmedHandler = () => {
        this.props.onUnpinCollection(this.props.clickedCollectionAttributes._id, this.props.userId, this.props.pinnedCollectionIds);

        // this.setState({ showUnpinCollectionModal: false});
    }

    featuredHandler = () => {
        if ( this.props.clickedCollectionAttributes.featured) {
            this.setState({ showUnfeatureModal: true});
        } else {          
            this.setState({ showFeatureModal: true});
        }
    }

    featureModalCloseHandler = () => {
        this.setState({ showFeatureModal: false});
    }

    unfeatureModalCloseHandler = () => {
        this.setState({ showUnfeatureModal: false});
    }

    featureConfirmHandler = () => {

        if (!this.props.clickedCollectionAttributes.featured) {

            this.props.onFeatureCollection(this.props.clickedCollectionAttributes._id);

            this.setState({ showFeatureModal: false});
        } else  {
            this.props.onUnfeatureCollection(this.props.clickedCollectionAttributes._id);

            this.setState({ showUnfeatureModal: false});
        }
       
    }


    likeHandler = (id, likes) => {
        this.props.onSetLikedResource( id );
        this.props.onResourceLiked(id, likes);

        if (this.props.userId) {
            this.props.onUpdateUserLikeCount( this.props.userId, this.props.userLikeCount ); 
        }
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
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
                />
            ));
        } else if (this.props.loading || this.props.collectedResources === undefined) {
            userCollection =
            <Spinner isComponent/>
        }  else if (!this.props.loading && this.props.collectedResources.length === 0 && !this.props.fetchcollectedResourceError) {
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
        
        let checkPinned = this.props.pinnedCollectionIds.filter( collection => collection === this.props.clickedCollectionAttributes._id);

        let featuredDialogueMessage = 
        <AjaxDialogueMessage 
        action='feature'
        resourceTitle={this.props.clickedCollectionAttributes.title}
        cancel={this.featureModalCloseHandler}
        confirm={this.featureConfirmHandler}
        />

        let unfeaturedDialogueMessage = 
        <AjaxDialogueMessage 
        action='unfeature'
        resourceTitle={this.props.clickedCollectionAttributes.title}
        cancel={this.unfeatureModalCloseHandler}
        confirm={this.featureConfirmHandler}
        />

        let pinDialogueMessage = 
        <AjaxDialogueMessage 
        action='pin'
        resourceTitle={this.props.clickedCollectionAttributes.title}
        cancel={this.pinCollectionCloseHandler}
        confirm={this.pinCollectionConfirmedHandler}
        />

        if (this.props.pinCollectionLoading) {
            pinDialogueMessage =
            <Spinner isDialogue/>
        }

        if (!this.props.pinCollectionLoading && this.props.pinCollectionSuccessInfo === 'success') {
            pinDialogueMessage =
            <PostActionInfo isSuccess>{'collection pinned'}</PostActionInfo>
        } else if (!this.props.pinCollectionLoading && this.props.pinCollectionError) {
            pinDialogueMessage =
            <PostActionInfo isFailed>{this.props.pinCollectionError}</PostActionInfo>
        }

        let unpinDialogueMessage = 
        <AjaxDialogueMessage 
        action='unpin'
        resourceTitle={this.props.clickedCollectionAttributes.title}
        cancel={this.unpinCollectionCloseHandler}
        confirm={this.unpinCollectionConfirmedHandler}
        />

        if (this.props.pinCollectionLoading) {
            unpinDialogueMessage =
            <Spinner isDialogue/>
        }

        if (!this.props.pinCollectionLoading && this.props.pinCollectionSuccessInfo === 'success') {
            unpinDialogueMessage =
            <PostActionInfo isSuccess>{'collection unpinned'}</PostActionInfo>
        } else if (!this.props.pinCollectionLoading && this.props.pinCollectionError) {
            unpinDialogueMessage =
            <PostActionInfo isFailed>{this.props.pinCollectionError}</PostActionInfo>
        }
        
        let content =
        <div className={classes.Collection}>
            <div className={classes.HeaderWrapper}>
                { this.props.userId && this.props.isAuthenticated ?
                    <div>
                        { checkPinned.length !== 0 ? 
                            <CollectionNav 
                            isShared
                            accountType={this.props.accountType}
                            featured={this.props.clickedCollectionAttributes.featured}
                            featureClicked={this.featuredHandler}
                            pinned
                            pinClicked={this.unpinCollectionHandler}
                            /> 
                            : 
                            <CollectionNav 
                            isShared
                            accountType={this.props.accountType}
                            featured={this.props.clickedCollectionAttributes.featured}
                            featureClicked={this.featuredHandler}
                            pinClicked={this.pinCollectionHandler}
                            /> 
                        }
                    </div> :
                    null
                }
                <div className={classes.CollectionInfo}>
                    <div className={classes.Title}>{this.props.clickedCollectionAttributes.title}</div>
                    <div className={classes.curator}><span>curator:</span>{this.props.clickedCollectionAttributes.curator}</div>
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
            <div className={classes.Container}>
                {userCollection}
            </div>
            <Dialogue
            isFeature 
            showDialogue={this.state.showFeatureModal}
            closeDialogue={this.featureModalCloseHandler}
            >
                {featuredDialogueMessage}
            </Dialogue>
            <Dialogue
            isUnfeature 
            showDialogue={this.state.showUnfeatureModal}
            closeDialogue={this.unfeatureModalCloseHandler}
            > 
                {unfeaturedDialogueMessage}
            </Dialogue>
            <Dialogue
            isPinCollection 
            showDialogue={this.state.showPinCollectionModal}
            closeDialogue={this.pinCollectionCloseHandler}
            > 
                {pinDialogueMessage}
            </Dialogue>
            <Dialogue
            isUnpinCollection 
            showDialogue={this.state.showUnpinCollectionModal}
            closeDialogue={this.unpinCollectionCloseHandler}
            > 
                {unpinDialogueMessage}
            </Dialogue>
            <Dialogue
            isAuthenticate 
            showDialogue={this.state.showAuthRequiredModal}
            closeDialogue={this.collectAuthDialogueCloseHandler}
            />
            <AddToCollection 
                showDialogue={this.state.showCollectionModal}
                closeDialogue={this.collectModalCloseHandler} 
                closeModal={this.collectModalCloseHandler}
            />
        </div>

        return (
            <Grid>
                {content}
                <ScrollButton scrollStepInPx="50" delayInMs="16.66" showUnder={160} />
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        accountType: state.auth.user.accountType,
        userId: state.auth.user._id,
        userPinnedCollections: state.auth.user.pinnedCollections,
        loading: state.collection.loading,
        confirmedCollectedResourcesIds: state.collection.confirmedCollectedResourcesIds,
        collectedResources: state.collection.collectedResources,
        fetchcollectedResourceError: state.collection.fetchcollectedResourceError,
        clickedCollectionAttributes: state.collection.clickedCollectionAttributes,
        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount,

        pinnedCollectionIds: state.collection.pinnedCollectionIds,

        pinCollectionSuccessInfo: state.collection.pinCollectionSuccessInfo,
        pinCollectionError: state.collection.pinCollectionError,
        pinCollectionLoading: state.collection.pinCollectionLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCollectionById: ( id ) => dispatch( actions.fetchCollectionById( id ) ),
        onFetchCollectionAttributes: (id) => dispatch(actions.fetchCollectionAttributes( id )),
        
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),

        onSetToCollectResource: ( resourceId, image, title ) => dispatch ( actions.setToCollectResource( resourceId, image, title )),

        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),

        onPinCollection: (collectionId, userId, userPinnedCollections) => dispatch( actions.pinCollection(collectionId, userId, userPinnedCollections)),
        onUnpinCollection: (collectionId, userId, userPinnedCollections) => dispatch( actions.unpinCollection(collectionId, userId, userPinnedCollections)),

        onFeatureCollection: (collectionId) => dispatch(actions.featureCollection(collectionId)),
        onUnfeatureCollection: (collectionId) => dispatch(actions.unfeatureCollection(collectionId)),

        onClearDeleteCollectionMessages: () => dispatch( actions.clearDeleteCollectionMessages()),
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages()),
        onClearPinCollectionMessages: () => dispatch(actions.clearPinCollectionMessages()),

        onResetCollectedResources: () => dispatch(actions.resetCollectedResources()),

        onUpdateCollectedResources: (confirmedResourceIds, collectionId) => dispatch(actions.updateCollectedResources(confirmedResourceIds, collectionId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedCollection);