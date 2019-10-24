import React from 'react';
import classes from './userCollectionContainer.module.css';
import { Link } from 'react-router-dom';

const userCollectionContainer = (props) =>  {
    let title = props.title;

    if(title.length > 60) {
        let elipses = '...';
        let titleShortened = title.slice(0, 60);
        title =  titleShortened.concat(elipses);
    }
    
    return(
        <Link 
        to={`/collections/${props.id}`} className={classes.Container}
        onClick={props.collectionClicked}
        >
            <div className={classes.Title}>{title}</div>
            <div className={classes.NontitleWrapper}>
                <div className={classes.ItemCount}>{props.itemCount}</div>
                { props.itemCount <= 1 ? 
                    <div className={classes.ItemLabel}>Item</div>
                    :
                    <div className={classes.ItemLabel}>Items</div>
                }
                <div className={classes.DateLabel}>{'last updated: ' + props.lastUpdated}</div>
            </div>
        </Link>
    );
    
} 

export default userCollectionContainer;