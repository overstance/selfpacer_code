import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './skills.module.css';
import HeaderNav from './headerNav/headerNav';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Subject from './Subject/Subject';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import Grid from '../../components/UserInterface/Grid/Grid';

class Explore extends Component {

    componentDidMount () {
        window.scroll(0,0);
        if (this.props.selectedCategory === 'creative') {
            this.setState({ 
                allActive: false,
                creativeActive: true,
                businessActive: false,
                technologyActive: false,
                scienceActive: false,
                lifestyleActive: false
            });
        }

        if (this.props.selectedCategory === 'business') {
            this.setState({ 
                allActive: false,
                creativeActive: false,
                businessActive: true,
                technologyActive: false,
                scienceActive: false,
                lifestyleActive: false
            });
        }

        if (this.props.selectedCategory === 'technology') {
            this.setState({ 
                allActive: false,
                creativeActive: false,
                businessActive: false,
                technologyActive: true,
                scienceActive: false,
                lifestyleActive: false
            });
        }

        if (this.props.selectedCategory === 'science') {
            this.setState({ 
                allActive: false,
                creativeActive: false,
                businessActive: false,
                technologyActive: false,
                scienceActive: true,
                lifestyleActive: false
            });
        }

        if (this.props.selectedCategory === 'lifeStyle') {
            this.setState({ 
                allActive: false,
                creativeActive: false,
                businessActive: false,
                technologyActive: false,
                scienceActive: false,
                lifestyleActive: true
            });
        }
    }
    
    state = {
        showFilter: false,
        toggle: false,
        pageTitle: 'Explore',
        allActive: true,
        creativeActive: false,
        businessActive: false,
        technologyActive: false,
        scienceActive: false,
        lifestyleActive: false
    }

