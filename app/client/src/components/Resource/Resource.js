import React from 'react';
import classes from './Resource.css';
import PropTypes from 'prop-types';
import noImageIcon from '../../assets/images/image.svg'

const resource = (props) => {

    return (
            <div className={classes.Resource}>
                <a 
                className={classes.MainContainer}
                target="_blank" 
                rel="noopener noreferrer" 
                href={props.link}
                onClick={props.clicked}
                >
                    <div className={classes.ImgColumn}>
                        { props.image ? 
                            <img className={classes.ResourceImg} src={props.image} alt="resource" />
                            :
                            <img className={classes.ResourceImg} src={noImageIcon} alt="resource" />
                            }    
                    </div>
                    <div className={classes.InfoColumn}>
                        <div className={classes.InfoContainer}>
                            <div className={classes.TitleRow}>
                                <div className={classes.Title}>{props.title}</div>
                                <div className={classes.DetailsContainer}>
                                    <div>
                                        <div className={classes.Type}>SOURCE:<span>{props.source}</span></div>
                                    </div>
                                    { props.publishDate ? 
                                        <div>
                                            <div className={classes.Type}>PUBLISHED:<span>{props.publishDate}</span></div>
                                        </div> : null
                                    }
                                    { props.lastUpdated ? 
                                        <div>
                                            <div className={classes.Type}>LAST-UPDATED:<span>{props.lastUpdated}</span></div>
                                        </div> : null
                                    }
                                    <div>
                                        <div className={classes.Type}>TYPE:<span>{props.type}</span></div>
                                    </div>
                                    { props.tutor ?
                                        <div>
                                            <div className={classes.Type}>TUTOR:<span>{props.tutor}</span></div>
                                        </div> : null
                                    }
                                    { props.author ?
                                        <div>
                                            <div className={classes.Type}>AUTHOR:<span>{props.author}</span></div>
                                        </div> : null
                                    }
                                    { props.enrollees ?
                                        <div>
                                            <div className={classes.Type}>ENROLLEES:<span>{props.enrollees}</span></div>
                                        </div> : null
                                    }
                                    { props.duration ?
                                        <div>
                                            <div className={classes.Type}>DURATION:<span>{props.duration}</span></div>
                                        </div> : null
                                    }
                                    { props.avgRating ?
                                        <div>
                                            <div className={classes.Type}>AVG.RATING:<span>{props.avgRating}</span></div>
                                        </div> : null
                                    }
                                    { props.videoCount ? 
                                        <div className={classes.DetailsColumnFlex}>
                                            <div className={classes.Type}>VIDEOCOUNT:<span>{props.videoCount}</span></div>
                                        </div> :
                                        <div className={classes.DetailsColumnFlex}>
                                            <div className={classes.Type}>YOUTUBEVIEWS:<span>{props.youtubeViews}</span></div>
                                        </div>
                                    }   
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
                                <span onClick={props.likeclicked} className={classes.FeedBackIconLike}></span>
                                {/* <span>{props.likes}</span> */}
                            </div>
                        </div>
                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>collect</span>
                            <span onClick={props.collectclicked} className={classes.FeedBackIconCollect}></span>
                        </div>
                    </div>
                </div>           
            </div> 
    );
};

resource.propTypes= {
    link: PropTypes.string.isRequired,
    image: PropTypes.string,
    publishDate: PropTypes.number,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    videoCount: PropTypes.string,
    youtubeViews: PropTypes.string,
    likeclicked: PropTypes.func.isRequired,
    collectclicked: PropTypes.func.isRequired   
}

export default resource;

/* 

        <div className={classes.Resource}>
            <Link
            to={`/accounting/${props.id}`} 
            className={classes.MainContainer}
            onClick={props.clicked}
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
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>collect</span>
                            <span onClick={props.collectclicked} className={classes.FeedBackIconCollect}></span>
                        </div>
*/