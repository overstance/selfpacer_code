import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classes from './SubjectPage.module.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import PlatformNav from './PlatformNav/PlatformNav';
import Grid from '../../components/UserInterface/Grid/Grid';
import * as actions from '../../store/actions/index';
import Resource from '../../components/Resource/Resource';
import Dialogue from '../../components/Dialogues/Dialogue/Dialogue';
import AddToCollection from '../../components/Dialogues/addToCollection/addToCollection';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import LoadMorePrompt from '../../components/UserInterface/LoadMorePrompt/LoadMore';

class SubjectPage extends Component {
    
   componentDidMount () {
        window.addEventListener('scroll', this.handleScroll, false);
        window.scroll(0, 0);
        this.props.onFetchSubjectDetails(this.props.match.params.subject_title);
        // this.setState({pageIndex: 0});

        if (this.props.activeContent === 'all') {
            // console.log(this.props.activeContent);
            this.props.onFetchSubjectResources(this.props.match.params.subject_title, 0);
        }

        if (this.props.activeContent === 'youtube') {
            this.setState({
                moocActive: false,
                allActive: false,
                booksActive: false,
                youtubeActive: true,
                activeContent: 'youtube'
                }, () => {
                this.props.onFetchResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, 0);
            });

        }

        if (this.props.activeContent === 'mooc') {
            this.setState({
                moocActive: true,
                allActive: false,
                booksActive: false,
                youtubeActive: false, 
                activeContent: 'mooc'       
            }, () => {
                this.props.onFetchResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, 0);
            });

        }

        if (this.props.activeContent === 'books') {
            this.setState({
                moocActive: false,
                allActive: false,
                booksActive: true,
                youtubeActive: false,
                activeContent: 'books'        
            }, () => {
                this.props.onFetchResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, 0);
            });

        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }
  
   state = {
        showPaths: false,
        showCurricula: false,
        pathIconToggle: false,
        curriculaToggle: false,

        youtubeActive: false,
        moocActive: false,
        allActive: true,
        booksActive: false,

        activeContent: 'all',

        AuthenticateToCollectOrAdd: false,
        showAuthRequiredModal: false,
        showCollectionModal: false,

        pageIndex: 0,
        // showLoadMore: false
    }

    handleScroll = () => {
        /* if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
            this.fetchMoreData();
        } */
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) 
            && !this.props.fetchMoreLoading && !this.props.resourceLoading) {
            this.fetchMoreData() 
        }
    }

    fetchMoreData(){
        if (this.props.latestFetchLength >= 10) {
            this.setState({
                pageIndex: this.state.pageIndex + 1
            }, () => {
                // console.log(this.state.pageIndex, this.props.latestFetchLength );
                if (this.state.activeContent === 'all') {
                    this.props.onFetchMoreResources(this.props.match.params.subject_title, this.state.pageIndex, this.props.all);
                } else {
                    this.props.onFetchMoreResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, this.state.pageIndex, this.props.all);
                }
            })
            
        }      
    }

    pathsToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showPaths: !prevState.showPaths,
                pathIconToggle: !prevState.pathIconToggle
            };
        });
    }

    curriculaToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showCurricula: !prevState.showCurricula,
                curriculaToggle: !prevState.curriculaToggle
            };
        });
    }

    youtubeHandler = () => {
        this.setState({
            moocActive: false,
            allActive: false,
            booksActive: false,
            youtubeActive: true,
            activeContent: 'youtube',
            pageIndex: 0
            }, () => {
            this.props.onSetActiveContentType(this.state.activeContent);
            this.props.onFetchResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, 0);
        });
    }

    moocHandler = () => {
        this.setState({
            moocActive: true,
            allActive: false,
            booksActive: false,
            youtubeActive: false, 
            activeContent: 'mooc',
            pageIndex: 0       
        }, () => {
            this.props.onSetActiveContentType(this.state.activeContent);
            this.props.onFetchResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, 0);
        });
    }

    allHandler = () => {
        this.setState({
            moocActive: false,
            allActive: true,
            booksActive: false,
            youtubeActive: false,
            activeContent: 'all',
            pageIndex: 0        
        }, () => {
            this.props.onSetActiveContentType(this.state.activeContent);
            this.props.onFetchSubjectResources(this.props.match.params.subject_title, 0); 
            }
        );
    }

    booksHandler = () => {
        this.setState({
            moocActive: false,
            allActive: false,
            booksActive: true,
            youtubeActive: false,
            activeContent: 'books',
            pageIndex: 0        
        }, () => {
            this.props.onSetActiveContentType(this.state.activeContent);
            this.props.onFetchResourcesByPlatform(this.props.match.params.subject_title, this.state.activeContent, 0);
        });
    }

    resourceClickedHandler = ( platform, id, views ) => {
        this.props.onSetClickedPlatform( platform );
        this.props.onIncreaseResourceViewCount( id, views);

        if (this.props.isAuthenticated) {
           
            const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);

            if (checkViewed.length === 0) {
                this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
            }           
        }  else {
            this.props.onStoreVisitorViews(id, this.props.visitorRecentlyViewed);
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

        const Subject = this.props.subject;


        let subjectPath = <Spinner isComponent/>;
        let subjectCurriculum = <Spinner isComponent/>;

        if ( !this.props.clickedSubjectLoading ) {          
            const paths = Subject.map( subject => (subject.paths));
            const curricula = Subject.map( subject => (subject.curriculum));
            subjectPath = paths.map( (path) => path.map((x, i) => <li key={i}>{x}</li>));
            subjectCurriculum = curricula.map( (curriculum) => curriculum.map((x, i) => <li key={i}>{x}</li>));            
        }

        let all = <Spinner isComponent/>;

        if ( !this.props.resourceLoading && !this.props.fetchResourcesError ) {

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
        } else if (!this.props.resourceLoading && this.props.fetchResourcesError) {
            all = 
            <PostActionInfo isFailed>
                {this.props.fetchResourcesError}
            </PostActionInfo>
        }

        return (
            <Grid page_category={this.props.clickedSubjectCategory}>
                <div className={classes.Subheader}>
                    <Toggler 
                        toggle={this.state.pathIconToggle} 
                        subheadTitle="paths"
                        toggleHandler={this.pathsToggleHandler}
                    />
                    { this.state.showPaths ? <div className={classes.Items}><ul>{subjectPath}</ul></div> : null }
                </div>
                <div className={classes.Subheader}>
                    <Toggler 
                        toggle={this.state.curriculaToggle} 
                        subheadTitle="study topics"
                        toggleHandler={this.curriculaToggleHandler}
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
                    <div className={classes.ResourcesContainer}>
                        <div>
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
                            <div className={classes.Resources}>
                                {all}
                            </div>
                            { this.props.fetchMoreLoading ? <LoadMorePrompt /> : null}
                        </div>
                    </div>
                </div> 
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} />             
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
        clickedSubjectCategory: state.clickedSubject.clickedSubjectCategory,
        subject: state.clickedSubject.subject,
        all: state.clickedSubject.allResources,
        resourceLoading: state.clickedSubject.allLoading,
        fetchResourcesError: state.clickedSubject.fetchAllResourcesError,

        activeContent: state.explore.activeContentType,

        latestFetchLength: state.clickedSubject.latestFetchLength,
        fetchMoreLoading: state.clickedSubject.fetchMoreLoading,

        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount,
        visitorRecentlyViewed: state.auth.visitorRecentlyViewed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjectDetails: (subject_title) => dispatch( actions.fetchSubjectDetails(subject_title)),

        onFetchSubjectResources: (subject_title, pageIndex) => dispatch( actions.fetchSubjectResources(subject_title, pageIndex)),
        onFetchMoreResources: (subject_title, pageIndex, resources) => dispatch(actions.fetchMoreResources(subject_title, pageIndex, resources)),

        onFetchResourcesByPlatform: (subject_title, platform, pageIndex) => dispatch(actions.fetchResourcesByPlatform(subject_title, platform, pageIndex)),
        onFetchMoreResourcesByPlatform: (subject_title, platform, pageIndex, resources) => dispatch( actions.fetchMoreResourcesByPlatform(subject_title, platform, pageIndex, resources)),
        
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),

        onSetClickedPlatform: ( platform ) => dispatch ( actions.setClickedPlatform( platform ) ),
        onSetToCollectResource: ( resourceId, image, title ) => dispatch ( actions.setToCollectResource( resourceId, image, title )),
        onSetActiveContentType : ( platform ) => dispatch ( actions.setActiveContentType ( platform )),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),

        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),   
        
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages()),

        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onStoreVisitorViews: (id, recentlyViewed) => dispatch(actions.storeVisitorViews(id, recentlyViewed))
    };
};

/* Accounting.propTypes = {
    onFetchAllAccounting: PropTypes.func.isRequired,
    subject: PropTypes.array.isRequired
}; */

export default connect( mapStateToProps, mapDispatchToProps )( SubjectPage );

