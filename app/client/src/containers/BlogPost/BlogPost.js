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
    showCommentSection: false
  }

  /* UNSAFE_componentWillMount() {
    this.props.onSetIsBlogPage()
  } */

  componentWillUnmount() {
    this.props.onUnsetIsBlogPage();
    // this.props.onClearBlogToReply();
  }

  componentDidMount() {
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

    /* if (this.props.commentToReply !== prevProps.commentToReply) {
      this.setState({ commentToReply: this.props.commentToReply, isReplyingComment: true });
    } */
    
  }

  /* checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
  }

  captureCommentText = (event) => {
    const updated = {
        ...this.state.commentText,
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.commentText.validation),
        touched: true
    }
    this.setState({ commentText: updated, commentFillError: null});   
  }

  postComment = (event) => {
    event.preventDefault();

    if (!this.state.commentText.touched || this.state.commentText.value === '') {
        const updated = {
            ...this.state.commentText,
            touched: true,
            valid: false
        }

        this.setState({ fillError: 'comment box empty', commentText: updated });
    } else {
      if (this.state.isReplyingComment) {
        this.props.onPostUserCommentReply(this.state.commentToReply.id, this.props.userId, this.props.userName, this.props.post._id, this.state.commentText.value, this.props.replies);
        const updated = {
          ...this.state.commentText,
          value: '',
          touched: false
        }
        this.setState({ commentText: updated, isReplyingComment: false });
      } else {
        this.props.onPostUserComment(this.props.userId, this.props.userName, this.props.post._id, this.state.commentText.value, this.props.comments);
        const updated = {
          ...this.state.commentText,
          value: '',
          touched: false
        }
        this.setState({ commentText: updated});
      }
    }   
  }; */

  showCommentSection = () => {
    this.setState({ showCommentSection: true });
  }

  closeCommentSection = () => {
    this.setState({ showCommentSection: false });
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
      }

      // console.log(currentTime, publishDate, isSameDay, displayTime);
      let twitter = 'https://twitter.com/'
      let twitterHandle = post.authorTwitter;

      let authorTwitter = twitter.concat(twitterHandle);
      // console.log(authorTwitter);

      let mainCommentCount = this.props.comments.length;
      let repliesCount = this.props.replies.length;
      let totalCommentCount = mainCommentCount + repliesCount;

      /* let formButtonText = 'Post';
      if(this.props.postCommentLoading) {
          formButtonText = <Spinner isButton/>;
      } */
      
      blogContent =
      <React.Fragment>
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.description} />
          <meta name='og:image' content={/* post.featured_image */null} />
        </Helmet>
        <div className={classes.headerWrapper}>
          <div className={classes.header}> 
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
            <div className={classes.saveBlog}>
              <span>save</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"/>
              </svg>
            </div>
            {
              totalCommentCount !== 0 ?
              <div className={classes.addOrViewComment} onClick={this.showCommentSection}>view comments<span>{'( ' + totalCommentCount + ' )'}</span></div>
              :
              <div className={classes.addOrViewComment} onClick={this.showCommentSection}>add comments</div>
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
      <article>
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
      </article>
    )
  }
}

const mapStateToProps = state => {
  return {
    post: state.blog.blogPost,
    loading: state.blog.fetchBlogPostLoading,
    error: state.blog.fetchBlogPostError,

    comments: state.blog.mainComments,
    replies: state.blog.replies,

    /* userId: state.auth.user._id,
    userName: state.auth.user.name,
    isAuthenticated: state.auth.isAuthenticated,

    postCommentLoading: false,
    postCommentError: null,
    postCommentSuccessMessage: null */
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBlogComments: (blogId) => dispatch(actions.fetchBlogComments(blogId)),
    onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
    onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
    onFetchBlogPost: (year, month, day, slug) => dispatch(actions.fetchBlogPost(year, month, day, slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);