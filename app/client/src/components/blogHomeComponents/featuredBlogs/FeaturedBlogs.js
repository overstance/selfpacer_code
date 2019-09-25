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

    blogPostViewed = (postId, postViews) => {
        let recentlyViewed = this.props.recentlyViewedBlogsByUser.find(id => id === postId)

        if (recentlyViewed) {
            // console.log('this blog is recently viewed');
            return;
        } else {
            let updatedRecentlyViewedBlogs = this.props.recentlyViewedBlogsByUser;
            let updatedViews = postViews + 1;
            updatedRecentlyViewedBlogs.push(postId);

            // console.log(recentlyViewed, this.props.recentlyViewedBlogsByUser, updatedRecentlyViewedBlogs, postViews, updatedViews);
            this.props.onIncreaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs);
        }
    }

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
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
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
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
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
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
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
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
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
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
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
    recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs)),
        onFetchFeaturedBlogs: () => dispatch(actions.fetchFeaturedBlogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedBlogs);