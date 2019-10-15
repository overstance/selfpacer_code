import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './ResourcePage.module.css';
import Resource from '../../components/Resource/Resource';
import Dialogue from '../../components/Dialogues/Dialogue/Dialogue';
import AddToCollection from '../../components/Dialogues/addToCollection/addToCollection';
// import AuthBackdrop from '../../components/UserInterface/Backdrop/AuthBackdrop';
import Grid from '../../components/UserInterface/Grid/Grid';
import { Link } from 'react-router-dom';
// import Button from '../../components/UserInterface/Button/Button';

class Resourcepage extends Component {

    state = {
        AuthenticateToCollectOrAdd: false,
        showAuthRequiredModal: false,
        showCollectionModal: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.resource_id !== prevProps.match.params.resource_id) {
            this.props.onFetchResourceById(this.props.match.params.resource_id); 
        }

        if (this.props.match.params.resource_category !== prevProps.match.params.resource_category) {
            this.props.onFetchSubjectResources(this.props.match.params.resource_category, 0);
        }
    }

    componentDidMount() {
        this.props.onFetchResourceById(this.props.match.params.resource_id);
        this.props.onFetchSubjectResources(this.props.match.params.resource_category, 0);
    }

    componentWillUnmount() {
        this.props.onClearFetchResouceByIdMessages();
    }

    resourceClickedHandler = ( platform, id, views ) => {
        this.props.onSetClickedPlatform( platform );
        this.props.onIncreaseResourceViewCount( id, views);

        if (this.props.isAuthenticated) {
           
            const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);

            if (checkViewed.length === 0) {
                this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
            }           
        }        
    };

    likeHandler = (id, likes) => {
        this.props.onSetLikedResource( id );
        this.props.onResourceLiked(id, likes);


        if (this.props.isAuthenticated) {
            this.props.onUpdateUserLikeCount( this.props.userId, this.props.userLikeCount );        
        }    
    }

    collectHandler = ( id, image, title ) => {
        if (!this.props.isAuthenticated) {
            this.setState({ AuthenticateToCollectOrAdd: true, showAuthRequiredModal: true});
        } 

        if (this.props.isAuthenticated) {
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

    render() {

        let fetchedResource;
        let relatedResources;
        let subject_title = this.props.match.params.resource_category;

        if (this.props.fetchResourceByIdLoading) {
            fetchedResource = 
            <Spinner isComponent/>
        }

        if (!this.props.fetchRelatedResourcesLoading && this.props.relatedResources.length > 0) {
            let filteredRelated = this.props.relatedResources.filter(resource => resource._id !== this.props.match.params.resource_id );
            relatedResources =
            filteredRelated.map((resource, i) => (
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
                clicked={() => this.resourceClickedHandler(resource.type, resource._id, resource.views)}
                likeclicked={() => this.likeHandler( resource._id, resource.likes/* , resource.img, resource.link, resource.title */ )}
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
            />
            ))
        }

        if (!this.props.fetchResourceByIdLoading && this.props.fetchedResource ) {
            let resource = this.props.fetchedResource;
            fetchedResource = 
            <Resource
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
                clicked={() => this.resourceClickedHandler(resource.type, resource._id, resource.views)}
                likeclicked={() => this.likeHandler( resource._id, resource.likes/* , resource.img, resource.link, resource.title */ )}
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
            />
        };

        return (
            <Grid>
                <div className={classes.fetchedResource}>
                    {fetchedResource}
                </div>
                <div className={classes.relatedResources}>
                    <div className={classes.relatedResourcesHeading}>Related Resources</div>
                    {relatedResources}
                    { this.props.relatedResources.length >= 10 ?
                        <Link to={`/explore/${subject_title}`} className={classes.SeeAll} >
                           see all
                        </Link>
                        : null

                    }
                </div>
                {this.state.AuthenticateToCollectOrAdd ? 
                    <Dialogue
                    isAuthenticate 
                    showDialogue={this.state.showAuthRequiredModal}
                    closeDialogue={this.collectAuthDialogueCloseHandler}
                    />: null
                }
                <AddToCollection 
                showDialogue={this.state.showCollectionModal}
                closeDialogue={this.collectModalCloseHandler} 
                closeModal={this.collectModalCloseHandler}
                />               
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.user._id,
        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount,

        fetchResourceByIdLoading: state.resource.fetchResourceByIdLoading,
        fetchResourceByIdError: state.resource.fetchResourceByIdError,
        fetchedResource: state.resource.fetchedResource,

        relatedResources: state.clickedSubject.allResources,
        fetchRelatedResourcesLoading: state.clickedSubject.allLoading,
        fetchRelatedResourcesError: state.clickedSubject.fetchAllResourcesError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearFetchResouceByIdMessages: () => dispatch(actions.clearFetchResouceByIdMessages()),
        onSetToCollectResource: ( resourceId, image, title ) => dispatch ( actions.setToCollectResource( resourceId, image, title )),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages()),
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),   
        onSetClickedPlatform: ( platform ) => dispatch ( actions.setClickedPlatform( platform ) ),
        onFetchResourceById: (id) => dispatch( actions.fetchResourceById(id) ),
        onFetchSubjectResources: (subject_title, pageIndex) => dispatch( actions.fetchSubjectResources(subject_title, pageIndex)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resourcepage);