import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './SharedCollection.module.css';
import Grid from '../../../components/UserInterface/Grid/Grid';
import Resource from '../../../components/Resource/Resource';
/* import DeleteCollectionItem from '../../../components/Dialogues/deleteCollectionItem/deleteCollectionItem';
import EditCollection from '../../../components/Dialogues/editCollection/EditCollection';
import PublishCollection from '../../../components/Dialogues/publishCollection/publishCollection';
import UnpublishCollection from '../../../components/Dialogues/unpublishCollection/unpublishCollection';
 */
import PinCollection from '../../../components/Dialogues/pinCollection/pinCollection';
import UnpinCollection from '../../../components/Dialogues/unpinCollection/unpinCollection';
import PostDeleteDialogue from '../../../components/Dialogues/PostSubmitDialogue/PostSubmitDialogue';
import AddToCollection from '../../../components/Dialogues/addToCollection/addToCollection';
// import Button from '../../../components/UserInterface/Button/Button';


class SharedCollection extends Component {

    componentDidMount() {
        if (this.props.match.params.id) {
          this.props.onFetchCollectionById(this.props.match.params.id);
        } else {
            this.props.history.push('/collections');  
        }
    }

    componentWillUnmount() {
        this.props.onClearDeleteCollectionMessages();
    }

    state = {
        collectionId: this.props.clickedCollectionAttributes.id,
        showPinCollectionModal: false,
        showUnpinCollectionModal: false,
        showCollectionModal: false
    }

    collectHandler = ( id, image, title ) => {
        this.props.onSetToCollectResource(id, image, title);
        this.props.onFetchUserCollections(this.props.userId);
        this.setState({ showCollectionModal: true });
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
        // console.log(platform, id);
        const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);
        // console.log(checkViewed.length);
        if (checkViewed.length === 0) {
            this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
        }                   
    };

    pinCollectionCloseHandler = () => {
        this.setState({ showPinCollectionModal: false});
    }

    pinCollectionHandler = () => {
        this.setState({ showPinCollectionModal: true });
    }

    pinCollectionConfirmedHandler = () => {
        this.props.onPinCollection(this.props.clickedCollectionAttributes.id, this.props.userId, this.props.pinnedCollectionIds);

        this.setState({ showPinCollectionModal: false});
    }

    unpinCollectionCloseHandler = () => {
        this.setState({ showUnpinCollectionModal: false});
    }

    unpinCollectionHandler = () => {
        this.setState({ showUnpinCollectionModal: true });
    }

    unpinCollectionConfirmedHandler = () => {
        this.props.onUnpinCollection(this.props.clickedCollectionAttributes.id, this.props.userId, this.props.pinnedCollectionIds);

        this.setState({ showUnpinCollectionModal: false});
    }


    likeHandler = (id, likes) => {
        this.props.onSetLikedResource( id );
        this.props.onResourceLiked(id, likes);

        this.props.onUpdateUserLikeCount( this.props.userId, this.props.userLikeCount ); 
    }

    render() {
       
        let userCollection = 
        <div className={classes.Container}>
            <div className={classes.Spinner}><Spinner /></div>
        </div>

        if (!this.props.loading) {
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
            <div className={classes.Container}>
                <div className={classes.Spinner}><Spinner /></div>
            </div>
        }
        
        let checkPinned = this.props.pinnedCollectionIds.filter( collection => collection === this.props.clickedCollectionAttributes.id);
        
        let content =
        <div>
            <div className={classes.HeaderWrapper}>
                <div className={classes.TitleColumn}>
                    <div className={classes.Title}>{this.props.clickedCollectionAttributes.title}</div>
                </div>
                <div className={classes.OptionsColumn}>
                    { checkPinned.length !== 0 ?
                        <div onClick={this.unpinCollectionHandler} className={classes.UnpinIconRow}>unpin</div> 
                        :
                        <div onClick={this.pinCollectionHandler} className={classes.PinIconRow}></div>
                    }
                </div>
            </div>
            {userCollection}
            {this.state.showPinCollectionModal ? 
                <PinCollection 
                showDialogue={this.state.showPinCollectionModal}
                closeDialogue={this.pinCollectionCloseHandler}
                closeModal={this.pinCollectionCloseHandler}
                collectionTitle={this.props.clickedCollectionAttributes.title}
                cancelPin={this.pinCollectionCloseHandler}
                confirmPin={this.pinCollectionConfirmedHandler}
                />: null
            }
            {this.state.showUnpinCollectionModal ? 
                <UnpinCollection 
                showDialogue={this.state.showUnpinCollectionModal}
                closeDialogue={this.unpinCollectionCloseHandler}
                closeModal={this.unpinCollectionCloseHandler}
                collectionTitle={this.props.clickedCollectionAttributes.title}
                cancelUnpin={this.unpinCollectionCloseHandler}
                confirmUnpin={this.unpinCollectionConfirmedHandler}
                />: null
            }
            <AddToCollection 
                showDialogue={this.state.showCollectionModal}
                closeDialogue={this.collectModalCloseHandler} 
                closeModal={this.collectModalCloseHandler}
            />
        </div>

        if (this.props.deleteCollectionLoading) {
            content =
            <div className={classes.Container}>
                <div className={classes.Spinner}><Spinner /></div>
            </div>
        }

        if (this.props.deleteCollectionSuccessInfo) {
            content = 
            <div className={classes.ContainerItem}>
                <PostDeleteDialogue withGoBackButton handleBack={this.handleBack}>
                    {this.props.deleteCollectionSuccessInfo}
                </PostDeleteDialogue>
            </div>
            
        } else if (this.props.deleteCollectionError) {
            content =
            <div className={classes.ContainerItem}>
                <PostDeleteDialogue withGoBackButton handleBack={this.handleBack}>
                    {this.props.deleteCollectionError}
                </PostDeleteDialogue>
            </div>
             
        }

        return (
            <Grid>
                {content}
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.user._id,
        userPinnedCollections: state.auth.user.pinnedCollections,
        loading: state.collection.loading,
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
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),

        onSetToCollectResource: ( resourceId, image, title ) => dispatch ( actions.setToCollectResource( resourceId, image, title )),

        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),

        onPinCollection: (collectionId, userId, userPinnedCollections) => dispatch( actions.pinCollection(collectionId, userId, userPinnedCollections)),
        onUnpinCollection: (collectionId, userId, userPinnedCollections) => dispatch( actions.unpinCollection(collectionId, userId, userPinnedCollections)),

        onClearDeleteCollectionMessages: () => dispatch( actions.clearDeleteCollectionMessages()),
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedCollection);