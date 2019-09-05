import React from 'react';
import { Helmet } from 'react-helmet';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './BlogPost.module.css';
// import Grid from '../../components/UserInterface/Grid/Grid';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
// import ReactDOM from 'react-dom';
import YoutubeVideoEmbed from '../../components/BlogEditor/entities/Youtube';
import Container from '../../components/UserInterface/Container/Container';
import PortalContainer from './PortalContainer';

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.postBody = React.createRef();
  }

  state = {
    youtubeEmbeds: []
  }

  UNSAFE_componentWillMount() {
    this.props.onSetIsBlogPage()
  }

  componentWillUnmount() {
    this.props.onUnsetIsBlogPage()
  }

  componentDidMount() {
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
      let youtubeElementByClass = PostBody.getElementsByClassName('youtubeVideoEmbed');

      
      this.setState({ youtubeEmbeds: youtubeElementByClass });
    }
    
  }

  render () {
    
    const post = this.props.post;

    let blogContent = <Spinner isComponent/>;
    let embedYoutube = [];

    if (this.state.youtubeEmbeds.length !== 0) {

      for (var i = 0; i < this.state.youtubeEmbeds.length; i++) {
                 
        let videoId = this.state.youtubeEmbeds[i].id;

        let youtube = 
        <PortalContainer id={videoId} key={i}>
          <YoutubeVideoEmbed youtubeVideoId={videoId} />
        </PortalContainer>

        embedYoutube.push(youtube);
      }
    }
    
    if (!this.props.loading && !this.props.error) {
      blogContent =
      <React.Fragment>
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.description} />
          <meta name='og:image' content={/* post.featured_image */null} />
        </Helmet>
        <div className={classes.Header}> 
          <div className={classes.postInfo}>
            <div className={classes.postTitle}>
              <h1>{post.title}</h1>
            </div>
          </div>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.pageMain}>
            <div className={classes.heroImage}>
              <figure>    
                <img src={post.featuredImage.url} alt='hero'/>
                { post.featuredImage.source ? 
                  <figcaption>{post.featuredImage.source}</figcaption>
                  : null
                }
              </figure>
            </div>
            <div ref={this.postBody} className={classes.PostBody} dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          </div>
          <div className={classes.aside}></div>
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