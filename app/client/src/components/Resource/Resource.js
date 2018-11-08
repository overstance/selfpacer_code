import React from 'react';
import classes from './Resource.css';
// import filterIcon from '../../../assets/images/angle-down.svg';
//import thumbsUp from '../../assets/images/thumbs-up.svg';
//import thumbsDown from '../../assets/images/thumbs-down.svg';
//import fileImport from '../../assets/images/file-import.svg';


const resource = (props) => {
    /* const filterIconClasses = [classes.FilterIcon];

    if (props.filterIconRotate) {
        filterIconClasses.push(classes.Rotate180);
    } */

    return (
        <div className={classes.Resource}>
            <a 
            className={classes.MainContainer}
            target="_blank" 
            rel="noopener noreferrer" 
            href={props.link}
            >
                <div className={classes.ImgColumn}>
                    <img className={classes.ResourceImg} src={props.image} alt="resource" />    
                </div>
                <div className={classes.InfoColumn}>
                    <div className={classes.InfoContainer}>
                        <div className={classes.TitleRow}>
                            <div className={classes.Title}>{props.title}</div>
                            <div className={classes.DetailsContainer}>
                                <div>
                                    <div className={classes.Source}>SOURCE:<span>{props.source}</span></div>
                                </div>
                                <div>
                                    <div className={classes.Type}>TYPE:<span>{props.type}</span></div>
                                </div>
                                {props.videoCount ? <div className={classes.DetailsColumnFlex}>
                                    <div className={classes.Type}>VIDEOS:<span>{props.videoCount}</span></div>
                                </div> : <div className={classes.DetailsColumnFlex}>
                                    <div className={classes.Type}>YOUTUBEVIEWS:<span>{props.youtubeViews + '+'}</span></div>
                                </div>}   
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div className={classes.Hr}/>
            <div className={classes.FeedbackRow}>
                <div className={classes.FeedbackContainer}>
                    <div className={classes.DetailsColumnFlex}>
                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>like</span>
                            {/* <span className={classes.FeedBackIconContainer}><img className={classes.FeedbackIcons} src={thumbsUp} alt='thumbs up' /></span> */}
                            <span className={classes.FeedBackIconLike}></span>
                            {/* <span>{props.likes}</span> */}
                        </div>
                    </div>
                    <div>
                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>dislike</span>
                            <span className={classes.FeedBackIconDislike}></span>
                            {/* <span>{props.dislikes}</span> */}
                        </div>
                    </div>
                    <div>
                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>collect</span>
                            <span className={classes.FeedBackIconCollect}></span>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    );
};

export default resource;
