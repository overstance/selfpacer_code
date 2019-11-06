import React, { Component } from 'react';
import classes from './sharedCollectionContainer.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SharedCollectionContainer extends Component {
    render () {
        let title = this.props.title;
        let curator = this.props.curator;

        if(curator && curator.length > 20) {
            curator = curator.slice(0,20) + '...'
        }

        if(title.length > 60) {
            let elipses = '...';
            let titleShortened = title.slice(0, 60);
            title =  titleShortened.concat(elipses);
        }

        let checkPinned = this.props.pinnedCollectionIds.filter(collection => collection === this.props.id);
        return (
            this.props.forExplore ?
            <Link 
            to={`/shared_collections/${this.props.id}`} className={classes.forExploreContainer}
            onClick={this.props.collectionClicked}
            >
                <div className={classes.titleWrapper}>
                    <div className={classes.title}>
                        {title}
                    </div>
                    { this.props.curator ?
                        <div className={classes.curator}>
                            {"curator: " + curator}
                        </div>
                        : null
                    }
                </div>
                <div className={classes.NontitleWrapper}>
                    <div className={classes.ItemCount}>{this.props.itemCount}</div>
                    { this.props.itemCount <= 1 ? 
                        <div className={classes.ItemLabel}>Item</div>
                        :
                        <div className={classes.ItemLabel}>Items</div>
                    }
                    <div className={classes.DateLabel}>{'last updated: ' + this.props.lastUpdated}</div>
                </div>
            </Link>
            :
            <Link 
            to={`/shared_collections/${this.props.id}`} className={classes.Container}
            onClick={this.props.collectionClicked}
            >
                <div className={classes.titleWrapper}>
                    { checkPinned.length !== 0 ? 
                        <div className={classes.PinIconWrapper}>
                            <div className={classes.PinIconRow}></div>
                            <span>pinned</span>
                            { this.props.isPinned ?
                                <div className={classes.description}>
                                    {'type: ' + this.props.description}
                                </div>
                                : null
                            }
                        </div> :
                        null 
                    }
                    <div className={classes.title}>
                        {title}
                    </div>
                    { this.props.curator ?
                        <div className={classes.curator}>
                            {"curator: " + curator}
                        </div>
                        : null
                    }
                </div>
                <div className={classes.NontitleWrapper}>
                    <div className={classes.ItemCount}>{this.props.itemCount}</div>
                    { this.props.itemCount <= 1 ? 
                        <div className={classes.ItemLabel}>Item</div>
                        :
                        <div className={classes.ItemLabel}>Items</div>
                    }
                    <div className={classes.DateLabel}>{'last updated: ' + this.props.lastUpdated}</div>
                </div>
            </Link>
        )
    }
} 

const mapStateToProps = state => {
    return {
        pinnedCollectionIds: state.collection.pinnedCollectionIds,
    };
};


export default connect(mapStateToProps)(SharedCollectionContainer);
