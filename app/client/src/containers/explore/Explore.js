import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Explore.css';
import ExploreHeaderNav from './ExploreHeaderNav/ExploreHeaderNav';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Subject from './Subject/Subject';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import SubHeader from '../../components/UserInterface/Subheader/SubHeader';
import Grid from '../../components/UserInterface/Grid/Grid';

class Explore extends Component {
    
    state = {
        showFilter: false,
        filterIconRotate: false
    }

    filterToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
    }

    creativeNavHandler = () => { 
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('creative');
    }

    businessNavHandler = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('business'); 
    }

    technologyNavHandler = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('technology'); 
    }

    lifeStyleNavHandler = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('lifeStyle'); 
    }

    viewsIncreasedHandler = (id, views) => {
        const clickedSubjectArray = this.props.subjects.filter( subject => subject._id === id);
        const clickedSubject = clickedSubjectArray[0];
        this.props.onViewsIncrease(id, views, clickedSubject);
    }

    render() {
        let content = <div style={{ 'paddingTop': '5rem'}}><Spinner /></div>

        const allSubjects = this.props.subjects.map( subject => (
            <Subject
                to={subject.to}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                // views={subject.views}
                category={subject.category}
                title={subject.title}
                clicked={() => this.viewsIncreasedHandler( subject._id, subject.views )}
            />
            
        ) );

        const creativeSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Creative');
        const creativeSubjects = creativeSubjectsFilter.map( subject => (
            <Subject
                to={subject.to}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                // views={subject.views}
                category={subject.category}
                title={subject.title}
                clicked={() => this.viewsIncreasedHandler( subject._id, subject.views )}
            />
        ));

        const techSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Technology');
        const techSubjects = techSubjectsFilter.map( subject => (
            <Subject
                to={subject.to}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                // views={subject.views}
                category={subject.category}
                title={subject.title}
                clicked={() => this.viewsIncreasedHandler( subject._id, subject.views )}
            />
        ));

        const businessSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Business');
        const businessSubjects = businessSubjectsFilter.map( subject => (
            <Subject
                to={subject.to}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                // views={subject.views}
                category={subject.category}
                title={subject.title}
                clicked={() => this.viewsIncreasedHandler( subject._id, subject.views )}
            />
        ));

        const lifeStyleSubjectsFilter = this.props.subjects.filter( subject => subject.category === 'Life-style');
        const lifeStyleSubjects = lifeStyleSubjectsFilter.map( subject => (
            <Subject
                to={subject.to}
                key={subject._id}
                src={subject.src}
                alt={subject.alt}
                // views={subject.views}
                category={subject.category}
                title={subject.title}
                clicked={() => this.viewsIncreasedHandler( subject._id, subject.views )}
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

        if (!this.props.loading && this.props.selectedCategory === 'lifeStyle' ) {
            content = lifeStyleSubjects;
        }

        return (
            <Grid>
                <div>
                    <div className={classes.NavContainer}>
                        <SubHeader 
                            filterIconRotate={this.state.filterIconRotate} 
                            subheadTitle="FILTER"
                            filterToggleHandler={this.filterToggleHandler}
                        />
                        <ExploreHeaderNav
                            show={this.state.showFilter}
                            creativeClicked={this.creativeNavHandler}
                            businessClicked={this.businessNavHandler}
                            technologyClicked={this.technologyNavHandler}
                            lifeStyleClicked={this.lifeStyleNavHandler}
                        />
                    </div>
                    <div className={classes.Explorer}>
                        <ul className={classes.Row}>
                               {content}
                        </ul>
                    </div>
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
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Explore );


/*
        let explorer = <div className={classes.SpinnerContainer}> <Spinner /> </div>;
        if ( !this.props.loading ) {
            const shuffledSubjects = shuffleArray(this.props.subjects);
            explorer = shuffledSubjects.map( subject => (
                    <Subject
                        to={subject.to}
                        key={subject._id}
                        src={subject.src}
                        alt={subject.alt}
                        views={subject.views}
                        title={subject.title}
                        clicked={() => this.viewsIncreasedHandler( subject._id, subject.views)}
                    />
            ) )
        }

*/