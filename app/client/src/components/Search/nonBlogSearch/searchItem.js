import React from 'react';
import classes from './nonBlogSearch.module.css';
import { Link } from 'react-router-dom';

const searchItem = (props) => {
    return (
        <React.Fragment>
            {
                props.curriculum && props.paths ?
                <div className={classes.searchItem}>
                    <Link to={`/explore/${props.subject_title}`}>
                        {props.subject_title}
                    </Link>
                </div>
                : null
            }
            {
                props.type && props.source ?
                <div className={classes.searchItem}>
                    <Link to={`/resource/${props.resource_id}`}>
                        {props.resource_title}
                    </Link>
                </div>
                : null
            }
            {
                props.description && props.resources ?
                <div className={classes.searchItem}>
                    <Link to={`/shared_collections/${props.id}`}>
                        {props.collection_title}
                    </Link>
                </div>
                : null
            }
        </React.Fragment>
    )
}

export default searchItem;