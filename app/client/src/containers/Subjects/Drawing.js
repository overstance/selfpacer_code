import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './1SubjectStyle.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import SubHeader from '../../components/UserInterface/Subheader/SubHeader';
import PlatformNav from '../../components/PlatformNav/PlatformNav';
import Grid from '../../components/UserInterface/Grid/Grid';
import * as actions from '../../store/actions/index';
import Resource from '../../components/Resource/Resource';
import AuthRequired from '../../components/Dialogues/AuthRequired/authRequired';
import AddToCollection from '../../components/Dialogues/addToCollection/addToCollection';
// import ScrollToTopOnMount from '../../../hoc/ScrollToTopOnMount';

class Drawing extends Component {
    
   componentDidMount () {

        this.props.onFetchDrawing();
        this.props.onFetchAllDrawing();

        if (this.props.activeContent === 'youtube') {
            this.setState({
                youtubeActive: true,
                moocActive: false,
                allActive: false,
                booksActive: false
            });

        }

        if (this.props.activeContent === 'mooc') {
            this.setState({
                youtubeActive: false,
                moocActive: true,
                allActive: false,
                booksActive: false
            });

        }

        if (this.props.activeContent === 'books') {
            this.setState({
                youtubeActive: false,
                moocActive: false,
                allActive: false,
                booksActive: true
            });

        }
    }
  
   state = {
        showPaths: false,
        showCurricula: false,
        pathIconRotate: false,
        curriculaIconRotate: false,

        youtubeActive: false,
        moocActive: false,
        allActive: true,
        booksActive: false,

        AuthenticateToCollectOrAdd: false,
        showAuthRequiredModal: false,
        showCollectionModal: false
    }

    pathsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showPaths: !prevState.showPaths,
                pathIconRotate: !prevState.pathIconRotate
            };
        });
    }

    curriculaToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showCurricula: !prevState.showCurricula,
                curriculaIconRotate: !prevState.curriculaIconRotate
            };
        });
    }

    youtubeHandler = () => {
        this.setState({
            moocActive: false,
            allActive: false,
            booksActive: false,
            youtubeActive: true,
        });

        this.props.onSetActiveContentType('youtube');
    }

    moocHandler = () => {
        this.setState({
            moocActive: true,
            allActive: false,
            booksActive: false,
            youtubeActive: false,        
        });

        this.props.onSetActiveContentType('mooc');
    }

    allHandler = () => {
        this.setState({
            moocActive: false,
            allActive: true,
            booksActive: false,
            youtubeActive: false,        
        });

        this.props.onSetActiveContentType('');
    }

    booksHandler = () => {
        this.setState({
            moocActive: false,
            allActive: false,
            booksActive: true,
            youtubeActive: false,        
        });

        this.props.onSetActiveContentType('books');
    }

    resourceClickedHandler = ( platform, id, views ) => {
        this.props.onSetClickedPlatform( platform );
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

    addResourceHandler = () => {
        if (!this.props.isAuthenticated) {
            this.setState({ AuthenticateToCollectOrAdd: true, showAuthRequiredModal: true});
        } 

        if (this.props.isAuthenticated) {
            this.props.history.push('/add_resource');
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

        const Subject = this.props.subject;


        let subjectPath = <div className={classes.SpinnerContainer}> <Spinner /> </div>;
        let subjectCurriculum = <div className={classes.SpinnerContainer}> <Spinner /> </div>;

        if ( !this.props.clickedSubjectLoading ) {          
            const paths = Subject.map( subject => (subject.paths));
            const curricula = Subject.map( subject => (subject.curriculum));
            subjectPath = paths.map( (path) => path.map((x, i) => <li key={i}>{x}</li>));
            subjectCurriculum = curricula.map( (curriculum) => curriculum.map((x, i) => <li key={i}>{x}</li>));            
        }

        const filterIconClasses = [classes.FilterIcon];

        if (this.state.filterIconRotate) {
            filterIconClasses.push(classes.Rotate180);
        }

        let all = <div style={{ "paddingTop": "3rem"}}> <Spinner /> </div>;
        let youtube = <div style={{ "paddingTop": "3rem"}}> <Spinner /> </div>;
        let mooc = <div style={{ "paddingTop": "3rem"}}> <Spinner /> </div>;
        let books = <div style={{ "paddingTop": "3rem"}}> <Spinner /> </div>;

        if ( !this.props.allDrawingLoading && !this.props.fetchAllDrawingResourcesError ) {

            const youtubeFiltered = this.props.all.filter( resource => resource.source === 'youtube.com');
            const moocFiltered = this.props.all.filter( resource => resource.type === 'mooc');
            const booksFiltered = this.props.all.filter( resource => resource.type === 'books');


            all = this.props.all.map( (resource, i) => (
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
            ) );

            youtube = youtubeFiltered.map( (resource, i) => (
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
                likeclicked={() => this.likeHandler( resource._id, resource.likes )}
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
                />
            ) );

            mooc = moocFiltered.map( (resource, i) => (
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
                likeclicked={() => this.likeHandler( resource._id, resource.likes )}
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
                />
            ) );

            books = booksFiltered.map( (resource, i) => (
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
                likeclicked={() => this.likeHandler( resource._id, resource.likes )}
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
                />
            ) );
        }

        const allContent = 
        <div>
            <div className={classes.AddIconContainer}>
                <div onClick={this.addResourceHandler} className={classes.AddIcon}></div>
                <div className={classes.AddInfo}>ADD RESOURCE</div>
            </div>
            {all}
            {this.props.fetchAllDrawingResourcesError}
        </div>

        const youtubeContent = 
        <div>
            <div className={classes.AddIconContainer}>
                <div onClick={this.addResourceHandler} className={classes.AddIcon}></div>
                <div className={classes.AddInfo}>ADD YOUTUBE RESOURCE</div>
            </div>
            {youtube}
            {this.props.fetchAllDrawingResourcesError}
        </div>

        const moocContent = 
        <div>
            <div className={classes.AddIconContainer}>
                <div onClick={this.addResourceHandler} className={classes.AddIcon}></div>
                <div className={classes.AddInfo}>ADD MOOC RESOURCE</div>
            </div>
            {mooc}
            {this.props.fetchAllDrawingResourcesError}
        </div>

        const booksContent = 
        <div>
            <div className={classes.AddIconContainer}>
                <div onClick={this.addResourceHandler} className={classes.AddIcon}></div>
                <div className={classes.AddInfo}>ADD BOOK OR DOC RESOURCE</div>
            </div>
            {books}
            {this.props.fetchAllDrawingResourcesError}
        </div>

        let pageContent = null;

        if (this.state.allActive) {
            pageContent = allContent;
        }

        if (this.state.youtubeActive) {
            pageContent = youtubeContent;
        }

        if (this.state.moocActive) {
            pageContent = moocContent
        }

        if (this.state.booksActive) {
            pageContent = booksContent
        }

        return (
            <Grid>
                <div className={classes.Subheader}>
                    <SubHeader 
                        filterIconRotate={this.state.pathIconRotate} 
                        subheadTitle="PATHS"
                        filterToggleHandler={this.pathsToggleHandler}
                    />
                    { this.state.showPaths ? <div className={classes.Items}><ul>{subjectPath}</ul></div> : null }
                </div>
                <div className={classes.Subheader}>
                    <SubHeader 
                        filterIconRotate={this.state.curriculaIconRotate} 
                        subheadTitle="COMMON STUDY TOPICS"
                        filterToggleHandler={this.curriculaToggleHandler}
                    />
                    { this.state.showCurricula ? <div className={classes.Items}><ul>{subjectCurriculum}</ul></div> : null }
                </div>
                <div className={classes.Platform}>
                    <PlatformNav
                        youtubeActived={this.state.youtubeActive}
                        moocActived={this.state.moocActive}
                        allActived={this.state.allActive}
                        booksActived={this.state.booksActive}
                        youtubeClicked={this.youtubeHandler}
                        moocClicked={this.moocHandler}
                        allClicked={this.allHandler}
                        booksClicked={this.booksHandler}
                    />
                    <div className={classes.Resources}>
                        <div>
                            {this.state.AuthenticateToCollectOrAdd ? 
                                <AuthRequired 
                                showDialogue={this.state.showAuthRequiredModal}
                                closeDialogue={this.collectAuthDialogueCloseHandler}
                                closeModal={this.collectAuthDialogueCloseHandler}
                                />: null
                            }
                            <AddToCollection 
                            showDialogue={this.state.showCollectionModal}
                            closeDialogue={this.collectModalCloseHandler} 
                            closeModal={this.collectModalCloseHandler}
                            />
                            {pageContent}
                        </div>
                    </div>
                </div>             
            </Grid>
        )
    }
};



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.user._id,
        userLikedResources: state.auth.user.likedResources,

        clickedSubjectLoading: state.clickedSubject.loading,
        subject: state.clickedSubject.subject,
        all: state.clickedSubject.allResources,
        allDrawingLoading: state.clickedSubject.allLoading,
        fetchAllDrawingResourcesError: state.clickedSubject.fetchAllResourcesError,

        activeContent: state.explore.activeContentType,

        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchDrawing: () => dispatch( actions.fetchDrawing() ),

        onFetchAllDrawing: () => dispatch( actions.fetchAllDrawing() ),

        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),

        onSetClickedPlatform: ( platform ) => dispatch ( actions.setClickedPlatform( platform ) ),
        onSetToCollectResource: ( resourceId, image, title ) => dispatch ( actions.setToCollectResource( resourceId, image, title )),
        onSetActiveContentType: ( platform ) => dispatch ( actions.setActiveContentType( platform )),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),

        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),   
        
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages()),

        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId))
    };
};

Drawing.propTypes = {
    onFetchAllDrawing: PropTypes.func.isRequired,
    subject: PropTypes.array.isRequired
};

export default connect( mapStateToProps, mapDispatchToProps )( Drawing );
