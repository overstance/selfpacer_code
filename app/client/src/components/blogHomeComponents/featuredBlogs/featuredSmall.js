import React from 'react';
import classes from './featuredBlogs.module.css';
import { Link } from 'react-router-dom';

const featuredSmall = (props) => (
    <article className={classes.featuredSmall}>
        <div className={classes.featuredSmallCategory}>
            <Link to={`/blog/${props.category}`}>
                {props.category}
            </Link>    
        </div>
        <div className={classes.featuredSmallTitle}>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                {props.title}
            </Link>
        </div>  
    </article>
);

export default featuredSmall;