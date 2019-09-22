import React, {Component} from 'react';
import classes from './blogSection.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import BlogItem from './blogItem';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Container from '../../components/UserInterface/Container/Container';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import LatestSection from '../BlogPost/latestSection/LatestSection';

class BlogSection extends Component {

    componentDidMount() {
        this.props.onSetIsBlogPage();

        this.props.onFetchBlogsBySection(this.props.match.params.category);
        window.addEventListener('scroll', this.handleScroll, false);
        window.scroll(0, 0);
    }

    componentWillUnmount() {
        this.props.onUnsetIsBlogPage();
        this.props.onClearBlogSectionMessages();
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    render() {

        let sectionContent = <Spinner isComponent/>;

        if (!this.props.fetchBlogsBySectionLoading && this.props.blogsBySection.length > 0) {
            let blogs = this.props.blogsBySection.map((blog, i) => (
                <BlogItem 
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
                />
            ))

            sectionContent = 
            <div className={classes.sectionWrapper}>
                <div className={classes.sectionBlogs}>
                    {blogs}
                </div>
                <div className={classes.aside}>
                    <div className={classes.blogPostSideAd}>
                        <div className={classes.adFullSide}/>
                    </div>
                </div>
            </div>
        }
        return(         
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
                    {sectionContent}
                    <LatestSection />
                </Container> 
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} /> 
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        blogsBySection: state.blog.blogsBySection,
        fetchBlogsBySectionLoading: state.blog.fetchBlogsBySectionLoading,
        fetchBlogsBySectionError: state.blog.fetchBlogsBySectionError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetIsBlogPage: () => dispatch(actions.setIsBlogPage()),
        onUnsetIsBlogPage: () => dispatch(actions.unsetIsBlogPage()),
        onFetchBlogsBySection: (category) => dispatch(actions.fetchBlogsBySection(category)),
        onClearBlogSectionMessages: () => dispatch(actions.clearBlogSectionMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogSection);