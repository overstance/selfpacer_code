import React, { Component } from 'react';
import classes from './latestSection.module.css';
// import FeaturedCover from './featuredCover';
import LatestBlog from './latestBlog';
import PopularBlog from './popularBlog';
import Facilitator from './facilitator';
// import { Link } from 'react-router-dom';

class FeaturedBlogs extends Component {  
    render () {

        let latestBlogsArray = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "1. latest test draft 1 head admin",
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
                title: "2. latest test draft 1 head admin",
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
                title: "3. latest test draft 1 head admin",
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
                title: "4. latest test draft 1 head admin test draft 1 headadmin",
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
                title: "5. latest test draft 1 head admin",
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
                title: "1. popular test draft 1 head admin",
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
                title: "2. popular test draft 1 head admin",
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
                title: "3. popular test draft 1 head admin",
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
                title: "4. popular test draft 1 head admin",
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
                title: "5. popular test draft 1 head admin",
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
        ];

        let facilitatorsArray = [{
            category: "Business",
            createdOn: "2019-08-19T21:05:34.534Z",
            description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
            displayDate: "August 20, 2019",
            title: "1. facilitator test draft 1 head admin",
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
            title: "2. facilitator test draft 1 head admin",
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
            title: "3. facilitator test draft 1 head admin",
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
            title: "4. facilitator test draft 1 head admin",
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
            title: "5. facilitator test draft 1 head admin",
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
            />
        ));

        let popularBlogs = popularBlogsArray.map((blog, i) => (
            <PopularBlog
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

        let facilitators = facilitatorsArray.map((facilitator, i) => (
            <Facilitator 
                key={i} 
                publishYear={facilitator.publishYear}
                publishMonth={facilitator.publishMonth}
                publishDay={facilitator.publishDay}
                source={facilitator.featuredImage.source}
                featureImageUrl={facilitator.featuredImage.url}
                category={facilitator.category}
                title={facilitator.title}
                description={facilitator.description}
                slug={facilitator.slug}
            />
        ))

        return (
            <section className={classes.latestSection}>
                <div className={classes.facilitatorContainer}>
                    {facilitators}
                </div>
                <div className={classes.latestBlogContainer}>
                    {latestBlogs}
                </div>
                <div className={classes.popularBlogContainer}>
                    {popularBlogs}
                </div> 
            </section>
        );
    }
}

export default FeaturedBlogs;