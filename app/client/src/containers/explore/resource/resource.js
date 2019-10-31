import React from 'react';
import classes from './resource.module.css';
import {Link} from 'react-router-dom';

const resource = (props) => {

    let displayedType = props.type;

    if (props.type === 'mooc') {
        displayedType = 'course'
    }

    if (props.type === 'books') {
        displayedType = 'book'
    }

    let displayedTitle = props.title;

    if(displayedTitle.length > 70) {
        let temp = displayedTitle.slice(0, 70);

        displayedTitle = temp + '...';
    }

    let displayedSource = props.source;

    if(displayedSource.length > 24) {
        let temp = displayedSource.slice(0, 24);

        displayedSource = temp + '...';
    }
    
    return (
        <Link 
            to={`/resource/${props.category}/${props.id}`} 
            className={classes.resource}
        >
            <figure>
                <div style={{'backgroundImage': `url(${props.img})`}} className={classes.resourceImage} />
            </figure>
            <div className={classes.resourceInfo}>
                <div className={classes.resourceTitle}>
                    {displayedTitle}
                </div>
                <div className={classes.source}>
                    Source: <span>{displayedSource}</span>
                </div>
                <div className={classes.type}>
                    Type: <span>{displayedType}</span>                  
                </div>
            </div>    
        </Link>
    )
};

export default resource;


