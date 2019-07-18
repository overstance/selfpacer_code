import React from 'react';
import classes from './SearchbarToggle.module.css';
import searchIcon from '../../../assets/images/baseline-search-24px.svg';

const searchbarToggle = (props) => (
    <div className={classes.SearchbarToggle} onClick={props.clicked}>
        <img src={searchIcon} alt='search icon' />
    </div>
);

export default searchbarToggle;