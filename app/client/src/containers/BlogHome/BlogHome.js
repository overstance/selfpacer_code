import React, { Component } from 'react';
import classes from './blogHome.module.css';
// import { Link } from 'react-router-dom';
// import butter from './butter-client';
import Container from '../../components/UserInterface/Container/Container';
// import Grid from '../../components/UserInterface/Grid/Grid';
// import Spinner from '../../components/UserInterface/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import FeaturedBlogs from '../../components/blogHomeComponents/featuredBlogs/FeaturedBlogs';
import LatestSection from '../../components/blogHomeComponents/latestSection/LatestSection';

class BlogHome extends Component {
  UNSAFE_componentWillMount() {
    this.props.onSetIsBlogPage()
  }

  componentWillUnmount() {
    this.props.onUnsetIsBlogPage()
  }

  /* componentDidMount() {
    this.props.onFetchBlogPosts();
  } */

  render () {
    return (
      <Container>
        <div className={classes.blogHomeWrapper}>
          <FeaturedBlogs />
          <LatestSection />
        </div>
      </Container>
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
    onFetchBlogPosts: () => dispatch(actions.fetchBlogPosts()),
    onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
    onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogHome);