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

class TopSection extends Component {

    componentDidMount() {
        if (this.props.isAuthenticated && this.props.userRecentlyViewed.length > 0) {
            this.props.onFetchExploreRecentlyViewed(this.props.userRecentlyViewed);
        }

        if (!this.props.isAuthenticated && this.props.visitorRecentlyViewed.length > 0) {
            this.props.onFetchExploreRecentlyViewed(this.props.visitorRecentlyViewed);
        }

        if (this.props.userSpec && this.props.userSpec !== '') {
            this.props.onFetchExploreLatestInSpec(this.props.userSpec);
            this.props.onFetchExplorePopularInSpec(this.props.userSpec);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userRecentlyViewed !== prevProps.userRecentlyViewed && this.props.userRecentlyViewed.length > 0) {
            this.props.onFetchExploreRecentlyViewed(this.props.userRecentlyViewed);
        }

        if (this.props.userSpec !== prevProps.userSpec) {
            this.props.onFetchExploreLatestInSpec(this.props.userSpec);
            this.props.onFetchExplorePopularInSpec(this.props.userSpec);
        }
    }

    render() {

        let recentlyViewed;

        if (this.props.recentlyViewedLoading) {
            recentlyViewed = 
            <div className={classes.spinnerWrapper}>   
                <Spinner isComponent/>
            </div>
        } else if(!this.props.recentlyViewedLoading && this.props.recentlyViewedResources.length > 0) {
            recentlyViewed =
            <div className={classes.subsection}>
                <h2>Recently viewed resources</h2>
                <Carousel
                    items={this.props.recentlyViewedResources}
                    isResource
                />
            </div>
        }

        let latestInSpec;

        if (this.props.latestInSpecLoading) {
            latestInSpec = 
            <div className={classes.spinnerWrapper}>   
                <Spinner isComponent/>
            </div>
        } else if(!this.props.latestInSpecLoading && this.props.latestInSpecResources.length > 0) {
            latestInSpec =
            <div className={classes.subsection}>
                <h2>Recently added or updated in <Link to={`/skills/${this.props.userSpec}`}>{this.props.userSpec}</Link></h2>
                <Carousel
                    items={this.props.latestInSpecResources}
                    isResource
                />
            </div>
        }

        let popularInSpec;

        if (this.props.popularInSpecLoading) {
            popularInSpec = 
            <div className={classes.spinnerWrapper}>   
                <Spinner isComponent/>
            </div>
        } else if(!this.props.popularInSpecLoading && this.props.popularInSpecResources.length > 0) {
            popularInSpec =
            <div className={classes.subsection}>
                <h2>Popular in <Link to={`/skills/${this.props.userSpec}`}>{this.props.userSpec}</Link></h2>
                <Carousel
                    items={this.props.popularInSpecResources}
                    isResource
                />
            </div>
        }



        return(
            this.props.recentlyViewedResources.length > 0 ||
            this.props.latestInSpecResources.length > 0 ||
            this.props.popularInSpecResources.length > 0 ?
            <Fragment>
                <Grid
                    sideAd={
                        <ResourcesSideAd />
                    }
                >
                    <div className={classes.topSection}>
                        {recentlyViewed}
                        {latestInSpec}  
                        {popularInSpec}         
                    </div> 
                </Grid>
                <div className={classes.featuredSectionTopAd}>
                    <div className={classes.adFull} />
                    <div className={classes.adMedium} />
                </div>
            </Fragment>             
            : null            
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userSpec: state.auth.userSpecialization,
        userRecentlyViewed: state.resource.userRecentlyViewed,
        visitorRecentlyViewed: state.auth.visitorRecentlyViewed,

        recentlyViewedLoading: state.explore.recentlyViewedLoading,
        recentlyViewedResources: state.explore.recentlyViewedResources,

        latestInSpecLoading: state.explore.latestInSpecLoading,
        latestInSpecResources: state.explore.latestInSpecResources,

        popularInSpecLoading: state.explore.popularInSpecLoading,
        popularInSpecResources: state.explore.popularInSpecResources
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchExploreRecentlyViewed: (recentlyViewedIds) => dispatch(actions.fetchExploreRecentlyViewed(recentlyViewedIds)),
        onFetchExploreLatestInSpec: (userSpec) => dispatch(actions.fetchExploreLatestInSpec(userSpec)),
        onFetchExplorePopularInSpec: (userSpec) => dispatch(actions.fetchExplorePopularInSpec(userSpec))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopSection);