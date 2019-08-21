import React from 'react';
import classes from './featuredBlogs.module.css';
import { Link } from 'react-router-dom';

const featuredMediumV = (props) => (
    <article className={classes.featuredMediumV}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                <img src={props.featureImageUrl} alt='featured blog' />
            </Link>
            { props.source ? <figcaption>{props.source}</figcaption> : null}
        </figure>
        <div className={classes.featuredMediumVInfo}>
            <div className={classes.featuredMediumVCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.featuredMediumVTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
        </div>    
    </article>
);

export default featuredMediumV;