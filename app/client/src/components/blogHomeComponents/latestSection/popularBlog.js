import React from 'react';
import classes from './latestSection.module.css';
import { Link } from 'react-router-dom';

const popularBlog = (props) => (
    <article className={classes.popularBlog}>
        <div className={classes.popularBlogTitle}>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                onClick={props.postClicked}
            >
                <span>{props.serialNumber + '.'}</span>
                <div>{props.title}</div>
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