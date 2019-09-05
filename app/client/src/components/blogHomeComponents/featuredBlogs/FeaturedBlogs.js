import React, { Component } from 'react';
import classes from './featuredBlogs.module.css';
import FeaturedCover from './featuredCover';
import FeaturedMedium from './featuredMedium';
import FeaturedSmall from './featuredSmall';
import FeaturedLarge from './featuredLarge';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class FeaturedBlogs extends Component { 
    
    componentDidMount() {
        this.props.onFetchFeaturedBlogs();
    };

    render () {
        let featuredBlogs = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "1. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "2. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "3. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "4. test draft 1 head admin test draft 1 headadmin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "5. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "6. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "7. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "8. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "9. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "10. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            },
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "11. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", 
                    caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            }
        ]

        const cover = this.props.featuredBlogs.slice(0, 1);
        const medium = featuredBlogs.slice(1, 3);
        const small = featuredBlogs.slice(3, 7);
        const large = featuredBlogs.slice(7, 11);

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

        return (
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
        );
    }
}

const mapStateToProps = state => ({
    featuredBlogs: state.blog.featuredBlogs
});

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFeaturedBlogs: () => dispatch(actions.fetchFeaturedBlogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedBlogs);