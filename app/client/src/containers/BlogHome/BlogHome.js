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

  componentWillUnmount() {
    this.props.onUnsetIsBlogPage();
    this.props.onClearBlogHomeMessages();
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.props.onSetIsBlogPage()
  }

  render () {
    return (
      <div className={classes.blogHomeWrapper}>
        <div className={classes.topAdBar}>
          <Container>
              <div className={classes.blogPostTopAd}>
                  <div className={classes.adFull} />
                  <div className={classes.adMedium} />
              </div>
          </Container>
        </div>
        <Container>
          <FeaturedBlogs />
          <LatestSection /> 
        </Container>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
    onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
    onClearBlogHomeMessages: () => dispatch(actions.clearBlogHomeMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogHome);