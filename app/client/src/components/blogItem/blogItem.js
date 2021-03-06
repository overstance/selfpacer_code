import React from 'react';
import classes from './blogItem.module.css';
import { Link } from 'react-router-dom';
import Spinner from '../UserInterface/Spinner/Spinner';

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

    let removeSavedButtonText = 'remove';
    if (props.blogId === props.blogBeenUnsaved) {
        removeSavedButtonText = <Spinner isButton/>
    }

    return(
        props.isSaved ?
        <article className={classes.savedBlogItem}>
            <div className={classes.savedBlogItemInfo}>
                <div className={classes.blogItemTitle}>
                    <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                    onClick={props.postClicked}
                    >
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
            <div className={classes.removeSaved}>
                <div 
                onClick={props.removeSaved}
                className={classes.removeSavedButton}
                >
                    {removeSavedButtonText}
                </div> 
            </div> 
        </article>
        :
        <article className={classes.blogItem}>
            <div className={classes.blogItemImage}>
                <figure>
                    <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                    onClick={props.postClicked}
                    >
                        <img src={props.featureImageUrl} alt='featured blog' />
                    </Link>
                    { props.source ? <figcaption>{props.source}</figcaption> : null}
                </figure>
            </div>
            <div className={classes.blogItemInfo}>
                <div className={classes.blogItemTitle}>
                    <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                    onClick={props.postClicked}
                    >
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