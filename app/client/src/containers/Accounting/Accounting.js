import React, { Component } from 'react';
//import axios from 'axios';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import PropTypes from 'prop-types';
import classes from './Accounting.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import SubHeader from '../../components/UserInterface/Subheader/SubHeader';
import PlatformNav from '../../components/PlatformNav/PlatformNav';
import Grid from '../../components/UserInterface/Grid/Grid';
import * as actions from '../../store/actions/index';




class Accounting extends Component {

   componentDidMount () {
        this.props.onFetchAccounting();
    }

  
   state = {
        showPaths: false,
        showCurricula: false,
        pathIconRotate: false,
        curriculaIconRotate: false
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
                    <PlatformNav />
                    <div className={classes.Resources}>

                    </div>
                </div>             
            </Grid>
        )
    }
};



const mapStateToProps = state => {
    return {
        loading: state.clickedSubject.loading,
        subject: state.clickedSubject.subject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAccounting: () => dispatch( actions.fetchAccounting() )
    };
};

Accounting.propTypes = {
    onFetchAccounting: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    subject: PropTypes.array.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )( Accounting );

/*
  };

 */