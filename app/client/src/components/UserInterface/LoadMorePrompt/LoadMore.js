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
        props.isLoadMoreOnClick ?
        <div className={classes.LoadMoreOnClick} onClick={props.loadMore}>
            {promptText}
        </div>
        :
        <div className={classes.LoadMore}>
            <span>Loading More</span><Spinner isLoadMore />
        </div>
    )
}

export default loadMore;