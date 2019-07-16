import React from 'react';
import { Helmet } from 'react-helmet';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './BlogPost.css';
import Grid from '../../components/UserInterface/Grid/Grid';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BlogPost extends React.Component {
  /* state = {
    data: {}
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await butter.post.retrieve(match.params.post)
    this.setState(resp.data);
  } */
  componentDidMount() {
    this.props.onFetchBlogPost(this.props.match.params.post);
  }

  render () {
    
    const post = this.props.post.data;

    let content = <Spinner isComponent/>
    
    if (!this.props.loading && !this.props.error) {
      content =
      <section>
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.meta_description} />
          <meta name='og:image' content={post.featured_image} />
        </Helmet>
        <h1>{post.title}</h1>
        <div className={classes.PostBody} dangerouslySetInnerHTML={{ __html: post.body }} />
      </section>
    } else if (!this.props.loading && this.props.error) {
      content =
      <section>
        {this.props.error}
      </section>
    }

    return (
      <Grid>
        {content}
      </Grid>
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
    onFetchBlogPost: (slug) => dispatch(actions.fetchBlogPost(slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);