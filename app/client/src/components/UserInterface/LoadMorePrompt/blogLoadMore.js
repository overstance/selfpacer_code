import React from 'react';
import classes from './LoadMore.module.css';
import Spinner from '../Spinner/Spinner';

const loadMore = (props) => {

    let promptText = 'Load More';

    if(props.loading) {
        promptText =
        <Spinner isLoadMore />

    }

    return(
        <div className={classes.BlogLoadMore} onClick={props.loadMore}>
           {promptText}
        </div>
    )
};

export default loadMore;