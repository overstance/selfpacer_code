import React from 'react';
import classes from './SearchBar.css';
import searchIcon from '../../assets/images/baseline-search-24px.svg';


const searchBar = () => (
    <form className={classes.Search}>
        <input type="Search" className={classes.SearchTerm} placeholder="Enter an interest. Go!" />
        <button type="submit" className={classes.SearchButton}>
            <img src={searchIcon} alt='search icon' />
        </button>
    </form>
);

export default searchBar;