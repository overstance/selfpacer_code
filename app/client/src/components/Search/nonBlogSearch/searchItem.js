import React from 'react';
import classes from './nonBlogSearch.module.css';
import { Link } from 'react-router-dom';

const searchItem = (props) => {

    let displayedType = props.type;

    if (props.type === 'mooc') {
        displayedType = 'course'
    }

    if (props.type === 'books') {
        displayedType = 'book'
    }

    return (
        <React.Fragment>
            {
                props.curriculum && props.paths ?
                <div className={classes.searchItem}>
                    <Link to={`/explore/${props.subject_title}`}>
                        {props.subject_title}
                    </Link>
                    <div className={classes.searchItemType}><span>skill</span></div>
                </div>
                : null
            }
            {
                props.type && props.source ?
                <div className={classes.searchItem}>
                    <Link to={`/resource/${props.resource_category}/${props.resource_id}`}>
                        {props.resource_title}
                    </Link>
                    <div className={classes.searchItemType}><span>{displayedType}</span></div>
                </div>
                : null
            }
            {
                props.description && props.resources ?
                <div className={classes.searchItem}>
                    <Link to={`/shared_collections/${props.id}`}>
                        {props.collection_title}
                    </Link>
                    <div className={classes.searchItemType}><span>collection</span></div>
                </div>
                : null
            }
        </React.Fragment>
    )
}

export default searchItem;