    toggleHandler = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                toggle: !prevState.toggle
            };
        });
    }

    allNavhandler = () => {
        this.setState({ 
            allActive: true,
            creativeActive: false,
            businessActive: false,
            technologyActive: false,
            scienceActive: false,
            lifestyleActive: false
        });

        this.props.onSetSelectedCategory('all');
    }

    creativeNavHandler = () => {

        this.setState({ 
            allActive: false,
            creativeActive: true,
            businessActive: false,
            technologyActive: false,
            scienceActive: false,
            lifestyleActive: false
        });

        this.props.onSetSelectedCategory('creative');
    }

    businessNavHandler = () => {

        this.setState({ 
            allActive: false,
            creativeActive: false,
            businessActive: true,
            technologyActive: false,
            scienceActive: false,
            lifestyleActive: false
        });

        this.props.onSetSelectedCategory('business'); 
    }

    technologyNavHandler = () => {

        this.setState({ 
            allActive: false,
            creativeActive: false,
            businessActive: false,
            technologyActive: true,
            scienceActive: false,
            lifestyleActive: false
        });

        this.props.onSetSelectedCategory('technology');
    }

    scienceNavHandler = () => {

        this.setState({ 
            allActive: false,
            creativeActive: false,
            businessActive: false,
            technologyActive: false,
            scienceActive: true,
            lifestyleActive: false
        });

        this.props.onSetSelectedCategory('science'); 
    }

    lifeStyleNavHandler = () => {

        this.setState({ 
            allActive: false,
            creativeActive: false,
            businessActive: false,
            technologyActive: false,
            scienceActive: false,
            lifestyleActive: true
        });

        this.props.onSetSelectedCategory('lifeStyle'); 
    }

    subjectClicked = (id, views, title) => {
        const clickedSubjectArray = this.props.subjects.filter( subject => subject._id === id);
        const clickedSubject = clickedSubjectArray[0];
        this.props.onViewsIncrease(id, views, clickedSubject);
    }

    render() {
        let content = 
        <Spinner isComponent/>

        const allSubjects = this.props.subjects.map( subject => (
            <Subject
                // to={subject.to}
                subject_title={subject.title}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                category={subject.category}
                title={subject.title}
                clicked={() => this.subjectClicked( subject._id, subject.views )}
            />          
        ) );

        const creativeSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Creative');
        const creativeSubjects = creativeSubjectsFilter.map( subject => (
            <Subject
                // to={subject.to}
                subject_title={subject.title}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                category={subject.category}
                title={subject.title}
                clicked={() => this.subjectClicked( subject._id, subject.views, )}
            />
        ));

        const techSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Technology');
        const techSubjects = techSubjectsFilter.map( subject => (
            <Subject
                // to={subject.to}
                subject_title={subject.title}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                category={subject.category}
                title={subject.title}
                clicked={() => this.subjectClicked( subject._id, subject.views, )}
            />
        ));

        const businessSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Business');
        const businessSubjects = businessSubjectsFilter.map( subject => (
            <Subject
                // to={subject.to}
                subject_title={subject.title}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                category={subject.category}
                title={subject.title}
                clicked={() => this.subjectClicked( subject._id, subject.views, )}
            />
        ));

        const scienceSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Science');
        const scienceSubjects = scienceSubjectsFilter.map( subject => (
            <Subject
                // to={subject.to}
                subject_title={subject.title}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                category={subject.category}
                title={subject.title}
                clicked={() => this.subjectClicked( subject._id, subject.views, )}
            />
        ));

        const lifeStyleSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Life-style');
        const lifeStyleSubjects = lifeStyleSubjectsFilter.map( subject => (
            <Subject
                // to={subject.to}
                subject_title={subject.title}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                category={subject.category}
                title={subject.title}
                clicked={() => this.subjectClicked( subject._id, subject.views, )}
            />
        ))
        
        

        if ( !this.props.loading && this.props.selectedCategory === 'all' ) {
            content = allSubjects;
        }

        if (!this.props.loading && this.props.selectedCategory === 'creative' ) {
            content = creativeSubjects;
        }

        if (!this.props.loading && this.props.selectedCategory === 'business' ) {
            content = businessSubjects;
        }

        if (!this.props.loading && this.props.selectedCategory === 'technology' ) {
            content = techSubjects;
        }

        if (!this.props.loading && this.props.selectedCategory === 'science' ) {
            content = scienceSubjects;
        }

        if (!this.props.loading && this.props.selectedCategory === 'lifeStyle' ) {
            content = lifeStyleSubjects;
        }

        return (
            <Grid page_category='Explore'>
                <div>
                    <Toggler 
                        toggle={this.state.toggle} 
                        subheadTitle="filter"
                        toggleHandler={this.toggleHandler}
                    />
                    <HeaderNav
                        show={this.state.showFilter}
                        allActived={this.state.allActive}
                        creativeActived={this.state.creativeActive}
                        businessActived={this.state.businessActive}
                        technologyActived={this.state.technologyActive}
                        scienceActived={this.state.scienceActive}
                        lifestyleActived={this.state.lifestyleActive}
                        allClicked={this.allNavhandler}
                        creativeClicked={this.creativeNavHandler}
                        businessClicked={this.businessNavHandler}
                        technologyClicked={this.technologyNavHandler}
                        scienceClicked={this.scienceNavHandler}
                        lifeStyleClicked={this.lifeStyleNavHandler}
                    />
                </div>
                <div className={classes.Explorer}>
                    <ul className={classes.Row}>
                            {content}
                    </ul>
                </div>
            </Grid>
        )
    }
};

Explore.propTypes = {
    onFetchSubjects: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    subjects: PropTypes.array.isRequired,
  };

const mapStateToProps = state => {
    return {
        subjects: state.explore.subjects,
        loading: state.explore.loading,
        selectedCategory: state.explore.selectedCategory,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects() ),
        onViewsIncrease: ( id, views, clickedSubject ) => dispatch( actions.increaseViews( id, views, clickedSubject ) ),
        onSetSelectedCategory: ( category ) => dispatch( actions.setSelectedCategory( category )),
        // onSetClickedSubjectTitle: (title) => dispatch( actions.setClickedSubjectTitle)
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Explore );
