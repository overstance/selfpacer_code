import React from 'react';
import classes from './featuredBlogs.module.css';
import { Link } from 'react-router-dom';

const featuredCover = (props) => (
    <article className={classes.featuredCover}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                <img src={props.featureImageUrl} alt='featured blog' />
            </Link>            
            { props.source ? <figcaption>{props.source}</figcaption> : null}
        </figure>
        <div className={classes.featuredCoverInfo}>
            <div className={classes.featuredCoverCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.featuredCoverTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
            <div className={classes.featuredCoverDescription}>
                {props.description}
            </div>
        </div>    
    </article>
);

export default featuredCover;