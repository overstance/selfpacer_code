import React from 'react';
import classes from './featuredBlogs.module.css';
import { Link } from 'react-router-dom';

const featuredSmall = (props) => (
    <article className={classes.featuredSmall}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                onClick={props.postClicked}
            >
                <div style={{'backgroundImage': `url(${props.featureImageUrl})`}} className={classes.featuredSmallImage}></div>
            </Link>
        </figure>
        <div>
            <div className={classes.featuredSmallCategory}>
                <Link to={`/blog/sections/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.featuredSmallTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                    onClick={props.postClicked}
                >
                    {props.title}
                </Link>
            </div>
        </div>      
    </article>
);

export default featuredSmall;