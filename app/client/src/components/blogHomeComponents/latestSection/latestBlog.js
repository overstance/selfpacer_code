import React from 'react';
import classes from './latestSection.module.css';
import { Link } from 'react-router-dom';

const latestBlog = (props) => (
    <article className={classes.latestBlog}>
        <div className={classes.latestBlogImage}>
            <figure>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    <img src={props.featureImageUrl} alt='featured blog' />
                </Link>
                { props.source ? <figcaption>{props.source}</figcaption> : null}
            </figure>
        </div>
        <div className={classes.latestBlogInfo}>
            <div className={classes.latestBlogCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.latestBlogTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
            <div className={classes.latestBlogPublishDate}>
                {props.displayDate}
            </div>
        </div>    
    </article>
);

export default latestBlog;