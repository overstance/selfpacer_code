import React, { Component, Fragment } from 'react';
import classes from './sections.module.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from '../carousel/carousel';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import Grid from '../grid/grid';

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

    render() {
        let featured = [];
        let others = [];

        let featuredCollectionsInSpec;

        if (this.props.sharedCollectionsLoading) {
            featuredCollectionsInSpec = 
            <div className={classes.spinnerWrapper}>   
                <Spinner isComponent/>
            </div>
        } else if(!this.props.sharedCollectionsLoading && this.props.sharedCollections.length > 0) {
            featured =  this.props.sharedCollections.filter(collection => collection.public && collection.featured);

            if (featured.length > 0) {
                featuredCollectionsInSpec =
                <div className={classes.subsection}>
                    <h2>Featured <Link to="/collections" >Collections</Link> in in {' ' + this.props.userSpec}</h2>
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
            others = this.props.sharedCollections.filter(collection => collection.public && !collection.featured);
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
            this.props.sharedCollections.length > 0 ?
            <Fragment>
                <Grid
                    sideAd={
                        <ResourcesSideAd />
                    }
                >
                    
                    <div className={classes.topSection}>
                        {featuredCollectionsInSpec}  
                        {sharedCollectionsBySpec}         
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
    };
};

const mapDispatchToProps = dispatch => {
    return {       
        onFetchSharedCollectionsBySpec: (userSpec) => dispatch(actions.fetchSharedCollectionsBySpec(userSpec))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiddleSection);