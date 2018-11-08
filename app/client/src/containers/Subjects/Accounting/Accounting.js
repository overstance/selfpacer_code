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
    }

  
   state = {
        showPaths: false,
        showCurricula: false,
        pathIconRotate: false,
        curriculaIconRotate: false,
        youtubeActive: true,
        moocActive: false,
        webActive: false,
        booksActive: false
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
            webActive: false,
            booksActive: false,
            youtubeActive: true        
        })
    }

    moocHandler = () => {
        this.setState({
            moocActive: true,
            webActive: false,
            booksActive: false,
            youtubeActive: false        
        })
    }

    webHandler = () => {
        this.setState({
            moocActive: false,
            webActive: true,
            booksActive: false,
            youtubeActive: false        
        })
    }

    booksHandler = () => {
        this.setState({
            moocActive: false,
            webActive: false,
            booksActive: true,
            youtubeActive: false        
        })
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

        /* let youtubeAll = <div style={{ "padding-top": "3rem"}}> <Spinner /> </div> */
        let youtube = <div style={{ "paddingTop": "3rem"}}> <Spinner /> </div>;

        if ( !this.props.resourceLoading ) {
            const youtubeShuffled = shuffleArray(this.props.youtube);
            youtube = youtubeShuffled.map( (resource, i) => (
                   <Resource
                   key={i} 
                   link={resource.link}
                   image={resource.img}
                   title={resource.title}
                   likes={resource.likes}
                   dislikes={resource.dislikes}
                   youtubeViews={resource.youtubeviews}
                   source={resource.source}
                   type={resource.type}
                   videoCount={resource.videoCount}
                   />
            ) )
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
                        webActived={this.state.webActive}
                        booksActived={this.state.booksActive}
                        youtubeClicked={this.youtubeHandler}
                        moocClicked={this.moocHandler}
                        webClicked={this.webHandler}
                        booksClicked={this.booksHandler}
                    />
                    <div className={classes.Resources}>
                        <div>
                            {youtube}
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
        resourceLoading: state.accounting.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccounting: () => dispatch( actions.fetchAccounting() ),
        onFetchYoutubeAccounting: () => dispatch ( actions.fetchYoutubeAccounting() )
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
