import React from 'react';
import classes from './CollectionItem.css'



const collectionItem = (props) => (
    <div className={classes.Container}>
        <div className={classes.CollectionNameColumn}><div className={classes.CollectionName}>{props.collectionName}</div></div>
        <div className={classes.CollectionAddButtonColumn}><div onClick={props.collectionClicked} className={classes.CollectionAddButton}></div></div>
    </div>
);


export default collectionItem;