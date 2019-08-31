import React from 'react';
import classes from './featuredBlogs.module.css';
import { Link } from 'react-router-dom';

const featuredMedium = (props) => (
    <article className={classes.featuredMedium}>
        <div className={classes.featuredMediumImage}>
            <figure>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    <img src={props.featureImageUrl} alt='featured blog' />
                </Link>
                { props.source ? <figcaption>{props.source}</figcaption> : null}
            </figure>
        </div>
        <div className={classes.featuredMediumInfo}>
            <div className={classes.featuredMediumCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.featuredMediumTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
        </div>    
    </article>
);

export default featuredMedium;