import React, { Component } from 'react';
import classes from './Resource.css';
import PropTypes from 'prop-types';
// import noImageIcon from '../../assets/images/image.svg';
import {connect} from 'react-redux';

class Resource extends Component {
    render () {
        return (
            <div className={classes.Resource}>
                <a 
                className={classes.MainContainer}
                target="_blank" 
                rel="noopener noreferrer" 
                href={this.props.link}
                onClick={this.props.clicked}
                >
                    { this.props.image ? 
                        <div style={{'backgroundImage': `url(${this.props.image})`}} className={classes.ImgColumn}></div> :
                        <div className={classes.NoImageColumn}></div>
                    }
                    <div className={classes.InfoContainer}>
                        <div className={classes.TitlePlusLinkIcon}>
                            <div className={classes.LinkIconWrapper}><span className={classes.LinkIcon}></span></div>
                            <div className={classes.Title}>{this.props.title}</div>
                        </div>
                        <div className={classes.DetailsContainer}>
                            <div>
                                <div className={classes.Type}>SOURCE:<span>{this.props.source}</span></div>
                            </div>
                            { this.props.publishDate ? 
                                <div>
                                    <div className={classes.Type}>PUBLISHED:<span>{this.props.publishDate}</span></div>
                                </div> : null
                            }
                            { this.props.lastUpdated ? 
                                <div>
                                    <div className={classes.Type}>LAST-UPDATED:<span>{this.props.lastUpdated}</span></div>
                                </div> : null
                            }
                            <div>
                                <div className={classes.Type}>TYPE:<span>{this.props.type}</span></div>
                            </div>
                            { this.props.tutor ?
                                <div>
                                    <div className={classes.Type}>TUTOR:<span>{this.props.tutor}</span></div>
                                </div> : null
                            }
                            { this.props.enrollees ?
                                <div>
                                    <div className={classes.Type}>ENROLLEES:<span>{this.props.enrollees + '+'}</span></div>
                                </div> : null
                            }
                            { this.props.duration ?
                                <div>
                                    <div className={classes.Type}>DURATION:<span>{this.props.duration}</span></div>
                                </div> : null
                            }
                            { this.props.avgRating ?
                                <div>
                                    <div className={classes.Type}>AVG.RATING:<span>{this.props.avgRating + ' of 5 stars'}</span></div>
                                </div> : null
                            }
                            { this.props.level ?
                                <div>
                                    <div className={classes.Type}>LEVEL:<span>{this.props.level}</span></div>
                                </div> : null
                            }
                            { this.props.videoCount ? 
                                <div className={classes.DetailsColumnFlex}>
                                    <div className={classes.Type}>VIDEOCOUNT:<span>{this.props.videoCount}</span></div>
                                </div> : null
                            }
                            { this.props.youtubeViews ?
                                <div className={classes.DetailsColumnFlex}>
                                    <div className={classes.Type}>YOUTUBEVIEWS:<span>{this.props.youtubeViews}</span></div>
                                </div> : null
                            }  
                            { this.props.author ?
                                <div className={classes.DetailsColumnFlex}>
                                    <div className={classes.Type}>AUTHOR:<span>{this.props.author}</span></div>
                                </div> : null
                            }   
                        </div>
                    </div>
                </a>
                <div className={classes.Hr}/>
                <div className={classes.FeedbackRow}>
                    <div className={classes.FeedbackContainer}>
                        { this.props.toConfirm ? 
                            <div className={classes.OptionsConfirm}>
                                <span className={classes.DateAdded}>{'date added: ' + this.props.dateAdded}</span>
                                <span onClick={this.props.confirmClicked} className={classes.ToConfirm}>confirm</span>
                            </div>
                            : 
                            <div className={classes.DetailsColumnFlex}>
                                { this.props.id === this.props.likedResource ?
                                    <div className={classes.youLiked}>
                                        <span className={classes.FeedbackText}>liked</span>
                                    </div> : null
                                }
                                <div className={classes.OptionsLike}>
                                    <span className={classes.FeedbackText}>like</span>
                                    <span onClick={this.props.likeclicked} className={classes.FeedBackIconLike}></span>
                                    {/* <span>{this.props.likes}</span> */}
                                </div>
                            </div>
                        }
                        { this.props.deletable ? 
                            <div className={classes.Options}>
                                <span className={classes.FeedbackText}>delete</span>
                                <span onClick={this.props.deleteClicked} className={classes.FeedBackIconDelete}></span>
                            </div> :
                            <div className={classes.Options}>
                                <span className={classes.FeedbackText}>collect</span>
                                <span onClick={this.props.collectclicked} className={classes.FeedBackIconCollect}></span>
                            </div>
                        }
                    </div>
                </div>           
            </div> 
        );
    }
};

const mapStateToProps = state => {
    return {
        likedResource: state.explore.likedResource
    };
};


Resource.propTypes= {
    link: PropTypes.string.isRequired,
    image: PropTypes.string,
    publishDate: PropTypes.number,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    videoCount: PropTypes.string,
    youtubeViews: PropTypes.string,
    likeclicked: PropTypes.func,
    collectclicked: PropTypes.func   
}

export default connect(mapStateToProps)(Resource);

/* 

        <div className={classes.Resource}>
            <Link
            to={`/accounting/${this.props.id}`} 
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