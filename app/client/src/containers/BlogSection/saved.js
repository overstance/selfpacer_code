import React, {Component} from 'react';
import classes from './blogSection.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BlogItem from '../../components/blogItem/blogItem';
// import MorePostSoon from '../../components/morePostSoon/morePostSoon';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Container from '../../components/UserInterface/Container/Container';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
// import LoadMorePrompt from '../../components/UserInterface/LoadMorePrompt/blogLoadMore';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';

class Popular extends Component {

    state = {
        pageIndex: 0
    }

    componentDidMount() {
        this.props.onFetchFeaturedBlogs();
        this.props.onSetIsBlogPage();
        this.props.onFetchUserBlogSaves(this.props.match.params.userId);
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

    removedSavedBlog = (blogId) => {
        this.props.onRemoveSavedBlog(blogId, this.props.userId, this.props.blogSavesId, this.props.userBlogSaves);
    }

    render() {

        let sectionContent = <Spinner isComponent/>;

        if (!this.props.fetchUserBlogSavesLoading && this.props.userBlogSaves.length > 0) {
            let blogs = this.props.userBlogSaves.map((blog, i) => (
                <BlogItem 
                    isSaved
                    blogId={blog._id}
                    blogBeenUnsaved={this.props.blogBeenUnsaved}
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
                    removeSaved={() => this.removedSavedBlog(blog._id)}
                />
            ))

            sectionContent = 
            <div className={classes.sectionWrapper}>
                <div className={classes.sectionBlogs}>
                    {blogs}
                    {/*  this.props.latestPopularityFetchLength >= 10 ? 
                        <LoadMorePrompt 
                            loadMore={this.fetchMoreData}
                            loading={this.props.fetchMoreBlogsByPopularityLoading}
                        /> : null
                     */}
                    {  /*  this.state.pageIndex === 0 && 
                        this.props.blogsByPopularity.length < 10 && 
                        !this.props.fetchUserBlogSavesLoading ?
                        <MorePostSoon>
                            Working to bring you more posts,
                            please check back later.
                        </MorePostSoon> 
                        : null
                     */}
                </div>
                <div className={classes.aside}>
                    <div className={classes.blogPostSideAd}>
                        <div className={classes.adFullSide}/>
                    </div>
                </div>
            </div>
        } else if (!this.props.fetchUserBlogSavesLoading && this.props.userBlogSaves.length === 0) {
            sectionContent =
            <PostActionInfo isSuccess>You have no saved blogs</PostActionInfo>
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
        userId: state.auth.user._id,
        blogSavesId: state.auth.user.blogSaves,
        userBlogSaves: state.blog.userBlogSaves,
        fetchUserBlogSavesLoading: state.blog.fetchUserBlogSavesLoading,
        fetchUserBlogSavesError: state.blog.fetchUserBlogSavesError,
        blogBeenUnsaved: state.blog.blogBeenUnsaved,
        recentlyViewedBlogsByUser: state.blog.recentlyViewedBlogsByUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
        onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
        onFetchFeaturedBlogs: () => dispatch(actions.fetchFeaturedBlogs()),
        onFetchUserBlogSaves: (userId) => dispatch(actions.fetchUserBlogSaves(userId)),
        
        onRemoveSavedBlog: (blogId, userId, blogSavesId, userBlogSaves) => dispatch(actions.removeSavedBlog(blogId, userId, blogSavesId, userBlogSaves)),

        onIncreaseBlogPostView: (postId, updatedViews, updatedRecentlyViewedBlogs) => dispatch(actions.increaseBlogPostView(postId, updatedViews, updatedRecentlyViewedBlogs)),
        
        onClearBlogSectionMessages: () => dispatch(actions.clearBlogSectionMessages())    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popular);