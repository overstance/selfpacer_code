import React from 'react';
import classes from './blogSection.module.css';
import { Link } from 'react-router-dom';

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
  
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const blogItem = (props) => {
    let currentTime = new Date();
    let publishDate = new Date(props.publishedOn);
    let displayTime;

    let isSameDay = sameDay(currentTime, publishDate);

    if (isSameDay) {
        displayTime = formatAMPM(publishDate);
    }

    return(
        <article className={classes.blogItem}>
            <div className={classes.blogItemImage}>
                <figure>
                    <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                        <img src={props.featureImageUrl} alt='featured blog' />
                    </Link>
                    { props.source ? <figcaption>{props.source}</figcaption> : null}
                </figure>
            </div>
            <div className={classes.blogItemInfo}>
                <div className={classes.blogItemTitle}>
                    <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}>
                        {props.title}
                    </Link>
                </div>
                <div className={classes.blogItemDescription}>
                    {props.description}
                </div>
                { isSameDay ? 
                    <div className={classes.blogItemPublishDate}>
                        {props.displayDate + ' - ' + displayTime + ' EDT'}
                    </div>
                    :  
                    <div className={classes.blogItemPublishDate}>
                        {props.displayDate}
                    </div>
                }
            </div>    
        </article>
    )
};

export default blogItem;