import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './UserCollection.css';
import Grid from '../../../components/UserInterface/Grid/Grid';
import Resource from '../../../components/Resource/Resource';
import DeleteCollectionItem from '../../../components/Dialogues/deleteCollectionItem/deleteCollectionItem';
import EditCollection from '../../../components/Dialogues/editCollection/EditCollection';
// import Button from '../../../components/UserInterface/Button/Button';

class Resourcepage extends Component {

    componentDidMount() {
        if (this.props.match.params.id) {
          this.props.onFetchCollectionById(this.props.match.params.id);
        }
    }

    /* componentWillUnmount() {
        this.props.onClearMessages();
    } */
    
      /* componentWillReceiveProps(nextProps) {
        if (nextProps.collectedResources === null && this.props.resource.loading) {
          this.props.history.push('/not-found');
        }
    } */

    state = {
        resourceToDeleteId: null,
        resourceToDeleteTitle: null,
        collectionId: this.props.clickedCollectionAttributes.id,

        showDeleteCollectionItemModal: false,

        showEditCollectionModal: false
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
                deletable
                deleteClicked={() => this.confirmDeleteHandler( resource._id, resource.title )}
                />
            ));
        } else if (this.props.loading || this.props.collectedResources === undefined) {
            userCollection =
            <div className={classes.Container}>
                <div className={classes.Spinner}><Spinner /></div>
            </div>
        }     

        return (
            <Grid>
                {/* <div className={classes.YourCollection}>YOUR COLLECTIONS</div> */}
                <div className={classes.HeaderWrapper}>
                    <div className={classes.TitleColumn}>
                        <div className={classes.Title}>{this.props.clickedCollectionAttributes.title}</div>
                    </div>
                    <div className={classes.OptionsColumn}>
                        <div onClick={this.editCollectionHandler} className={classes.EditIconRow}></div>
                        <div onClick={this.shareCollectionHandler} className={classes.ShareIconRow}></div>
                        <div onClick={this.deleteCollectionHandler} className={classes.DeleteIconRow}></div>
                    </div>
                </div>
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
                {userCollection}
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
        fetchcollectedResourceError: state.collection.fetchcollectedResourceError,
        clickedCollectionAttributes: state.collection.clickedCollectionAttributes,
        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCollectionById: ( id ) => dispatch( actions.fetchCollectionById( id ) ),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),

        onDeleteCollectionItem: ( resourceId, collectionId, history ) => dispatch(actions.deleteCollectionItem( resourceId, collectionId, history ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resourcepage);