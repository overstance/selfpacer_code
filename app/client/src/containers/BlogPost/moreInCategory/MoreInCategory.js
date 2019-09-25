import React, {Component} from 'react';
import BlogItem from './blogItem';
import classes from './moreInCategory.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class MoreInCategory extends Component {

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

    render() {
        let more = [
            {
                category: "Business",
                createdOn: "2019-08-19T21:05:34.534Z",
                description: "Bacon ipsum dolor amet shank drumstick capicola pork, turducken ball tip ham hock. Chuck venison shank rump ham hock cupim porchetta turducken salami swine corned beef tail.",
                displayDate: "August 20, 2019",
                views: 0,
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
                views: 0,
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
                views: 0,
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
                views: 0,
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
            }
        ]
        // more in category action and post route already
        // implemented. use commented below when blogs are ready
        /* let moreInCategory =
        this.props.moreInCategory.map((blog, i) => (
            <BlogItem 
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
        )) */
        let moreInCategory =
        more.map((blog, i) => (
            <BlogItem 
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
        ))
        return(
            <div className={classes.moreInCategory}>
                { /* this.props.moreInCategory.length */ more.length !== 0 ?
                    <div className={classes.sectionSubhead}>
                        <Link to={`/blog/${this.props.category}`} className={classes.sectionSubheadTitle}>{'more in ' + this.props.category}</Link>
                        <Link to={`/blog/${this.props.category}`} className={classes.sectionSubheadMore}>See All</Link>
                    </div>
                    : null
                }
                {moreInCategory}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    moreInCategory: state.blog.moreInCategory,
    recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,
});

const mapDispatchToProps = dispatch => ({
    onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInCategory);