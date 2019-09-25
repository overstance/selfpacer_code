import React, {Component} from 'react';
import classes from './blogSection.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BlogItem from '../../components/blogItem/blogItem';
import MorePostSoon from '../../components/morePostSoon/morePostSoon';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Container from '../../components/UserInterface/Container/Container';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import LoadMorePrompt from '../../components/UserInterface/LoadMorePrompt/blogLoadMore';


class Popular extends Component {

    state = {
        pageIndex: 0
    }

    componentDidMount() {
        this.props.onSetIsBlogPage();

        this.props.onFetchBlogsByPopularity(0);
        window.addEventListener('scroll', this.handleScroll, false);
        window.scroll(0, 0);
    }

    componentWillUnmount() {
        this.props.onUnsetIsBlogPage();
        this.props.onClearBlogSectionMessages();
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    fetchMoreData = () => {
        this.setState({
            pageIndex: this.state.pageIndex + 1
        }, () => {
            this.props.onFetchMoreBlogsByPopularity(this.state.pageIndex, this.props.blogsByPopularity)
        })      
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

        let sectionContent = <Spinner isComponent/>;

        if (!this.props.fetchBlogsByPopularityLoading && this.props.blogsByPopularity.length > 0) {
            let blogs = this.props.blogsByPopularity.map((blog, i) => (
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

            sectionContent = 
            <div className={classes.sectionWrapper}>
                <div className={classes.sectionBlogs}>
                    {blogs}
                    { this.props.latestPopularityFetchLength >= 10 ? 
                        <LoadMorePrompt 
                            loadMore={this.fetchMoreData}
                            loading={this.props.fetchMoreBlogsByPopularityLoading}
                        /> : null
                    }
                    {   this.state.pageIndex === 0 && 
                        this.props.blogsByPopularity.length < 10 && 
                        !this.props.fetchBlogsByPopularityLoading ?
                        <MorePostSoon>
                            Working to bring you more posts,
                            please check back later.
                        </MorePostSoon> 
                        : null
                    }
                </div>
                <div className={classes.aside}>
                    <div className={classes.blogPostSideAd}>
                        <div className={classes.adFullSide}/>
                    </div>
                </div>
            </div>
        } else if (!this.props.fetchBlogsByPopularityLoading && this.props.blogsByPopularity.length === 0) {
            sectionContent =
            <MorePostSoon>No blog post for this category yet. Working on it, please check back later.</MorePostSoon>
        }
        return(         
            <section className={classes.popularSection}>
                <div className={classes.topAdBar}>
                    <Container>
                    <div className={classes.blogPostTopAd}>
                        <div className={classes.adFull} />
                        <div className={classes.adMedium} />
                    </div>
                    </Container>
                </div>
                <Container>
                    {sectionContent}
                </Container> 
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} /> 
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        blogsByPopularity: state.blog.blogsByPopularity,
        fetchBlogsByPopularityLoading: state.blog.fetchBlogsByPopularityLoading,
        fetchBlogsByPopularityError: state.blog.fetchBlogsByPopularityError,
        
        recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser,

        fetchMoreBlogsByPopularityLoading: state.blog.fetchMoreBlogsByPopularityLoading,
        latestPopularityFetchLength: state.blog.latestPopularityFetchLength,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
        onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
        
        onFetchBlogsByPopularity: (pageIndex) => dispatch(actions.fetchBlogsByPopularity(pageIndex)),
        onFetchMoreBlogsByPopularity: (pageIndex, blogPosts) => dispatch(actions.fetchMoreBlogsByPopularity(pageIndex, blogPosts)),
        
        onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs)),
        
        onClearBlogSectionMessages: () => dispatch(actions.clearBlogSectionMessages())    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popular);