import React from 'react';
import { Helmet } from 'react-helmet';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './BlogPost.module.css';
// import Grid from '../../components/UserInterface/Grid/Grid';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import YoutubeVideoEmbed from '../../components/BlogEditor/entities/Youtube';
import Container from '../../components/UserInterface/Container/Container';
import PortalContainer from './PortalContainer';
import ShareButtons from './ShareButtons';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import MoreInCategory from './moreInCategory/MoreInCategory';
import LatestSection from './latestSection/LatestSection';
import Comments from '../../components/blogComment/Comments';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
// import Button from '../../components/UserInterface/Button/Button';
// import Input from '../../components/UserInterface/Input/Input';

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.postBody = React.createRef();
  }

  state = {
    youtubeEmbeds: [],
    twitterEmbeds: [],
    allPostParagraphs: [],
    showCommentSection: false,
    blogAlreadySaved: false
  }

  /* UNSAFE_componentWillMount() {
    this.props.onSetIsBlogPage()
  } */

  componentWillUnmount() {
    this.props.onUnsetIsBlogPage();
    this.props.onClearBlogPostMessages();

    window.removeEventListener('scroll', this.handleScroll, false);
    // this.props.onClearBlogToReply();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    window.scroll(0, 0);

    this.props.onSetIsBlogPage();
    this.props.onFetchBlogPost(
      this.props.match.params.publishYear, 
      this.props.match.params.publishMonth,
      this.props.match.params.publishDay,
      this.props.match.params.slug
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.post.htmlContent && this.props.post.htmlContent !== prevProps.post.htmlContent ) {
     
      const PostBody = this.postBody.current;
      let youtubeElementsByClass = PostBody.getElementsByClassName('youtubeVideoEmbed');
      let twitterElementsByClass = PostBody.getElementsByClassName('twitterEmbed');
      let allParagraphElements = PostBody.getElementsByTagName('p');

      this.props.onFetchBlogComments(this.props.post._id);
      this.setState({ youtubeEmbeds: youtubeElementsByClass, twitterEmbeds: twitterElementsByClass, allPostParagraphs: allParagraphElements });
    }

  }

  showCommentSection = () => {
    this.setState({ showCommentSection: true });
  }

  closeCommentSection = () => {
    this.setState({ showCommentSection: false });
  }

  unpublishPost = () => {
    this.props.onUnpublishPost(this.props.post._id);
  }

  saveBlog = () => {

    let currentBlog = this.props.userSavedBlogs.find( blog => blog === this.props.post._id);
      // console.log(currentBlog);
    if (currentBlog) {
      this.setState({ blogAlreadySaved: true });
    } else {
        this.props.onSaveBlog(this.props.userId, this.props.post._id, this.props.userSavedBlogs);  
    }
  }

  render () {
    
    const post = this.props.post;

    let blogContent = <Spinner isComponent/>;
    let embedYoutube = [];
    let embedTweet = [];

    if (this.state.youtubeEmbeds.length !== 0) {

      for (var i = 0; i < this.state.youtubeEmbeds.length; i++) {
                 
        let videoId = this.state.youtubeEmbeds[i].id;

        let youtube = 
        <PortalContainer id={videoId} key={videoId}>
          <YoutubeVideoEmbed youtubeVideoId={videoId} />
        </PortalContainer>

        embedYoutube.push(youtube);
      }
    }

    if (this.state.twitterEmbeds.length !== 0) {

      for (var index = 0; index < this.state.twitterEmbeds.length; index++) {
                 
        let tweetId = this.state.twitterEmbeds[index].id;

        let tweet = 
        <PortalContainer id={tweetId} key={tweetId}>
          <TwitterTweetEmbed
            tweetId={tweetId}
          />
        </PortalContainer>

        embedTweet.push(tweet);
      }
    }

    if (this.state.allPostParagraphs.length !==  0) {
      let firstParagraph = this.state.allPostParagraphs[0];
      // console.log(this.state.allPostParagraphs, firstParagraph)
      firstParagraph.classList.add('dropcap');
    }
    
    if (!this.props.loading && !this.props.error) {
      
      let postUrl = window.location.href;
      let postTitle = post.title;
      // console.log(this.props.location.pathname, window.location.href);

      let currentTime = new Date();
      let publishDate = new Date(post.publishedOn);
      let displayTime;

      let isSameDay = sameDay(currentTime, publishDate);

      if (isSameDay) {
        displayTime = formatAMPM(publishDate);
        // displayTime = publishDate.toLocaleTimeString();
      }

      // console.log(currentTime, publishDate, isSameDay, displayTime);
      let twitter = 'https://twitter.com/'
      let twitterHandle = post.authorTwitter;

      let authorTwitter = twitter.concat(twitterHandle);
      // console.log(authorTwitter);

      let mainCommentCount = this.props.comments.length;
      let repliesCount = this.props.replies.length;
      let totalCommentCount = mainCommentCount + repliesCount;

      let unpublishButtonText = 'unpublish';

      if (this.props.unpublishPostLoading) {
        unpublishButtonText = 'unpublishing...';
      }

      let currentBlogIfSaved = this.props.userSavedBlogs.find( blog => blog === this.props.post._id);
      
      blogContent =
      <React.Fragment>
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.description} />
          <meta name='og:image' content={/* post.featured_image */null} />
        </Helmet>
        <div className={classes.headerWrapper}>
          <div className={classes.header}> 
            { this.props.user.isEditor && 
              (this.props.user.accountType === 'Administrator' ||
              this.props.user.accountType === 'Senior Administrator' || 
              this.props.user.accountType === 'Head Administrator'
              ) && this.props.unpublishPostSuccessMessage === null ?
              <div className={classes.unpublishButton}>
                  {this.props.unpublishPostSuccessMessage ? 
                    <span>{this.props.unpublishPostSuccessMessage}</span> 
                    : null
                  }
                  { this.props.unpublishPostError ? 
                    <span className={classes.unpublishError}>{this.props.unpublishPostError}</span> 
                    : null
                  }
                <button onClick={this.unpublishPost}> {unpublishButtonText} </button>
              </div>
              : null
            }
            <div className={classes.category}>
              <Link to={`/blog/${post.category}`}>
                  {post.category}
              </Link>
            </div>
            <div className={classes.postTitle}>
              {post.title}
            </div>
            <div className={classes.description}>
              {post.description}
            </div>
            <div className={classes.postAttributes}>
              <div className={classes.editorial}>
                <span className={classes.author}>
                  By
                  <Link to={`/blog/author/${post.authorName}/${post.author}`}>
                    {post.authorName}
                  </Link>
                </span>
                <span className={classes.authorTwitter}>
                  <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={authorTwitter}
                  >
                    {post.authorTwitter}
                  </a>
                </span>
                <span className={classes.publishDate}>
                  {post.displayDate}     
                  { isSameDay ? 
                    <span>
                      <strong>.</strong>{displayTime + ' EDT'}
                    </span> 
                    : null
                  }
                </span>
              </div>
              <div className={classes.topShareSection}>          
                <ShareButtons 
                postUrl={postUrl}
                postTitle={postTitle}
                iconSize={34}
                />
              </div>
            </div >
          </div>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.pageMain}>
            <div className={classes.heroImage}>
              <figure> 
                <div>
                  <img src={post.featuredImage.url} alt='hero'/>
                </div>
                { post.featuredImage.source ? 
                  <figcaption>{post.featuredImage.source}</figcaption>
                  : null
                }
              </figure>
            </div>
            <div ref={this.postBody} className={classes.PostBody} dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          </div>
          <div className={classes.aside}>
            <MoreInCategory category={post.category}/>
            <div className={classes.blogPostSideAd}>
              <div className={classes.adFullSide}/>
            </div>
          </div>
        </div>
        <div className={classes.blogInteraction}>
          <div className={classes.bottomShareSection}>
            <ShareButtons 
            postUrl={postUrl}
            postTitle={postTitle}
            iconSize={48}
            />
          </div>
          <div className={classes.commentOrSave}>   
            {
              totalCommentCount !== 0 ?
              <div className={classes.addOrViewComment} onClick={this.showCommentSection}>view comments<span>{' (' + totalCommentCount + ')'}</span></div>
              :
              <div className={classes.addOrViewComment} onClick={this.showCommentSection}>add comments</div>
            }
            { !this.props.isAuthenticated || this.state.blogAlreadySaved || currentBlogIfSaved ?
              null :
              <div className={classes.saveBlog} onClick={this.saveBlog}>
                <span>save</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"/>
                </svg>
              </div>
            }
          </div>
          <div className={classes.shareActionStatus}>
            {
              this.props.saveBlogLoading &&
              !this.props.saveBlogError && 
              !this.props.saveBlogSuccessMessage ?
              <div>Saving ...</div>
              : null
            }
            {
              !this.props.saveBlogLoading &&
              this.props.saveBlogSuccessMessage ?
              <div>{this.props.saveBlogSuccessMessage}</div>
              : null
            }
            {
              !this.props.saveBlogLoading &&
              this.props.saveBlogError ?
              <span>{this.props.saveBlogError}</span>
              : null
            }
            {
              this.state.blogAlreadySaved ?
              <div>Blog already saved</div>
              : null
            }
          </div>
        </div>
        { this.state.showCommentSection ?
          < Comments 
            closeCommentsClicked={this.closeCommentSection}
            blogId={post._id}
            blogTitle={post.title}
            showComments={this.state.showCommentSection}
          />
          : null
        } 
      </React.Fragment>

    } else if (!this.props.loading && this.props.error) {
      blogContent =
      <div>
        {this.props.error}
      </div>
    }

    return (  
      <section>
        <div className={classes.topAdBar}>
          <Container>
            <div className={classes.blogPostTopAd}>
                <div className={classes.adFull} />
                <div className={classes.adMedium} />
            </div>
          </Container>
        </div>
        <Container>
          {blogContent}
          {embedYoutube}
          {embedTweet}
          <LatestSection />
        </Container> 
        <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} /> 
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { 
    user: state.auth.user,
    userId: state.auth.user._id,
    userSavedBlogs: state.blog.userSavedBlogs,
    isAuthenticated: state.auth.isAuthenticated,

    post: state.blog.blogPost,
    loading: state.blog.fetchBlogPostLoading,
    error: state.blog.fetchBlogPostError,

    comments: state.blog.mainComments,
    replies: state.blog.replies,

    saveBlogLoading: state.blog.saveBlogLoading,
    saveBlogError: state.blog.saveBlogError,
    saveBlogSuccessMessage: state.blog.saveBlogSuccessMessage,

    unpublishPostLoading: state.blog.unpublishPostLoading,
    unpublishPostError: state.blog.unpublishPostError,
    unpublishPostSuccessMessage: state.blog.unpublishPostSuccessMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveBlog: (userId, blogId, userSavedBlogs) => dispatch(actions.saveBlog(userId, blogId, userSavedBlogs)),
    onUnpublishPost: (postId) => dispatch(actions.unpublishPost(postId)),
    onFetchBlogComments: (blogId) => dispatch(actions.fetchBlogComments(blogId)),
    onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
    onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
    onFetchBlogPost: (year, month, day, slug) => dispatch(actions.fetchBlogPost(year, month, day, slug)),
    onClearBlogPostMessages: () => dispatch(actions.clearBlogPostMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);