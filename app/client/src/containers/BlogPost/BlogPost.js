import React from 'react';
import { Helmet } from 'react-helmet';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './BlogPost.module.css';
// import Grid from '../../components/UserInterface/Grid/Grid';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ReactDOM from 'react-dom';

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.postBody = React.createRef();
  }
  /* state = {
    data: {}
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.post.retrieve(match.params.post)
    this.setState(resp.data);
  } */
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

  componentDidUpdate() {
    if (this.props.post.htmlContent) {
      const PostBody = ReactDOM.findDOMNode(this.postBody.current);
      let youtubeElementByClass = PostBody.getElementsByClassName('youtubeVideoEmbed');
      // let youtubeElement = PostBody.getElementById('#h6fcK_fRYaI');
      console.log(youtubeElementByClass);
    }
    
  }

  render () {
    
    const post = this.props.post;

    let content = <Spinner isComponent/>
    
    if (!this.props.loading && !this.props.error) {
      content =
      <section>
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.description} />
          <meta name='og:image' content={/* post.featured_image */null} />
        </Helmet>
        <div className={classes.Header}>
          <div className={classes.heroImage}>
            <figure>    
              <img src={post.featuredImage.url} alt='hero'/>
              { post.featuredImage.source ? 
                <figcaption>{post.featuredImage.source}</figcaption>
                : null
              }
            </figure>
          </div>
          <div className={classes.postInfo}>
            <div className={classes.postTitle}>
              <h1>{post.title}</h1>
            </div>
          </div>
        </div>
        <div ref={this.postBody} className={classes.PostBody} dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
      </section>
    } else if (!this.props.loading && this.props.error) {
      content =
      <section>
        {this.props.error}
      </section>
    }

    return (content)
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