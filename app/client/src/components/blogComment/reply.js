import React from 'react';
import classes from './comment.module.css';

const reply = (props) => {
    return(
        <div className={classes.commentContainer}>
            <div className={classes.commentInfo}>
                <div className={classes.commentor}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.User} viewBox="0 0 24 24">
                        <path d="M12 2c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4m0-2C8.686 0 6 2.687 6 6s2.686 6 6 6c3.313 0 6-2.687 6-6s-2.687-6-6-6zm6 14c2.206 0 4 1.794 4 4v3c0 .552-.448 1-1 1H3c-.551 0-1-.448-1-1v-3c0-2.206 1.794-4 4-4h.537c.164.064.437.186.648.279.508.226 1.141.507 1.814.732.967.325 1.977.489 3.001.489s2.033-.164 3.002-.488c.671-.226 1.303-.507 1.812-.732.211-.094.484-.215.649-.279H18M18 12h-.757c-.418 0-1.618.692-2.878 1.115-.743.249-1.537.385-2.365.385s-1.623-.136-2.366-.385C8.374 12.692 7.175 12 6.757 12H6c-3.313 0-6 2.687-6 6v3c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-3c0-3.313-2.687-6-6-6z"/>
                    </svg>
                    <span>{props.commentor}</span>
                </div>
                <div className={classes.date}>
                    {props.displayDate}
                </div>
            </div>
            <div className={classes.commentText}>
                {props.commentText}
            </div>
        </div>
    )
}

export default reply;