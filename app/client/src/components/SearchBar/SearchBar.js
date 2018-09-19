import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './SearchBar.css';
import searchIcon from '../../assets/images/baseline-search-24px.svg';


const searchBar = () => (
    <Aux>
        <form className={classes.Search}>
            <input type="Search" className={classes.SearchTerm} placeholder="Enter an interest. Go!" />
            <button type="submit" className={classes.SearchButton}>
                <img src={searchIcon} alt='search icon' />
            </button>
        </form>
    </Aux>
);

export default searchBar;