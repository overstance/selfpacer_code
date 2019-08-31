import React from 'react';
import classes from './featuredBlogs.module.css';
import { Link } from 'react-router-dom';

const featuredLarge = (props) => (
    <article className={classes.featuredLarge}>
        <div>
            <figure>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    <img src={props.featureImageUrl} alt='featured blog' />
                </Link>
                { props.source ? <figcaption>{props.source}</figcaption> : null}
            </figure>
        </div>
        <div>
            <div className={classes.featuredLargeCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.featuredLargeTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
            <div className={classes.featuredLargeDescription}>
                {props.description}
            </div>
        </div>    
    </article>
);

export default featuredLarge;