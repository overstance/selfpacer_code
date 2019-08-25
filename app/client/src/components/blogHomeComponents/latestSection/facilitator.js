import React from 'react';
import classes from './latestSection.module.css';
// import { Link } from 'react-router-dom';

const facilitator = (props) => {
    let title = '';

    if (props.accountType === 'Editor' && props.isEditor) {
        title = 'Editor';
    }

    if (props.accountType === 'Editor' && props.isEditor & props.isAuthor) {
        title = 'Editor, Writer';
    }

    if (props.accountType === 'Facilitator' & props.isDesigner) {
        title = 'Designer'
    }

    if (props.accountType === 'Facilitator' & props.isResearcher) {
        title = 'Researcher'
    }

    if (props.accountType === 'Facilitator' & props.isAuthor) {
        title = 'Writer'
    }

    return (
        <article className={classes.facilitator}>
            <figure>
                <div style={{'backgroundImage': `url(${props.profilePictureUrl})`}} className={classes.facilitatorImage}></div>
            </figure>
            <div className={classes.facilitatorInfo}>
                <div className={classes.facilitatorName}>
                    {props.name}    
                </div>
                <div className={classes.facilitatorTitle}>
                    {title}
                </div>
            </div>      
        </article>
    );
} 

export default facilitator;