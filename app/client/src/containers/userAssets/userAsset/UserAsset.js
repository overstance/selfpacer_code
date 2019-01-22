import React, { Component } from 'react';
import classes from './UserAsset.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class UserAsset extends Component {
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
                        <div className={classes.Title}>{this.props.title}</div>
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
                        <div className={classes.Statistics}>
                            <div className={classes.StatisticsLike}>
                                <span className={classes.FeedBackIconLike} />
                                <div className={classes.CountAndLabel}>                                   
                                    <div className={classes.StatisticsCount}>{this.props.likeCount}</div>
                                    <div className={classes.StatisticsLabel}>likes</div>
                                </div>
                            </div>
                            <div className={classes.StatisticsCollections}>
                                <span className={classes.FeedBackIconCollect} />
                                <div className={classes.CountAndLabel}>
                                    <div className={classes.StatisticsCount}>{this.props.collectCount}</div>
                                    <div className={classes.StatisticsLabel}>collect counts</div>
                                </div>      
                            </div>
                            <div className={classes.StatisticsAssets}>
                                <span className={classes.FeedBackIconView} />
                                <div className={classes.CountAndLabel}>
                                    <div className={classes.StatisticsCount}>{this.props.viewCount}</div>
                                    <div className={classes.StatisticsLabel}>views</div>
                                </div>   
                            </div>
                        </div>
                        <div className={classes.AssetOptions}>
                            <div className={classes.DateAdded}>{'date added: ' + this.props.dateAdded}</div>
                            <div className={classes.AssetControls}>
                                { this.props.type === 'youtube#playlist' || this.props.type === 'youtube#video' ? null :
                                    <div className={classes.OptionsLike}>
                                        <span onClick={this.props.updateClicked} className={classes.UpdateButton}>update</span>
                                    </div>
                                }
                                <div className={classes.Options}>
                                    <span onClick={this.props.deleteClicked} className={classes.FeedBackIconDelete}></span>
                                </div>
                            </div>
                        </div>
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


UserAsset.propTypes= {
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

export default connect(mapStateToProps)(UserAsset);