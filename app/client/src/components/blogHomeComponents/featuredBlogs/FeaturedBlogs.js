import React, { Component } from 'react';
import classes from './featuredBlogs.module.css';
import FeaturedCover from './featuredCover';
import FeaturedMedium from './featuredMedium';
import FeaturedSmall from './featuredSmall';
import FeaturedLarge from './featuredLarge';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UserInterface/Spinner/Spinner';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class FeaturedBlogs extends Component { 
    
    componentDidMount() {
        this.props.onFetchFeaturedBlogs();
    };

    render () {
        let featuredSection = <Spinner isComponent/>

        const cover = this.props.featuredBlogs.slice(0, 1);
        const medium = this.props.featuredBlogs.slice(1, 3);
        const small = this.props.featuredBlogs.slice(3, 7);
        const large = this.props.featuredBlogs.slice(7, 11);

        let featuredMedium = medium.map((blog, i) => (
            <FeaturedMedium
                key={i} 
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                source={blog.featuredImage.source}
                featureImageUrl={blog.featuredImage.url}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
            />
        ));

        let featuredCover = cover.map((blog, i) => (
            <FeaturedCover
                key={i} 
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                source={blog.featuredImage.source}
                featureImageUrl={blog.featuredImage.url}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
            />
        ));

        let featuredSmall = small.map((blog, i) => (
            <FeaturedSmall
                key={i} 
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                source={blog.featuredImage.source}
                featureImageUrl={blog.featuredImage.url}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
            />
        ));

        let featuredLarge = large.map((blog, i) => (
            <FeaturedLarge
                key={i} 
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                source={blog.featuredImage.source}
                featureImageUrl={blog.featuredImage.url}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
            />
        ));

        let featuredLargeToSmall = large.map((blog, i) => (
            <FeaturedSmall
                key={i} 
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                source={blog.featuredImage.source}
                featureImageUrl={blog.featuredImage.url}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
            />
        ));

        if(!this.props.fetchFeaturedBlogsLoading && !this.props.fetchFeaturedBlogsError) {
            featuredSection =
            <section className={classes.featuredBlogsSection}>
                <div className={classes.featuredSectionTop}>
                    <div className={classes.featuredMediumContainer}>
                        {featuredMedium}
                    </div>
                    <div className={classes.featuredCoverContainer}>
                        {featuredCover}
                    </div>
                    <div className={classes.featuredSmallContainer}>
                        {featuredSmall}
                    </div>    
                </div>
                <div className={classes.featuredSectionTopAd}>
                    <div className={classes.adFull} />
                    <div className={classes.adMedium} />
                </div>
                <div className={classes.featuredSectionMiddle}>
                    <div className={classes.featuredSmallMiddleContainer}>
                        {featuredSmall}
                    </div>
                    <div className={classes.featuredMediumMiddleContainer}>
                        {featuredMedium}
                    </div>
                </div>
                <div className={classes.featuredSectionBottom}>
                    <div className={classes.featuredLargeContainer}>
                        {featuredLarge}
                    </div>
                </div>
                <div className={classes.featuredSectionBottomAd}>
                    <div className={classes.adFull} />
                    <div className={classes.adMedium} />
                </div>
                <div className={classes.featuredSectionBottomost}>
                    <div className={classes.featuredSmallBottommostContainer}>
                        {featuredLargeToSmall}
                    </div>
                </div>
            </section>    
        } else if (!this.props.fetchFeaturedBlogsLoading && this.props.fetchFeaturedBlogsError) {
            featuredSection = 
            <div>{this.props.fetchFeaturedBlogsError}</div>
        }

        return (featuredSection);
    }
}

const mapStateToProps = state => ({
    featuredBlogs: state.blog.featuredBlogs,
    fetchFeaturedBlogsLoading: state.blog.fetchFeaturedBlogsLoading,
    fetchFeaturedBlogsError: state.blog.fetchFeaturedBlogsError,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFeaturedBlogs: () => dispatch(actions.fetchFeaturedBlogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedBlogs);