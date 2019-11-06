import React, { Component, Fragment } from 'react';
import classes from './sections.module.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from '../carousel/carousel';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import Grid from '../grid/grid';
import Subject from '../../skillsPage/Subject/Subject';

const ResourcesSideAd = () => (
    <div className={classes.adFullSide}/>
)

class MiddleSection extends Component {

    componentDidMount() {
        if (this.props.userSpec && this.props.userSpec !== '') {
            // this.props.onFetchExplorefeaturedCollectionsInSpec(this.props.userSpec);
            this.props.onFetchSharedCollectionsBySpec(this.props.userSpec);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userSpec !== prevProps.userSpec) {
            // this.props.onFetchExplorefeaturedCollectionsInSpec(this.props.userSpec);
            this.props.onFetchSharedCollectionsBySpec(this.props.userSpec);
        }
    }

    subjectClicked = (id, views, title) => {
        const clickedSubjectArray = this.props.subjects.filter( subject => subject._id === id);
        const clickedSubject = clickedSubjectArray[0];
        this.props.onViewsIncrease(id, views, clickedSubject);
    }

    render() {

        let allSkills = this.props.subjects;
        let skillsInSpecCategoryArray = [];

        let otherSkillsInCategory;

        if (this.props.userSpec && this.props.userSpec !== '' && this.props.subjects.length > 0) {
            let currentSkill = allSkills.find(skill => skill.title === this.props.userSpec);

            if(currentSkill) {
                let category = currentSkill.category;
                skillsInSpecCategoryArray = allSkills.filter(skill => skill.category === category);
            }
        }

        if (skillsInSpecCategoryArray.length > 0) {
            let skillsFiltered = skillsInSpecCategoryArray.filter(skill => skill.title !== this.props.userSpec);

            if(skillsFiltered.length > 0) {
                let otherSkills = skillsFiltered.map((subject, i) => (
                    <Subject 
                        subject_title={subject.title}
                        key={i}
                        src={subject.src}
                        alt={subject.alt}
                        category={subject.category}
                        title={subject.title}
                        clicked={() => this.subjectClicked( subject._id, subject.views )}
                    />
                ))
    
                otherSkillsInCategory = 
                <div className={classes.subsection}>
                    <h2><Link to="/skills" >Skills</Link> related to {' ' + this.props.userSpec}</h2>
                    <div className={classes.otherSkillsContainer}>
                        {otherSkills}
                    </div>
                </div>
            } else {
                skillsInSpecCategoryArray = [];
            }
            
        }

        let featured = [];
        let others = [];

        let featuredCollectionsInSpec;

        if (this.props.sharedCollectionsLoading) {
            featuredCollectionsInSpec = 
            <div className={classes.spinnerWrapper}>   
                <Spinner isComponent/>
            </div>
        } else if(!this.props.sharedCollectionsLoading && this.props.sharedCollections.length > 0) {
            featured =  this.props.sharedCollections.filter(collection => collection.public && collection.featured).slice(0, 10);

            if (featured.length > 0) {
                featuredCollectionsInSpec =
                <div className={classes.subsection}>
                    <h2>Featured <Link to="/collections" >Collections</Link> in {' ' + this.props.userSpec}</h2>
                    <Carousel
                        items={featured}
                        isCollection
                    />
                </div>
            }           
        }

        let sharedCollectionsBySpec;

        if (this.props.sharedCollectionsLoading) {
            sharedCollectionsBySpec = 
            <div className={classes.spinnerWrapper}>   
                <Spinner isComponent/>
            </div>
        } else if(!this.props.sharedCollectionsLoading && this.props.sharedCollections.length > 0) {
            others = this.props.sharedCollections.filter(collection => collection.public && !collection.featured).slice(0, 10);
            sharedCollectionsBySpec =
            <div className={classes.subsection}>
                <h2>Shared <Link to="/collections" >Collections</Link> in {' ' + this.props.userSpec}</h2>
                <Carousel
                    items={others}
                    isCollection
                />
            </div>
        }



        return(
            this.props.sharedCollections.length > 0 ||
            skillsInSpecCategoryArray.length > 0 ?
            <Fragment>
                <Grid
                    sideAd={
                        <ResourcesSideAd />
                    }
                >
                    
                    <div className={classes.section}>
                        {featuredCollectionsInSpec}  
                        {sharedCollectionsBySpec} 
                        {otherSkillsInCategory}        
                    </div>

                </Grid>
                <div className={classes.featuredSectionTopAd}>
                    <div className={classes.adFull} />
                    <div className={classes.adMedium} />
                </div>
            </Fragment>
            :
            null
        )
    }
}

const mapStateToProps = state => {
    return {
        userSpec: state.auth.userSpecialization,

        sharedCollectionsLoading: state.collection.sharedCollectionsLoading,
        sharedCollections: state.collection.sharedCollections,

        subjects: state.explore.subjects
    };
};

const mapDispatchToProps = dispatch => {
    return {       
        onFetchSharedCollectionsBySpec: (userSpec) => dispatch(actions.fetchSharedCollectionsBySpec(userSpec)),
        onViewsIncrease: ( id, views, clickedSubject ) => dispatch( actions.increaseViews( id, views, clickedSubject ) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiddleSection);