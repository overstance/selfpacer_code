import React from 'react';
import classes from './latestSection.module.css';
import { Link } from 'react-router-dom';

const facilitator = (props) => (
    <article className={classes.facilitator}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                <div style={{'backgroundImage': `url(${props.featureImageUrl})`}} className={classes.facilitatorImage}></div>
            </Link>
        </figure>
        <div>
            <div className={classes.facilitatorCategory}>
                <Link to={`/blog/${props.category}`}>
                    {props.category}
                </Link>    
            </div>
            <div className={classes.facilitatorTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    {props.title}
                </Link>
            </div>
        </div>      
    </article>
);

export default facilitator;