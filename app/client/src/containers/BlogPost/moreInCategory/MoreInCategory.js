import React, {Component} from 'react';
import BlogItem from './blogItem';
import classes from './moreInCategory.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';

class MoreInCategory extends Component {

    componentDidMount() {
        this.props.onFetchMoreInCategory(this.props.category);
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
        
        let moreInCategory = <Spinner isComponent/>

        if(!this.props.fetchMoreInCategoryLoading && !this.props.fetchMoreInCategoryError) {
            moreInCategory =
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
            ))
        }
        

        return(
            <div className={classes.moreInCategory}>
                { this.props.moreInCategory.length > 0 ?
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
    fetchMoreInCategoryLoading: state.blog.fetchMoreInCategoryLoading,
    fetchMoreInCategoryError: state.blog.fetchMoreInCategoryError,
    recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,
});

const mapDispatchToProps = dispatch => ({
    onFetchMoreInCategory: (category) => dispatch(actions.fetchMoreInCategory(category)),
    onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInCategory);