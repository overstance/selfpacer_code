import React from 'react';
import classes from './latestSection.module.css';
import { Link } from 'react-router-dom';

const latestPodcast = (props) => (
    <article className={classes.latestPodcast}>
        <figure>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                <div style={{'backgroundImage': `url(${props.featureImageUrl})`}} className={classes.featuredSmallImage}></div>
            </Link>    
        </figure>
        <div className={classes.latestPodcastInfo}>
            <div className={classes.latestPodcastTitle}>
                <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                    <span>{'Season ' + props.season + ' Episode ' + props.episode + ': ' }</span>
                    {props.title}
                </Link>
            </div>
        </div>    
    </article>
);

export default latestPodcast;