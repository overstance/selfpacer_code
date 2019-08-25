import React, { Component } from 'react';
import classes from './latestSection.module.css';
// import FeaturedCover from './featuredCover';
import LatestBlog from './latestBlog';
import PopularBlog from './popularBlog';
import Facilitator from './facilitator';
import { Link } from 'react-router-dom';

class FeaturedBlogs extends Component {  
    render () {

        let latestBlogsArray = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "latest test draft 1 head admin 1",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            }/* ,
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "popular test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
                    publicId: "blog_imgs/local/etcqugneo4ko0uhjvjhb",
                    source: "image source", caption: "image caption", 
                    id: "5d5b0ccff536de2178881eb1"
                },
                publishDay: "20",
                publishMonth: "08",
                publishYear: "2019",
                publishedOn: "2019-08-20T17:58:36.542Z",
                slug: "test-draft-1"
            } */
        ];

        let facilitatorsArray = [
            {
                accountType: "Editor",
                active: true,
                date: "2018-12-17T00:05:01.441Z",
                email: "alibrown8319@gmail.com",
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                accountType: "Editor",
                active: true,
                date: "2018-12-17T00:05:01.441Z",
                email: "alibrown8319@gmail.com",
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
                profilePictureUrl: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
                isDesigner: true,
                isAssetManager: false,
                isAuthor: false,
                isCounselor: false,
                isCourseProvider: false,
                isEditor: false,
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

        /* const latest = featuredBlogs.slice(1, 3);
        const small = featuredBlogs.slice(3, 7); */

        let latestBlogs = latestBlogsArray.map((blog, i) => (
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
        ))

        return (
            <section className={classes.latestSection}>
                <div className={classes.facilitatorContainer}>
                    <div className={classes.sectionSubhead}>
                        <Link to='/blog/facilitators' className={classes.sectionSubheadTitle}>Facilitors</Link>
                        <Link to='/blog/facilitators' className={classes.sectionSubheadMore}>See All</Link>
                    </div>
                    {facilitators}
                </div>
                <div className={classes.latestBlogContainer}>
                    <div className={classes.sectionSubhead}>
                        <Link to='/blog/latest' className={classes.sectionSubheadTitle}>Latest</Link>
                        <Link to='/blog/latest' className={classes.sectionSubheadMore}>See All</Link>
                    </div>
                    {latestBlogs}
                </div>
                <div className={classes.popularBlogContainer}>
                    <div className={classes.sectionSubhead}>
                        <Link to='/blog/popular' className={classes.sectionSubheadTitle}>Popular</Link>
                        <Link to='/blog/popular' className={classes.sectionSubheadMore} >See All</Link>
                    </div>
                    {popularBlogs}
                    <div className={classes.latestSectionSideAd}>
                        <div className={classes.adFullSide}/>
                    </div>
                </div> 
            </section>
        );
    }
}

export default FeaturedBlogs;