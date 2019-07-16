import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import butter from './butter-client';
import Grid from '../../components/UserInterface/Grid/Grid';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BlogHome extends Component {
  /* state = {
    meta: {},
    data: []
  }
  async componentDidMount () {
    const { match } = this.props
    let page = match.params.page || 1

    const resp = await butter.post.list({ page: page, page_size: 10 })
    this.setState(resp.data);
  } */

  componentDidMount() {
    this.props.onFetchBlogPosts();
  }

  render () {
    // const { next_page, previous_page } = this.state.meta
    let posts = <Spinner isComponent/>

    if (!this.props.loading && !this.props.error) {
      posts =
      <section>
        {this.props.blogs.data.map((post, key) => {
          return (
            <div key={key}>
              <Link to={`/blog/posts/${post.slug}`}>{post.title}</Link>
            </div>
          )
        })}
      </section>
    } else if (!this.props.loading && this.props.error) {
      posts =
      <section>
        {this.props.error}
      </section>
    }

    return (
      <Grid>
        {posts}
      </Grid>
    )
  }
};

const mapStateToProps = state => {
  return {
    blogs: state.blog.blogPosts,
    loading: state.blog.fetchBlogPostsLoading,
    error: state.blog.fetchBlogPostsError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBlogPosts: () => dispatch(actions.fetchBlogPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogHome);