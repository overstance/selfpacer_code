import React from 'react';
import classes from './blogSearch.module.css';
import { Link } from 'react-router-dom';

const searchItem = (props) => {

    return (
        <div className={classes.searchItem}>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                {props.title}
            </Link>
            <div className={classes.searchItemType}><span>{props.category}</span></div>
        </div>
    )
}

export default searchItem;