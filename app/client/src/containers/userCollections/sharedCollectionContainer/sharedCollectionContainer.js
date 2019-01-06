import React from 'react';
import classes from './sharedCollectionContainer.css';
import { Link } from 'react-router-dom';

const sharedCollectionContainer = (props) => (
    <Link 
    to={`/shared_collections/${props.id}`} className={classes.Container}
    onClick={props.collectionClicked}
    >
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.NontitleWrapper}>
            <div className={classes.ItemCount}>{props.itemCount}</div>
            { props.itemCount <= 1 ? 
                <div className={classes.ItemLabel}>Item</div>
                :
                <div className={classes.ItemLabel}>Items</div>
            }
            <div className={classes.DateLabel}>{'Created on: ' + props.date}</div>
        </div>
    </Link>
);

export default sharedCollectionContainer;