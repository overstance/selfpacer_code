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
            { props.type === 'text' ?
                <div className={classes.opinionText}>
                    {props.opinionText}
                </div>
                : null
            }
            { props.type === 'link' ?
                <a 
                className={classes.opinionLink}
                target="_blank" 
                rel="noopener noreferrer" 
                href={props.linkUrl}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 01-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0120.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0020.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 00-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                    </svg>
                    <div>
                        {props.linkDescription}
                    </div>
                </a>
                : null
            }
            { props.type === 'image' ?
                <div className={classes.opinionImage}>
                    <figure>
                        <img alt="conversation media" src={props.imageUrl} />
                        <figcaption>{props.imageCaption}</figcaption>
                    </figure>
                </div>
                : null
            }
        </div>
    )
}

export default comment;