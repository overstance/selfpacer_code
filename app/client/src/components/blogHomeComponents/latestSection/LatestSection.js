import React, { Component } from 'react';
import classes from './latestSection.module.css';
// import FeaturedCover from './featuredCover';
import LatestBlog from './latestBlog';
import PopularBlog from './popularBlog';
import Facilitator from './facilitator';
// import LatestVideo from './latestVideo';
// import LatestPodcast from './latestPodcast';
import { Link } from 'react-router-dom';
import Spinner from '../../UserInterface/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

class LatestBlogs extends Component {  

    componentDidMount() {
        this.props.onFetchBlogsByPopularity(0);
        this.props.onFetchBlogsByRecent(0);
    }

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

        /* let latestVideosArray = [
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
        ]; */

        /* let latestPodcastsArray = [           
            {
                category: "Podcast",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "popular test draft 1 head admin",
                season: 1,
                episode: 1,
                episodeTitle: "episode title goes here",
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
        ]; */

        let facilitatorsArray = [
            {
                accountType: "Editor",
                active: true,
                date: "2018-12-17T00:05:01.441Z",
                email: "alibrown8319@gmail.com",
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                isArtist: false,
                isAssetManager: false,
                isAuthor: true,
                isCounselor: false,
                isCourseProvider: false,
                isEditor: true,
                twitterUrl: '',
                // facebookUrl: '',
                // linkedinUrl: '',
                isFacilitateApplicant: false,
                isResearcher: false,
                isUserManager: false,
                likeCount: 116,
                name: "Babatunde Ali-Brown",
                pinnedCollections: ["5d045a6b30be972864036d36", "5d0178972a96d4277c65978b", "5d0179022a96d4277c65978c"],
                recentlyViewed: ["5c38e5e025094c1e5810583e", "5c38df9a57b8211ed8de1aed", "5c3b839c63b8c51434c95e9c"],
                specialization: "Accounting",
                username: "alibrown8319@gmail.com",
                __v: 0,
                _id: "5c16e8de76e09e200c039178"
            },
            {
                accountType: "Facilitator",
                active: true,
                date: "2018-12-17T00:05:01.441Z",
                email: "alibrown8319@gmail.com",
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1567702860/blog_imgs/hero/local/msuikls4qwan40hdbl53.png",
                isArtist: false,
                isAssetManager: false,
                isAuthor: true,
                isCounselor: false,
                isCourseProvider: false,
                isEditor: true,
                twitterUrl: '',
                // facebookUrl: '',
                // linkedinUrl: '',
                isFacilitateApplicant: false,
                isResearcher: false,
                isUserManager: false,
                likeCount: 116,
                name: "Babatunde Ali-Brown",
                pinnedCollections: ["5d045a6b30be972864036d36", "5d0178972a96d4277c65978b", "5d0179022a96d4277c65978c"],
                recentlyViewed: ["5c38e5e025094c1e5810583e", "5c38df9a57b8211ed8de1aed", "5c3b839c63b8c51434c95e9c"],
                specialization: "Accounting",
                username: "alibrown8319@gmail.com",
                __v: 0,
                _id: "5c16e8de76e09e200c039178"
            }    
        ];

        let latestBlogs1to3 = <Spinner isComponent/>
        let latestBlogs4to6;

