import React from 'react';
import classes from './latestSection.module.css';
import { Link } from 'react-router-dom';

const popularBlog = (props) => (
    <article className={classes.popularBlog}>
        <div className={classes.popularBlogTitle}>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                <span>{props.serialNumber}</span>
                {props.title}
            </Link>
        </div>
        <div className={classes.popularBlogCategory}>
            <Link to={`/blog/${props.category}`}>
                {props.category}
            </Link>    
        </div>     
    </article>
);

export default popularBlog;