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
        this.focus = this.focus.bind(this);
    }

    state = {
        searchString: '',
        searchInputTouched: false
    }

    componentDidMount() {
        this.focus();
        this.setState({ searchString: this.props.latestBlogSearchString });
    }

    /* componentWillUnmount() {
        this.props.onClearSearchMessages()
    } */

    focus() {
        this.textInput.current.focus();
    }

    searchInputChange = (event) => {
        event.preventDefault();

        this.setState({ searchString: event.target.value, searchInputTouched: true });
    }

    deploySearch = (event) => {
        event.preventDefault();

        if (this.state.searchString === '') {
            this.setState({ searchInputTouched: true });
        } else if(this.state.searchString !== '' && !this.props.deployBlogSearchLoading) {
            this.props.onDeployBlogSearch(this.state.searchString);
        }
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
                <Backdrop show={this.props.showSearch} clicked={this.props.closeSearch}/>
                <div className={classes.searchBar}>
                    <Container>
                        <div className={classes.close}>
                            <button onClick={this.props.closeSearch}>    
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"/>
                                </svg>
                            </button>
                        </div>
                        <div className={classes.searchAndFilter}>
                            <form onSubmit={this.deploySearch}>
                                <div className={classes.input}>
                                    <input 
                                        ref={this.textInput}
                                        value={this.state.searchString}
                                        placeholder='search posts'
                                        onChange={this.searchInputChange}
                                    />
                                </div>
                                {(this.state.searchString === '' && this.state.searchInputTouched) 
                                 || this.props.deployBlogSearchLoading ?
                                    <button className={classes.searchDisabledButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                                        </svg>
                                    </button>
                                    :
                                    <button className={classes.searchAllowedButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                                        </svg>
                                    </button>
                                }
                            </form>
                        </div>
                    </Container>
                </div>
                <div className={classes.searchResultContainer}>
                    {searchResult} 
                </div>
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