        if(!this.props.fetchBlogsByRecentLoading && !this.props.fetchBlogsByRecentError) {
            latestBlogs1to3 = this.props.blogsByRecent.slice(0, 3).map((blog, i) => (
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
                    publishedOn={blog.publishedOn}
                    postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));

            latestBlogs4to6 = this.props.blogsByRecent.slice(3, 6).map((blog, i) => (
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
                    publishedOn={blog.publishedOn}
                    postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
        }

        let popularBlogs = <Spinner isComponent/>

        if(!this.props.fetchBlogsByPopularityLoading && !this.props.fetchBlogsByPopularityError) {
            popularBlogs = this.props.blogsByPopularity.slice(0, 4).map((blog, index) => (
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
                    postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
        }
        

        let facilitators = facilitatorsArray.map((facilitator, i) => (
            <Facilitator 
                key={i} 
                profilePictureUrl={facilitator.profilePictureUrl}
                name={facilitator.name}
                accountType={facilitator.accountType}
                isEditor={facilitator.isEditor}
                isAuthor={facilitator.isAuthor}
                isDesigner={facilitator.isDesigner}
                isResearcher={facilitator.isResearcher}
            />
        ));

        /* let latestVideos1 = latestVideosArray.slice(0, 1).map((video, i) => (
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
        )); */

        /* let latestPodcast = latestPodcastsArray.map((podcast, i) => (
            <LatestPodcast 
                key={i} 
                publishYear={podcast.publishYear}
                publishMonth={podcast.publishMonth}
                publishDay={podcast.publishDay}
                source={podcast.featuredImage.source}
                episodeTitle={podcast.episodeTitle}
                episode={podcast.episode}
                season={podcast.season}
                featureImageUrl={podcast.featuredImage.url}
                category={podcast.category}
                title={podcast.title}
                description={podcast.description}
                slug={podcast.slug}
                displayDate={podcast.displayDate}
            />
        )); */

        return (
            <section className={classes.latestSection}>
                <div className={classes.latestSectionTop}>
                    <div className={classes.facilitatorContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/facilitators' className={classes.sectionSubheadTitle}>Facilitors</Link>
                            <Link to='/blog/facilitators' className={classes.sectionSubheadMore}>See All</Link>
                        </div>
                        {facilitators}
                        {/* <div className={classes.latestPodcastContainer}>
                            <div className={classes.sectionSubhead}>
                                <Link to='/blog/podcasts' className={classes.sectionSubheadTitle}>Podcasts</Link>
                                <Link to='/blog/podcasts' className={classes.sectionSubheadMore}>See All</Link>
                            </div>
                            {latestPodcast}
                        </div> */}
                    </div>
                    <div className={classes.latestBlogContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/latest_blogposts' className={classes.sectionSubheadTitle}>Latest</Link>
                            <Link to='/blog/latest_blogposts' className={classes.sectionSubheadMore}>See All</Link>
                        </div>
                        {latestBlogs1to3}
                        {/* <div className={classes.latestVideoContainer}>
                            <div className={classes.sectionSubhead}>
                                <Link to='/blog/videos' className={classes.sectionSubheadTitle}>Videos</Link>
                                <Link to='/blog/videos' className={classes.sectionSubheadMore}>See All</Link>
                            </div>
                            <div className={classes.latestVideoLarge}>
                                <div className={classes.latestVideos1}>{latestVideos1}</div>
                                <div className={classes.latestVideos2to3}>{latestVideos2to3}</div>
                            </div>
                        </div> */}
                        <div className={classes.popularBlogBottomContainer}>
                            <div className={classes.sectionSubhead}>
                                <Link to='/blog/popular_blogposts' className={classes.sectionSubheadTitle}>Popular</Link>
                                <Link to='/blog/popular_blogposts' className={classes.sectionSubheadMore} >See All</Link>
                            </div>
                            {popularBlogs}
                        </div>
                        <div className={classes.latestBlogs4to6}>
                            {/* comment out or delete the spacer below once video container is used */}
                            <div className={classes.spacerInAbsenceOfVideoSection}/>
                            {latestBlogs4to6}
                            <div className={classes.seeAll}><Link to='/blog/latest_blogposts'>see all</Link></div>
                        </div>
                    </div>
                    <div className={classes.popularBlogContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/popular_blogposts' className={classes.sectionSubheadTitle}>Popular</Link>
                            <Link to='/blog/popular_blogposts' className={classes.sectionSubheadMore} >See All</Link>
                        </div>
                        {popularBlogs}
                        <div className={classes.latestSectionSideAd}>
                            <div className={classes.adFullSide}/>
                        </div>
                        <div className={classes.facilitatorSideContainer}>
                            <div className={classes.sectionSubhead}>
                                <Link to='/blog/facilitators' className={classes.sectionSubheadTitle}>Facilitors</Link>
                                <Link to='/blog/facilitators' className={classes.sectionSubheadMore}>See All</Link>
                            </div>
                            {facilitators}
                            {/* <div className={classes.latestPodcastContainer}>
                                <div className={classes.sectionSubhead}>
                                    <Link to='/blog/podcasts' className={classes.sectionSubheadTitle}>Podcasts</Link>
                                    <Link to='/blog/podcasts' className={classes.sectionSubheadMore}>See All</Link>
                                </div>
                                {latestPodcast}
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className={classes.latestSectionBottomost}>
                    <div className={classes.facilitatorBottomContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/facilitators' className={classes.sectionSubheadTitle}>Facilitors</Link>
                            <Link to='/blog/facilitators' className={classes.sectionSubheadMore}>See All</Link>
                        </div>
                        <div className={classes.facilitatorsBottom}>
                            {facilitators}
                        </div>   
                    </div>
                    {/* <div className={classes.latestPodcastContainer}>
                        <div className={classes.sectionSubhead}>
                            <Link to='/blog/podcasts' className={classes.sectionSubheadTitle}>Podcasts</Link>
                            <Link to='/blog/podcasts' className={classes.sectionSubheadMore}>See All</Link>
                        </div>
                        {latestPodcast}
                    </div> */}
                    <div className={classes.latestBlogs4to6Bottom}>
                        {/* comment out or delete the spacer below once video container is used */}
                        <div className={classes.spacerInAbsenceOfVideoSection}/>
                        {latestBlogs4to6}
                        <div className={classes.seeAll}><Link to='/blog/latest_blogposts'>see all</Link></div>
                    </div> 
                </div>
                <div className={classes.latestSectionBottomAd}>
                    <div className={classes.adFull} />
                    <div className={classes.adMedium} />
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        blogsByPopularity: state.blog.blogsByPopularity,
        fetchBlogsByPopularityLoading: state.blog.fetchBlogsByPopularityLoading,
        fetchBlogsByPopularityError: state.blog.fetchBlogsByPopularityError,

        blogsByRecent: state.blog.blogsByRecent,
        fetchBlogsByRecentLoading: state.blog.fetchBlogsByRecentLoading,
        fetchBlogsByRecentError: state.blog.fetchBlogsByRecentError,

        recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBlogsByRecent: (pageIndex) => dispatch(actions.fetchBlogsByRecent(pageIndex)),
        onFetchBlogsByPopularity: (pageIndex) => dispatch(actions.fetchBlogsByPopularity(pageIndex)),
        onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlogs);