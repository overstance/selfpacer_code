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
                <div className={classes.info}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 0C4.478 0 0 4.479 0 10c0 5.524 4.478 10 10 10s10-4.476 10-10c0-5.521-4.478-10-10-10zm0 4.436c.936 0 1.693.758 1.693 1.693S10.936 7.822 10 7.822s-1.693-.758-1.693-1.693S9.064 4.436 10 4.436zm2.258 10.242c0 .267-.217.483-.483.483H8.226c-.267 0-.483-.217-.483-.483v-.968c0-.268.217-.484.483-.484h.484v-2.58h-.484c-.267 0-.483-.217-.483-.484v-.969c0-.267.217-.483.483-.483h2.581c.267 0 .483.217.483.483v4.032h.484c.267 0 .483.217.483.484v.969z"/>
                    </svg>
                </div>
                <div className={classes.overlay}/>
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


