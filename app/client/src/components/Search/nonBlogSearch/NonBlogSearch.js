import React, {Component} from 'react';
import classes from './nonBlogSearch.module.css';
import Backdrop from '../../UserInterface/Backdrop/Backdrop';
import Container from '../../UserInterface/Container/Container';
import Spinner from '../../UserInterface/Spinner/Spinner';
import PostActionInfo from '../../PostActionInfo/PostActionInfo';
import SearchFilter from './searchFilter';
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
        showFilter: false,
        searchString: '',
        searchInputTouched: false,
        searchFilter: [],
        showChangeSearchString: false
    }

    componentDidMount() {
        this.focus();
        this.setState({ searchString: this.props.latestSearchString });
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

    toggleSearchFilter = () => {
        this.setState((prevState) => {
            return { 
                showFilter: !prevState.showFilter
            }
        }, () => {
            /* console.log(this.state.searchFilter); */
            if(this.state.showFilter) {
                this.setState({ searchFilter: [] });
            }
        });  
    }

    searchInputChange = (event) => {
        event.preventDefault();

        this.setState({ searchString: event.target.value, searchInputTouched: true, showChangeSearchString: false });
    }

    deploySearch = (event) => {
        event.preventDefault();

        if (this.state.searchString === '') {
            this.setState({ searchInputTouched: true });
        } else if(this.state.searchString !== '' && !this.props.deploySearchLoading) {
            this.props.onDeploySearch(this.state.searchString, this.state.searchFilter);
            this.setState({ showFilter: false, showChangeSearchString: true });
        }
    }

    filterChanged = (event) => {
        let newFilterValue = event.target.value;
        let searchFilter = this.state.searchFilter;

        let checkForValue = searchFilter.find(filterValue => filterValue === newFilterValue); 
        if(checkForValue) {
            let updatedFilter = searchFilter.filter(filterValue => filterValue !== newFilterValue);  
            this.setState({ searchFilter: updatedFilter});
        } else {
            let updatedFilter = this.state.searchFilter;
            updatedFilter.push(event.target.value);
            this.setState({ searchFilter: updatedFilter})  
        }
    }

    changeSearchString = () => {
        this.focus();
    }

    /* componentWillUnmount() {
        this.onNonBlogSearchUnmount();
    } */

    render() {
        let searchResult;

        if (this.props.deploySearchLoading) {
            searchResult = <Spinner isComponent/>
        }

        if (!this.props.deploySearchLoading && !this.props.deploySearchError) {
            if (this.props.searchResult.length > 0) {
                searchResult = this.props.searchResult.map((result, i) => (
                    <SearchItem 
                        key={i}
                        id={result._id}
                        resource_id={result._id}
                        curriculum={result.curriculum}
                        paths={result.paths}
                        subject_title={result.title}
                        resource_title={result.title}
                        resource_category={result.category}
                        collection_title={result.title}
                        type={result.type}
                        source={result.source}
                        description={result.description}
                        resources={result.resources}
                    />
                ))
            } else if (this.props.searchResult.length === 0 && this.props.deploySearchSuccessInfo) {
                searchResult =
                <div 
                    className={classes.noResult}
                >
                    <h2>No search result found.</h2>
                    <div>Suggestions:</div>
                    <ol>
                        <li> Make sure all words are spelled correctly.</li>
                        <li> Use one or more filter option to increase or limit search scope.</li>
                        <li> Try different keywords.</li>
                        <li> Try more general keywords.</li>
                    </ol>       
                </div>
            }
        }

        if (!this.props.deploySearchLoading && this.props.deploySearchError) {
            searchResult = 
            <PostActionInfo isFailed>
                {this.props.deploySearchError}
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
                                        placeholder='search resources'
                                        onChange={this.searchInputChange}
                                    />
                                </div>
                                {(this.state.searchString === '' && this.state.searchInputTouched) 
                                 || this.props.deploySearchLoading ?
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
                            <button onClick={this.toggleSearchFilter} tabIndex="-1" className={classes.filterButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"/>
                                </svg>
                            </button>
                            <button className={classes.closeButton} aria-label="close search" onClick={this.props.closeSearch}>
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
                    { this.state.searchFilter.length > 0
                      && this.props.deploySearchSuccessInfo ?
                        <div className={classes.filterInfo}>
                            <span>filtered by:</span>{this.state.searchFilter.join(', ')}
                        </div>
                        : null
                    }
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
                { this.state.showFilter ? 
                    <div className={classes.filterContainer}>
                        <div className={classes.filter}>      
                            <SearchFilter filterChanged={this.filterChanged}/> 
                        </div>  
                    </div>
                    : null
                }
                <Backdrop 
                    show={this.props.showSearch}
                    clicked={this.props.closeSearch}
                    keyboarded={this.props.closeSearchByBackdrop}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    deploySearchLoading: state.search.deploySearchLoading,
    deploySearchError: state.search.deploySearchError,
    searchResult: state.search.searchResult,
    latestSearchString: state.search.latestSearchString,
    deploySearchSuccessInfo: state.search.deploySearchSuccessInfo
});

const mapDispatchToProps = dispatch => ({
    onDeploySearch: (searchString, searchFilter) => dispatch(actions.deploySearch(searchString, searchFilter)),
    // onClearSearchMessages: () => dispatch(actions.clearSearchMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(NonBlogSearch);