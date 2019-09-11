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
    allPostParagraphs: []
  }

  /* UNSAFE_componentWillMount() {
    this.props.onSetIsBlogPage()
  } */

  componentWillUnmount() {
    this.props.onUnsetIsBlogPage()
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

      
      this.setState({ youtubeEmbeds: youtubeElementsByClass, twitterEmbeds: twitterElementsByClass, allPostParagraphs: allParagraphElements });
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
      }

      // console.log(currentTime, publishDate, isSameDay, displayTime);
      let twitter = 'https://twitter.com/'
      let twitterHandle = post.authorTwitter;

      let authorTwitter = twitter.concat(twitterHandle);
      // console.log(authorTwitter);
      
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
    error: state.blog.fetchBlogPostError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
    onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
    onFetchBlogPost: (year, month, day, slug) => dispatch(actions.fetchBlogPost(year, month, day, slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);