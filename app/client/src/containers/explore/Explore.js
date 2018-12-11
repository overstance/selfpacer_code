import React, { Component } from 'react';
// import axios from 'axios';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import PropTypes from 'prop-types';
import classes from './Explore.css';
import ExploreHeaderNav from './ExploreHeaderNav/ExploreHeaderNav';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Subject from './Subject/Subject';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import SubHeader from '../../components/UserInterface/Subheader/SubHeader';
import Grid from '../../components/UserInterface/Grid/Grid';


/* function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
} */ 

class Explore extends Component {

    componentDidMount () {

        if ( this.props.selectedCategory === 'all') {
            this.props.onFetchSubjects();
        }

        if ( this.props.selectedCategory === 'creative') {
            this.props.onCreativeNav();
        }

        if ( this.props.selectedCategory === 'business') {
            this.props.onBusinessNav();
        }

        if ( this.props.selectedCategory === 'technology') {
            this.props.onTechnologyNav();
        }

        if ( this.props.selectedCategory === 'lifeStyle') {
            this.props.onLifeStyleNav();
        }
        
    }

    
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
        this.props.onCreativeNav(); 
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('creative');
    }

    businessNavHandler = () => {
        this.props.onBusinessNav();
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('business'); 
    }

    technologyNavHandler = () => {
        this.props.onTechnologyNav();
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter,
                filterIconRotate: !prevState.filterIconRotate
            };
        });
        this.props.onSetSelectedCategory('technology'); 
    }

    lifeStyleNavHandler = () => {
        this.props.onLifeStyleNav();
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
        // console.log(id, views, clickedSubject)
        this.props.onViewsIncrease(id, views, clickedSubject);
    }

    render() {
        let explorer = <div className={classes.SpinnerContainer}> <Spinner /> </div>;
        if ( !this.props.loading ) {
            // const shuffledSubjects = shuffleArray(this.props.subjects);
            explorer = this.props.subjects.map( subject => (
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
                    
            ) )
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
                               {explorer}
                        </ul>
                    </div>
                </div>
            </Grid>
        )
    }
};

Explore.propTypes = {
    onFetchSubjects: PropTypes.func.isRequired,
    onCreativeNav: PropTypes.func.isRequired,
    onBusinessNav: PropTypes.func.isRequired,
    onTechnologyNav: PropTypes.func.isRequired,
    onLifeStyleNav: PropTypes.func.isRequired,
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
        onCreativeNav : () => dispatch( actions.fetchCreativeSubjects()),
        onBusinessNav : () => dispatch( actions.fetchBusinessSubjects()),
        onTechnologyNav : () => dispatch( actions.fetchTechnologySubjects()),
        onLifeStyleNav : () => dispatch( actions.fetchLifeStyleSubjects()),
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