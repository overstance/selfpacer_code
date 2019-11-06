import React, { Component, Fragment } from 'react';
import classes from './sections.module.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import Grid from '../grid/grid';
import BlogItem from '../../../components/blogItem/blogItem';

const ResourcesSideAd = () => (
    <div className={classes.adFullSide}/>
)

class BottomSection extends Component {

    componentDidMount() {
        this.props.onFetchFeaturedBlogs();

        if (this.props.userSpec && this.props.userSpec !== '' && this.props.subjects.length > 0) {
            let currentSkill = this.props.subjects.find(skill => skill.title === this.props.userSpec);

            if (currentSkill) {
                let category = currentSkill.category;
                if (category === 'Life-style') {
                    category = 'Life-Style'
                }
                this.props.onFetchBlogsBySection(category, 0);
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userSpec !== prevProps.userSpec) {
            let currentSkill = this.props.subjects.find(skill => skill.title === this.props.userSpec);

            if (currentSkill) {
                let category = currentSkill.category;
                if (category === 'Life-style') {
                    category = 'Life-Style'
                }
                this.props.onFetchBlogsBySection(category, 0);
            }
        }
    }

    blogPostViewed = (postId, postViews) => {
        let recentlyViewed = this.props.recentlyViewedBlogsByUser.find(id => id === postId)

        if (recentlyViewed) {
            return;
        } else {
            let updatedRecentlyViewedBlogs = this.props.recentlyViewedBlogsByUser;
            let updatedViews = postViews + 1;
            updatedRecentlyViewedBlogs.push(postId);

            this.props.onIncreaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs);
        }
    }

    render() {

        let featuredBlogs;

        if (this.props.fetchFeaturedBlogsLoading) {
            featuredBlogs = <Spinner isComponent/>
        }

        if (this.props.featuredBlogs.length > 0) {
            let blogs = this.props.featuredBlogs.slice(0, 5).map((blog, i) => (
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
                    displayDate={blog.displayDate}
                    publishedOn={blog.publishedOn}
                    postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ))

            featuredBlogs = 
            <div className={classes.subsection}>
                <h2>Featured <Link to="/blog" >Blog Posts</Link></h2>
                <div>
                    {blogs}
                </div>
            </div>
        }

        let relatedBlogs;

        if (this.props.fetchBlogsBySectionLoading) {
            relatedBlogs = <Spinner isComponent/>
        }

        if (this.props.blogsBySection.length > 0) {
            let blogs = this.props.blogsBySection.slice(0, 5).map((blog, i) => (
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
                    displayDate={blog.displayDate}
                    publishedOn={blog.publishedOn}
                    postClicked={() => this.blogPostViewed(blog._id, blog.views)}
                />
            ))

            relatedBlogs = 
            <div className={classes.subsection}>
                <h2>Related <Link to="/blog" >Blog Posts</Link></h2>
                <div>
                    {blogs}
                </div>
            </div>
        }

        return(
            this.props.featuredBlogs.length > 0 ||
            this.props.blogsBySection.length > 0 ?
            <Fragment>
                <Grid
                    sideAd={
                        <ResourcesSideAd />
                    }
                >
                    
                    <div className={classes.section}>
                        {featuredBlogs}  
                        {relatedBlogs}       
                    </div>

                </Grid>
                <div className={classes.featuredSectionTopAd}>
                    <div className={classes.adFull} />
                    <div className={classes.adMedium} />
                </div>
            </Fragment>
            :
            null
        )
    }
}

const mapStateToProps = state => {
    return {
        userSpec: state.auth.userSpecialization,

        featuredBlogs: state.blog.featuredBlogs,
        fetchFeaturedBlogsLoading: state.blog.fetchFeaturedBlogsLoading,

        blogsBySection: state.blog.blogsBySection,
        fetchBlogsBySectionLoading: state.blog.fetchBlogsBySectionLoading,

        recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,

        subjects: state.explore.subjects
    };
};

const mapDispatchToProps = dispatch => {
    return { 
        onFetchFeaturedBlogs: () => dispatch(actions.fetchFeaturedBlogs()),
        onFetchBlogsBySection: (category, pageIndex) => dispatch(actions.fetchBlogsBySection(category, pageIndex)),
        onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomSection);