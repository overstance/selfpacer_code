import React, { Component } from 'react';
import classes from './blogPostLatestSection.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LatestBlog from '../../../components/blogHomeComponents/latestSection/latestBlog';
import LatestVideo from '../../../components/blogHomeComponents/latestSection/latestVideo';
import PopularBlog from '../../../components/blogHomeComponents/latestSection/popularBlog';

class LatestSection extends Component {
    render() {

        let latestBlogsArray = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "latest test draft 1 head admin 1",
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
                title: "latest test draft 1 head admin 2",
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
                title: "latest test draft 1 head admin 3",
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
                title: "latest test draft 1 head admin test draft 1 headadmin 4",
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
                title: "latest test draft 1 head admin 5",
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
                title: "latest test draft 1 head admin 5",
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
            }
        ]

        let popularBlogsArray = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "popular test draft 1 head admin",
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
                title: "popular test draft 1 head admin",
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
                title: "popular test draft 1 head admin",
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
                title: "popular test draft 1 head admin",
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
            }
        ];

        let latestVideosArray = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "popular test draft 1 head admin",
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
                title: "popular test draft 1 head admin",
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
                title: "popular test draft 1 head admin",
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
            }
        ];

        let latestBlogs1to3 = latestBlogsArray.slice(0, 3).map((blog, i) => (
            <LatestBlog
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
                displayDate={blog.displayDate}
            />
        ));

        let latestBlogs4to6 = latestBlogsArray.slice(3, 6).map((blog, i) => (
            <LatestBlog
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
                displayDate={blog.displayDate}
            />
        ));

        let popularBlogs = popularBlogsArray.map((blog, index) => (
            <PopularBlog
                key={index} 
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                source={blog.featuredImage.source}
                featureImageUrl={blog.featuredImage.url}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                slug={blog.slug}
                serialNumber={index + 1}
            />
        ));

        let latestVideos1 = latestVideosArray.slice(0, 1).map((video, i) => (
            <LatestVideo 
                key={i} 
                publishYear={video.publishYear}
                publishMonth={video.publishMonth}
                publishDay={video.publishDay}
                source={video.featuredImage.source}
                featureImageUrl={video.featuredImage.url}
                category={video.category}
                title={video.title}
                description={video.description}
                slug={video.slug}
                displayDate={video.displayDate}
            />
        ));

        let latestVideos2to3 = latestVideosArray.slice(1, 3).map((video, i) => (
            <LatestVideo 
                key={i} 
                publishYear={video.publishYear}
                publishMonth={video.publishMonth}
                publishDay={video.publishDay}
                source={video.featuredImage.source}
                featureImageUrl={video.featuredImage.url}
                category={video.category}
                title={video.title}
                description={video.description}
                slug={video.slug}
                displayDate={video.displayDate}
            />
        ));

        return(
            <div className={classes.contentWrapper}>
                <div className={classes.latestBlogContainer}>
                    <div className={classes.sectionSubhead}>
                        <Link to='/blog/latest' className={classes.sectionSubheadTitle}>Latest</Link>
                        <Link to='/blog/latest' className={classes.sectionSubheadMore}>See All</Link>
                    </div>
                    {latestBlogs1to3}
                    <div className={classes.latestVideoContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/videos' className={classes.sectionSubheadTitle}>Videos</Link>
                            <Link to='/blog/videos' className={classes.sectionSubheadMore}>See All</Link>
                        </div>
                        <div className={classes.latestVideoLarge}>
                            <div className={classes.latestVideos1}>{latestVideos1}</div>
                            <div className={classes.latestVideos2to3}>
                                {latestVideos2to3}
                            </div>
                        </div>
                    </div>
                    <div className={classes.popularSectionSmallMediaContainer}>
                        <div className={classes.popularBlogSmallMediaContainer}>
                            <div className={classes.sectionSubhead}>
                                <Link to='/blog/popular' className={classes.sectionSubheadTitle}>Popular</Link>
                                <Link to='/blog/popular' className={classes.sectionSubheadMore} >See All</Link>
                            </div>
                            {popularBlogs}
                        </div>
                        <div className={classes.sideAdSmallMedia}>
                            <div className={classes.adFullSide}/>
                        </div>
                    </div>
                    <div className={classes.latestBlogs4to6}>
                        {latestBlogs4to6}
                        <div className={classes.seeAll}><Link to='/blog/latest'>see all</Link></div>
                    </div>
                </div>
                <div className={classes.aside}>
                    <div className={classes.popularBlogContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/popular' className={classes.sectionSubheadTitle}>Popular</Link>
                            <Link to='/blog/popular' className={classes.sectionSubheadMore} >See All</Link>
                        </div>
                        {popularBlogs}
                    </div>
                    <div className={classes.blogPostLatestSideAd}>
                        <div className={classes.adFullSide}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // moreInCategory: state.blog.moreInCategory
});

export default connect(mapStateToProps)(LatestSection);