import React, { Component } from 'react';
import classes from './Resource.module.css';
import PropTypes from 'prop-types';
import LikeActionButton from '../UserInterface/ActionButtons/Like'; 
import CollectActionButton from '../UserInterface/ActionButtons/Collect';
import CheckActionButton from '../UserInterface/ActionButtons/Check';
import DeleteActionButton from '../UserInterface/ActionButtons/Delete';
import UpdateActionButton from '../UserInterface/ActionButtons/Update';
import UpdatingActionButton from '../UserInterface/ActionButtons/Updating';
import ProcessingActionButton from '../UserInterface/ActionButtons/Processing';

// import noImageIcon from '../../assets/images/image.svg';
import {connect} from 'react-redux';

class Resource extends Component {
    render () {

        let displayedType = this.props.type;

        if (this.props.type === 'mooc') {
            displayedType = 'course'
        }

        if (this.props.type === 'books') {
            displayedType = 'book'
        }

        let updateButton =
        <UpdateActionButton isAsset clicked={this.props.updateClicked}/>

        let confirmButton =
        <CheckActionButton clicked={this.props.confirmClicked} />;

        let deleteUnConfirmed =
        <DeleteActionButton clicked={this.props.deleteClicked}/>;

        let lastEditedDate = this.props.dateAdded;
        // console.log(this.props.lastEditedDate);

        if (this.props.lastEdited !== undefined) {
            lastEditedDate = new Date(this.props.lastEdited).toLocaleDateString()
        }

        if (this.props.updateYoutubeAssetLoading && this.props.id === this.props.updatingYoutubeAssetId) {
            updateButton = 
            <UpdatingActionButton />
        }

        if (this.props.confirmResourceLoading && this.props.id === this.props.confirmingResourceId) {
            confirmButton = 
            <ProcessingActionButton />
        }

        if (this.props.deleteUnconfirmedLoading && this.props.id === this.props.deletingUnconfirmedId) {
            deleteUnConfirmed = 
            <ProcessingActionButton />
        }

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
                                <div className={classes.Type}>TYPE:<span>{displayedType}</span></div>
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
                                    <div className={classes.Type}>LECTURECOUNT:<span>{this.props.videoCount}</span></div>
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
                            { this.props.isAsset || this.props.toConfirm ?
                                <div className={classes.DetailsColumnFlex}>
                                    <div className={classes.Type}>SUBJECT:<span>{this.props.category}</span></div>
                                </div> : null
                            }   
                        </div>
                    </div>
                </a>
                <div className={classes.FeedbackRow}>
                    {this.props.isAsset ?
                        <div className={classes.AssetFeedbackContainer}>
                            <div className={classes.Statistics}>
                                <div className={classes.StatisticsLike}>
                                    <div className={classes.CountAndLabel}>                                   
                                        <div className={classes.StatisticsCount}>{this.props.likeCount}</div>
                                        <div className={classes.StatisticsLabel}>likes</div>
                                    </div>
                                </div>
                                <div className={classes.StatisticsCollections}>
                                    <div className={classes.CountAndLabel}>
                                        <div className={classes.StatisticsCount}>{this.props.collectCount}</div>
                                        <div className={classes.StatisticsLabel}>collect counts</div>
                                    </div>      
                                </div>
                                <div className={classes.StatisticsAssets}>
                                    <div className={classes.CountAndLabel}>
                                        <div className={classes.StatisticsCount}>{this.props.viewCount}</div>
                                        <div className={classes.StatisticsLabel}>views</div>
                                    </div>   
                                </div>
                            </div>
                            <div className={classes.AssetOptions}>
                                <div className={classes.AssetLastUpdated}>
                                    { this.props.id === this.props.updatedYoutubeAsset ?
                                        <div className={classes.AssetUpdate}>
                                            <span className={classes.AssetUpdateFeedbackText}>updated</span>
                                        </div> : null
                                    }
                                    { this.props.id === this.props.updateFailedYoutubeAsset ?
                                        <div className={classes.AssetUpdate}>
                                            <span className={classes.AssetUpdateFeedbackTextError}>update error</span>
                                        </div> : null
                                    }
                                    <div className={classes.AssetLastUpdatedText}>{'last-updated: ' +  lastEditedDate }</div>
                                </div>
                                <div className={classes.AssetControls}>
                                    <div className={classes.AssetButtonContainer}>
                                        {updateButton}
                                    </div>
                                    <div className={classes.AssetButtonContainer}>
                                        <DeleteActionButton isAsset clicked={this.props.deleteClicked}/>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        :
                        <div className={classes.FeedbackContainer}>
                            { this.props.toConfirm ? 
                                <div className={classes.OptionFlex}>
                                    <span className={classes.DateAdded}>{'date added: ' + this.props.dateAdded}</span>
                                    {confirmButton}
                                </div>
                                : 
                                <div className={classes.DetailsColumnFlex}>
                                    { this.props.id === this.props.likedResource ?
                                        <div className={classes.ResourceFeedBack}>
                                            <span /* className={classes.FeedbackText} */>liked</span>
                                        </div> : null
                                    }
                                    { 
                                        this.props.id === this.props.confirmingResourceId &&
                                        this.props.confirmResourceError ?
                                        <div className={classes.ResourceFeedBackError}>
                                            <span /* className={classes.FeedbackText} */>{this.props.confirmResourceError}</span>
                                        </div> : null
                                    }
                                    { 
                                        this.props.id === this.props.deletingUnconfirmedId &&
                                        this.props.deleteUnconfirmedError ?
                                        <div className={classes.ResourceFeedBackError}>
                                            <span /* className={classes.FeedbackText} */>{this.props.deleteUnconfirmedError}</span>
                                        </div> : null
                                    }
                                    <div className={classes.OptionFlex}>
                                        <LikeActionButton clicked={this.props.likeclicked} />
                                    </div>
                                </div>
                            }
                            { this.props.deletable ? 
                                <div className={classes.OptionFixed}>
                                    { this.props.toConfirm ?
                                        deleteUnConfirmed : null
                                    }
                                    { this.props.isCollection ?
                                        <DeleteActionButton clicked={this.props.deleteClicked}/> : null
                                    }
                                </div> :
                                <div className={classes.OptionFixed}>
                                    <CollectActionButton clicked={this.props.collectclicked} />
                                </div>
                            }
                        </div>
                    }
                </div>           
            </div> 
        );
    }
};

const mapStateToProps = state => {
    return {
        likedResource: state.explore.likedResource,

        updatingYoutubeAssetId: state.resource.updatingYoutubeAssetId,
        updateYoutubeAssetLoading: state.resource.updateYoutubeAssetLoading,
        updatedYoutubeAsset: state.resource.updatedYoutubeAsset,
        updateFailedYoutubeAsset: state.resource.updateFailedYoutubeAsset,

        confirmResourceLoading: state.resource.confirmResourceLoading,
        confirmResourceError: state.resource.confirmResourceError,
        confirmingResourceId: state.resource.confirmingResourceId,

        deleteUnconfirmedLoading: state.resource.deleteUnconfirmedLoading,
        deleteUnconfirmedError: state.resource.deleteUnconfirmedError,
        deletingUnconfirmedId: state.resource.deletingUnconfirmedId
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