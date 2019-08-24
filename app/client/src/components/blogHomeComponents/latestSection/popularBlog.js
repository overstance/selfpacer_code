import React from 'react';
import classes from './latestSection.module.css';
import { Link } from 'react-router-dom';

const popularBlog = (props) => (
    <article className={classes.popularBlog}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                <div style={{'backgroundImage': `url(${props.featureImageUrl})`}} className={classes.popularBlogImage}></div>
            </Link>
        </figure>
        <div>
            <div className={classes.popularBlogCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.popularBlogTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
        </div>      
    </article>
);

export default popularBlog;