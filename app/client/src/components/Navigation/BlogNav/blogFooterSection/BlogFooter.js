import React, { Component } from 'react';
import classes from './blogFooter.module.css';
import BlogFooterItem from './blogFooterItem';
import Container from '../../../UserInterface/Container/Container';

class BlogFooter extends Component {  
    render () {

        let featuredBlogs = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "1. test draft 1 head admin",
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
                title: "2. test draft 1 head admin",
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
                category: "Creative",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "3. test draft 1 head admin",
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
                category: "Creative",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "4. test draft 1 head admin test draft 1 headadmin",
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
                category: "Science",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "5. test draft 1 head admin",
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
                category: "Science",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "6. test draft 1 head admin",
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
                category: "Technology",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "7. test draft 1 head admin",
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
                category: "Technology",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "8. test draft 1 head admin",
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
                category: "Life-Style",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "9. test draft 1 head admin",
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
                category: "Life-Style",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "10. test draft 1 head admin",
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
                category: "Reviews",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "11. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
            },
            {
                category: "Reviews",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                title: "12. test draft 1 head admin",
                featuredImage: {
                    url: "https://res.cloudinary.com/selfpacer/image/upload/v1566248143/blog_imgs/local/etcqugneo4ko0uhjvjhb.png",
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
        ];

        let business = featuredBlogs.filter( blog => blog.category === 'Business').map((blog, i) => (
            <BlogFooterItem 
            key={i}
            title={blog.title}
            publishYear={blog.publishYear}
            publishMonth={blog.publishMonth}
            publishDay={blog.publishDay}
            slug={blog.slug}
            />
        ));

        let creative = featuredBlogs.filter( blog => blog.category === 'Creative').map((blog, i) => (
            <BlogFooterItem 
            key={i}
            title={blog.title}
            publishYear={blog.publishYear}
            publishMonth={blog.publishMonth}
            publishDay={blog.publishDay}
            slug={blog.slug}
            />
        ));

        let technology = featuredBlogs.filter( blog => blog.category === 'Technology').map((blog, i) => (
            <BlogFooterItem 
            key={i}
            title={blog.title}
            publishYear={blog.publishYear}
            publishMonth={blog.publishMonth}
            publishDay={blog.publishDay}
            slug={blog.slug}
            />
        ));

        let science = featuredBlogs.filter( blog => blog.category === 'Science').map((blog, i) => (
            <BlogFooterItem 
            key={i}
            title={blog.title}
            publishYear={blog.publishYear}
            publishMonth={blog.publishMonth}
            publishDay={blog.publishDay}
            slug={blog.slug}
            />
        ));

        let lifeStyle = featuredBlogs.filter( blog => blog.category === 'Life-Style').map((blog, i) => (
            <BlogFooterItem 
            key={i}
            title={blog.title}
            publishYear={blog.publishYear}
            publishMonth={blog.publishMonth}
            publishDay={blog.publishDay}
            slug={blog.slug}
            />
        ));

        let reviews = featuredBlogs.filter( blog => blog.category === 'Reviews').map((blog, i) => (
            <BlogFooterItem 
            key={i}
            title={blog.title}
            publishYear={blog.publishYear}
            publishMonth={blog.publishMonth}
            publishDay={blog.publishDay}
            slug={blog.slug}
            />
        ));


        return (
            <section className={classes.blogFooter}>
                <Container>
                    <div className={classes.sectionContainer}>
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>Business</div>
                            {business}
                        </div>
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>Creative</div>
                            {creative}
                        </div>
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>Science</div>
                            {science}
                        </div>
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>Technology</div>
                            {technology}
                        </div>
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>Life-Style</div>
                            {lifeStyle}
                        </div>
                        <div className={classes.section}>
                            <div className={classes.sectionTitle}>Reviews</div>
                            {reviews}
                        </div>
                    </div>
                </Container>  
            </section>
        );
    }
}

export default BlogFooter;