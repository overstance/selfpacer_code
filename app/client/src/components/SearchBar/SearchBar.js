import React from 'react';
import classes from './SearchBar.module.css';
//import searchIcon from '../../assets/images/baseline-search-24px.svg';


/*const searchBar = () => (
    <form className={classes.Search}>
        <input type="Search" className={classes.SearchTerm} placeholder="Enter an interest. Go!" />
        <button type="submit" className={classes.SearchButton}>
            <img src={searchIcon} alt='search icon' />
        </button>
    </form>
);*/

const searchBar = (props) => (
    props.show ?
            <div className={classes.SearchWrapper}> 
                <div className={classes.SearchIcon}></div>
                <form className={classes.SearchForm}>
                    <input placeholder='search' className={classes.SearchInput} />
                    <button className={classes.SearchButton} >GO</button>
                </form>
            </div>
        :
        null
);


/*<form role="search">
    <div class="search-control">
        <input type="search" id="site-search" name="q"
               placeholder="Search the site..."
               aria-label="Search through site content">
        <button>Search</button>
    </div>
</form>

     <img src={searchIcon} alt='search icon' />
            </button>

      <div >
            <form role="search">
                <div className={classes.Wrapper}>
                    <input type="search"
                        className={classes.Search}
                        placeholder="Enter a skill. Go!"
                        aria-label="Search through site content"
                    />
                    <button type="submit" className={classes.Submit} />
                </div>
            </form>
        </div>
*/

export default searchBar;