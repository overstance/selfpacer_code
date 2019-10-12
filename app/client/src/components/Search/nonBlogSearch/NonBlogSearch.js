import React, {Component} from 'react';
import classes from './nonBlogSearch.module.css';
import Backdrop from '../../UserInterface/Backdrop/Backdrop';
import Container from '../../UserInterface/Container/Container';
// import Button from '../../UserInterface/Button/Button';
// import * as action from '../../../store/actions/index';
// import {connect} from 'react-redux';

class NonBlogSearch extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focus = this.focus.bind(this);
    }

    state = {
        showFilter: false,
        searchString: '',
        searchInputTouched: false
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.textInput.current.focus();
    }

    showSearchFilter = () => {
        this.setState((prevState) => {
            return { 
                showFilter: !prevState.showFilter
            }
        })
    }

    searchInputChange = (event) => {
        event.preventDefault();

        this.setState({ searchString: event.target.value, searchInputTouched: true });
    }

    performSearch = (event) => {
        event.preventDefault();

        if (this.state.searchString === '') {
            this.setState({ searchInputTouched: true });
        }
    }

    /* componentWillUnmount() {
        this.onNonBlogSearchUnmount();
    } */

    render() {
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
                            <form onSubmit={this.performSearch}>
                                <div className={classes.input}>
                                    <input 
                                        ref={this.textInput}
                                        value={this.state.searchString}
                                        placeholder='search resouces'
                                        onChange={this.searchInputChange}
                                    />
                                </div>
                                {this.state.searchString === '' && this.state.searchInputTouched ?
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
                            <button onClick={this.showSearchFilter} className={classes.filterButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"/>
                                </svg>
                            </button>
                        </div>
                    </Container>
                </div>
                <div className={classes.searchResultContainer}>
                    <div className={classes.search}>
                        <div>Search Component </div>
                    </div> 
                </div>
                { this.state.showFilter ? 
                    <div className={classes.filterContainer}>
                        <div className={classes.filter}>      
                            filter 
                        </div>  
                    </div>
                    : null
                }
            </div>
        )
    }
}

/* const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    
}) */

export default NonBlogSearch;