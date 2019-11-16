import React, { Component } from 'react';
import classes from './blogFooter.module.css';
import BlogFooterItem from './blogFooterItem';
import Container from '../../../UserInterface/Container/Container';
import Spinner from '../../../UserInterface/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

class BlogFooter extends Component {

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

        let business;
        let creative;
        let technology;
        let science;
        let Humanities;
        let reviews;
        let footerContent = <Spinner isComponent/>;

        if (!this.props.fetchFeaturedBlogsLoading && !this.props.fetchFeaturedBlogsError) {
            business = this.props.featuredBlogs.filter( blog => blog.category === 'Business').slice(0, 2).map((blog, i) => (
                <BlogFooterItem 
                key={i}
                title={blog.title}
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                slug={blog.slug}
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
    
            creative = this.props.featuredBlogs.filter( blog => blog.category === 'Creative').slice(0, 2).map((blog, i) => (
                <BlogFooterItem 
                key={i}
                title={blog.title}
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                slug={blog.slug}
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
    
            technology = this.props.featuredBlogs.filter( blog => blog.category === 'Technology').slice(0, 2).map((blog, i) => (
                <BlogFooterItem 
                key={i}
                title={blog.title}
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                slug={blog.slug}
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
    
            science = this.props.featuredBlogs.filter( blog => blog.category === 'Science').slice(0, 2).map((blog, i) => (
                <BlogFooterItem 
                key={i}
                title={blog.title}
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                slug={blog.slug}
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
    
            Humanities = this.props.featuredBlogs.filter( blog => blog.category === 'Humanities').slice(0, 2).map((blog, i) => (
                <BlogFooterItem 
                key={i}
                title={blog.title}
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                slug={blog.slug}
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
    
            reviews = this.props.featuredBlogs.filter( blog => blog.category === 'Reviews').slice(0, 2).map((blog, i) => (
                <BlogFooterItem 
                key={i}
                title={blog.title}
                publishYear={blog.publishYear}
                publishMonth={blog.publishMonth}
                publishDay={blog.publishDay}
                slug={blog.slug}
                postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ));
        }

        if (!this.props.fetchFeaturedBlogsLoading) {
            footerContent =
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
                    <div className={classes.sectionTitle}>Humanities</div>
                    {Humanities}
                </div>
                <div className={classes.section}>
                    <div className={classes.sectionTitle}>Reviews</div>
                    {reviews}
                </div>
            </div>
        }


        return (
            <footer className={classes.blogFooter}>
                <Container>
                    {footerContent}
                </Container>  
            </footer>
        );
    }
}

const mapStateToProps = state => ({
    featuredBlogs: state.blog.featuredBlogs,
    fetchFeaturedBlogsLoading: state.blog.fetchFeaturedBlogsLoading,
    fetchFeaturedBlogsError: state.blog.fetchFeaturedBlogsError,
    recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,
});

const mapDispatchToProps = dispatch => ({
    onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFooter);