import React from 'react';
import classes from './conversation.module.css';

function fixDigit(val) {
    return val.toString().length === 1 ? '0' + val : val.toString();
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const comment = (props) => {
    let postDate = new Date(props.postDate);

    let year = postDate.getFullYear().toString();

    let day = fixDigit(postDate.getDate());

    var options = { month: 'long' };
    let monthInLetter = new Intl.DateTimeFormat('en-US', options).format(postDate);

    let postTime = formatAMPM(postDate);

    let displayDate =
    monthInLetter + ' ' + day + ', ' + year + ' - ' + postTime;

    return(
        <div className={classes.opinionContainer}>
            <div className={classes.opinionInfo}>
                <div className={classes.opiner}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={classes.User} viewBox="0 0 32 32">
                        <path d="M15.999 0C7.162 0 0 7.164 0 16s7.162 16 15.999 16C24.837 32 32 24.837 32 16S24.837 0 15.999 0zm0 6.194c3.136 0 5.679 2.543 5.679 5.677 0 3.136-2.543 5.679-5.679 5.679-3.129 0-5.681-2.543-5.681-5.679 0-3.134 2.552-5.677 5.681-5.677zm0 22.193c-3.786 0-7.181-1.713-9.451-4.396 1.213-2.289 3.583-3.859 6.354-3.859.156 0 .311.025.458.07.837.27 1.716.45 2.638.45.924 0 1.809-.18 2.637-.45.15-.044.307-.07.462-.07 2.766 0 5.141 1.57 6.352 3.859-2.269 2.682-5.662 4.396-9.45 4.396z"/>
                    </svg>
                    <span>{props.opiner}</span>
                </div>
                <div className={classes.date}>
                    {displayDate}
                </div>
            </div>
            <div className={classes.opinionText}>
                {props.opinionText}
            </div>
        </div>
    )
}

export default comment;