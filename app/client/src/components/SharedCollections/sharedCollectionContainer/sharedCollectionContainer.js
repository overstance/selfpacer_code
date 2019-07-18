import React, { Component } from 'react';
import classes from './sharedCollectionContainer.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SharedCollectionContainer extends Component {
    render () {

        let checkPinned = this.props.pinnedCollectionIds.filter(collection => collection === this.props.id);
        return (
            <Link 
            to={`/shared_collections/${this.props.id}`} className={classes.Container}
            onClick={this.props.collectionClicked}
            >
                { checkPinned.length !== 0 ? 
                    <div className={classes.PinIconWrapper}>
                        <div className={classes.PinIconRow}></div>
                        <span>pinned</span>
                    </div> : 
                    <div className={classes.PinIconWrapper}>
                        <div className={classes.PinSpaceHolder}></div>
                    </div>
                    // null 
                }
                <div className={classes.Title}>
                    {this.props.title}
                </div>
                <div className={classes.NontitleWrapper}>
                    <div className={classes.ItemCount}>{this.props.itemCount}</div>
                    { this.props.itemCount <= 1 ? 
                        <div className={classes.ItemLabel}>Item</div>
                        :
                        <div className={classes.ItemLabel}>Items</div>
                    }
                    {/* <div className={classes.DescLabel}>{this.props.description}</div> */}
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
