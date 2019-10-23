import React, {Component} from 'react';
import classes from './blogSearch.module.css';
import Backdrop from '../../UserInterface/Backdrop/blogBackdrop';
import Container from '../../UserInterface/Container/Container';
import Spinner from '../../UserInterface/Spinner/Spinner';
import PostActionInfo from '../../PostActionInfo/PostActionInfo';
import * as actions from '../../../store/actions/index';
import SearchItem from './searchItem';
import {connect} from 'react-redux';

class NonBlogSearch extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focusOnSearchResult = React.createRef();
        this.focus = this.focus.bind(this);
    }

    state = {
        searchString: '',
        searchInputTouched: false,
        showChangeSearchString: false
    }

    componentDidMount() {
        this.focus();
        this.setState({ searchString: this.props.latestBlogSearchString });
    }

    componentDidUpdate(prevProps) {
        if(this.props.searchResult !== prevProps.searchResult) {
            this.focusOnSearchResult.current.focus();
        }
    }

    componentWillUnmount() {
        this.setState({ showChangeSearchString: false });
    }

    focus() {
        this.textInput.current.focus();
    }

    searchInputChange = (event) => {
        event.preventDefault();

        this.setState({ searchString: event.target.value, searchInputTouched: true, showChangeSearchString: false });
    }

    deploySearch = (event) => {
        event.preventDefault();

        if (this.state.searchString === '') {
            this.setState({ searchInputTouched: true });
        } else if(this.state.searchString !== '' && !this.props.deployBlogSearchLoading) {
            this.props.onDeployBlogSearch(this.state.searchString);
            this.setState({ showChangeSearchString: true });
        }
    }

    changeSearchString = () => {
        this.focus();
    }

    render() {
        let searchResult;

        if (this.props.deployBlogSearchLoading) {
            searchResult = <Spinner isComponent/>
        }

        if (!this.props.deployBlogSearchLoading && !this.props.deployBlogSearchError) {
            if (this.props.searchResult.length > 0) {
                searchResult = this.props.searchResult.map((result, i) => (
                    <SearchItem 
                        key={i}
                        publishYear={result.publishYear}
                        publishMonth={result.publishMonth}
                        title={result.title}
                        category={result.category}
                        publishDay={result.publishDay}
                        slug={result.slug}
                    />
                ))
            } else if (this.props.searchResult.length === 0 && this.props.deployBlogSearchSuccessInfo) {
                searchResult =
                <div className={classes.noResult}>
                    <h2>No search result found.</h2>
                    <div>Suggestions:</div>
                    <ol>
                        <li> Make sure all words are spelled correctly.</li>
                        <li> Try different keywords.</li>
                        <li> Try more general keywords.</li>
                    </ol>       
                </div>
            }
        }

        if (!this.props.deployBlogSearchLoading && this.props.deployBlogSearchError) {
            searchResult = 
            <PostActionInfo isFailed>
                {this.props.deployBlogSearchError}
            </PostActionInfo>
        }

        return(
            <div>
                <div className={classes.searchBar}>
                    <Container>
                        <div className={classes.searchAndFilter}>
                            <form onSubmit={this.deploySearch}>
                                <div className={classes.input}>
                                    <input 
                                        aria-label="Search"
                                        ref={this.textInput}
                                        value={this.state.searchString}
                                        placeholder='search posts'
                                        onChange={this.searchInputChange}
                                    />
                                </div>
                                {(this.state.searchString === '' && this.state.searchInputTouched) 
                                 || this.props.deployBlogSearchLoading ?
                                    <button aria-label="empty input" className={classes.searchDisabledButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                                        </svg>
                                    </button>
                                    :
                                    <button aria-label="run search" className={classes.searchAllowedButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                                        </svg>
                                    </button>
                                }
                            </form>
                            <button className={classes.closeButton} aria-label="close search" onClick={this.props.closeBlogSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                                </svg>
                            </button>
                        </div>
                    </Container>
                </div>
                <article 
                    className={classes.searchResultContainer}
                    aria-label="search result"
                >   
                    { this.state.showChangeSearchString && !this.state.deploySearchLoading ?
                        <button 
                            className={classes.changeSearchString}
                            ref={this.focusOnSearchResult}
                            onClick={this.changeSearchString}
                        >
                            change search string
                        </button>
                        : null
                    }
                    {searchResult} 
                </article>
                <Backdrop 
                    show={this.props.showBlogSearch}
                    clicked={this.props.closeBlogSearch}
                    keyboarded={this.props.closeBlogSearchByBackdrop}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    deployBlogSearchLoading: state.search.deployBlogSearchLoading,
    deployBlogSearchError: state.search.deployBlogSearchError,
    searchResult: state.search.blogSearchResult,
    latestBlogSearchString: state.search.latestBlogSearchString,
    deployBlogSearchSuccessInfo: state.search.deployBlogSearchSuccessInfo
});

const mapDispatchToProps = dispatch => ({
    onDeployBlogSearch: (searchString) => dispatch(actions.deployBlogSearch(searchString)),
    // onClearSearchMessages: () => dispatch(actions.clearSearchMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(NonBlogSearch);