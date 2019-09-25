import React from 'react';
import classes from './moreInCategory.module.css';
import { Link } from 'react-router-dom';

const blogItem = (props) => (
    <article className={classes.blogItem}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
            onClick={props.postClicked}
            >
                <div style={{'backgroundImage': `url(${props.featureImageUrl})`}} className={classes.blogItemImage}></div>
            </Link>
        </figure>
        <div>
            <div className={classes.blogItemTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                onClick={props.postClicked}
                >
                    {props.title}
                </Link>
            </div>
        </div>      
    </article>
);

export default blogItem;