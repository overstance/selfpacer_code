import React from 'react';
import classes from './blogFooter.module.css';
import { Link } from 'react-router-dom';

const blogFooterItem = (props) => (
    <div className={classes.blogFooterItem}>
        <div className={classes.blogTitle}>
            <Link to={`/blog/${props.publishYear}/${props.publishMonth}/${props.publishDay}/${props.slug}`}
                onClick={props.postClicked}
            >
                {props.title}
            </Link>
        </div>     
    </div>
);

export default blogFooterItem;