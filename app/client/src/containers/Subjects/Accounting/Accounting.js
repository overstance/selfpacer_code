import React, { Component } from 'react';
//import axios from 'axios';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import PropTypes from 'prop-types';
import classes from './Accounting.css';
import {connect} from 'react-redux';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import SubHeader from '../../../components/UserInterface/Subheader/SubHeader';
import PlatformNav from '../../../components/PlatformNav/PlatformNav';
import Grid from '../../../components/UserInterface/Grid/Grid';
import * as actions from '../../../store/actions/index';
import Resource from '../../../components/Resource/Resource';
// import addIcon from '../../../assets/images/plus.svg';
// import Modal from '../../../components/UserInterface/Modal/Modal';
// import { Link } from 'react-router-dom';
import AuthRequired from '../../../components/Dialogues/AuthRequired/authRequired';
import AddToCollection from '../../../components/Dialogues/addToCollection/addToCollection';


function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
} 


class Accounting extends Component {

   componentDidMount () {
        this.props.onFetchAccounting();
        this.props.onFetchYoutubeAccounting();
        // this.props.onFetchUserCollections(this.props.userId);

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

    resourceClickedHandler = ( platform ) => {
        this.props.onSetClickedPlatform( platform );
    };

    likeHandler = (id, likes, type) => {
        this.props.onResourceLiked(id, likes, type);
    }

    collectHandler = ( id ) => {
        if (!this.props.isAuthenticated) {
            this.setState({ AuthenticateToCollectOrAdd: true, showAuthRequiredModal: true});
        } 

        if (this.props.isAuthenticated) {
            // this.props.history.push('/profile');
            if (this.state.youtubeActive) {
                const toCollectArray = this.props.youtube.filter( resource => ( resource._id === id));

                const toCollectResource = toCollectArray[0]

                // console.log(toCollectDisarrayed);

                this.props.onSetToCollectResource( toCollectResource );
                this.props.onFetchUserCollections(this.props.userId);
            }
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

        if ( !this.props.loading ) {          
            const paths = Subject.map( subject => (subject.paths));
            const curricula = Subject.map( subject => (subject.curriculum));
            subjectPath = paths.map( (path) => path.map((x, i) => <li key={i}>{x}</li>));
            subjectCurriculum = curricula.map( (curriculum) => curriculum.map((x, i) => <li key={i}>{x}</li>));            
        }

        const filterIconClasses = [classes.FilterIcon];

        if (this.state.filterIconRotate) {
            filterIconClasses.push(classes.Rotate180);
        }

        let youtube = <div style={{ "paddingTop": "3rem"}}> <Spinner /> </div>;

        if ( !this.props.resourceLoading ) {
            const youtubeShuffled = shuffleArray(this.props.youtube);
            youtube = youtubeShuffled.map( (resource, i) => (
                   <Resource
                   key={i}
                   id={resource._id} 
                   link={resource.link}
                   image={resource.img}
                   title={resource.title}
                   likes={resource.likes}
                   dislikes={resource.dislikes}
                   youtubeViews={resource.youtubeviews}
                   publishDate={resource.publishDate}
                   source={resource.source}
                   type={resource.type}
                   videoCount={resource.videoCount}
                   clicked={() => this.resourceClickedHandler(resource.type)}
                   likeclicked={() => this.likeHandler( resource._id, resource.likes, resource.type )}
                   collectclicked={() => this.collectHandler( resource._id )}
                   />
            ) )
        }

        const youtubePlusAddButton = 
            <div>
                <div className={classes.AddIconContainer}>
                    <div onClick={this.addResourceHandler} className={classes.AddIcon}></div>
                    <div className={classes.AddInfo}>ADD YOUTUBE RESOURCE</div>
                </div>
                {youtube}
            </div>

        let pageContent = null;

        if (this.state.youtubeActive) {
            pageContent = youtubePlusAddButton;
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
                                />: null
                            }
                            <AddToCollection 
                            showDialogue={this.state.showCollectionModal}
                            closeDialogue={this.collectModalCloseHandler} 
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
        loading: state.clickedSubject.loading,
        subject: state.clickedSubject.subject,
        youtube: state.accounting.youtubeResources,
        resourceLoading: state.accounting.loading,
        isAuthenticated: state.auth.isAuthenticated,
        activeContent: state.explore.activeContentType,
        userId: state.auth.user._id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccounting: () => dispatch( actions.fetchAccounting() ),
        onFetchYoutubeAccounting: () => dispatch ( actions.fetchYoutubeAccounting() ),
        onSetClickedPlatform: ( platform ) => dispatch ( actions.setClickedPlatform( platform ) ),
        onResourceLiked: ( id, likes, type) => dispatch ( actions.accountingResourceLiked( id, likes, type)),
        onSetToCollectResource: ( resource ) => dispatch ( actions.setToCollectResource( resource )),
        onSetActiveContentType: ( platform ) => dispatch ( actions.setActiveContentType( platform )),
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages())
    };
};

Accounting.propTypes = {
    onFetchAccounting: PropTypes.func.isRequired,
    onFetchYoutubeAccounting: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    subject: PropTypes.array.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )( Accounting );

/*         if ( !this.props.resourceLoading ) {
            const youtubeRecommended = this.props.youtube.filter( resource => resource.isAdmin === true);
            console.log(youtubeRecommended);
            youtubeRec = youtubeRecommended.map( resource => (
                   <Resource 
                   link={resource.link}
                   image={resource.img}
                   title={resource.title}
                   likes={resource.likes}
                   dislikes={resource.dislikes}
                   />
            ) )
        }

        if ( !this.props.resourceLoading ) {
            const youtube = this.props.youtube.filter( resource => resource.isAdmin === false);
            console.log(youtube);
            youtubeOthers = youtube.map( resource => (
                <Resource 
                link={resource.link}
                image={resource.img}
                title={resource.title}
                likes={resource.likes}
                dislikes={resource.dislikes}
                />
            ) )
        } */
