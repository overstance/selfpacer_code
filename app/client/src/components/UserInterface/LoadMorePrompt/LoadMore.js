import React from 'react';
import classes from './LoadMore.css';
import Spinner from '../Spinner/Spinner';

const loadMore = (props) => ( 
    <div className={classes.LoadMore}>
        <span>Loading More</span><Spinner isLoadMore />
    </div>
);

export default loadMore;