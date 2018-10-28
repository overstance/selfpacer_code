import React from 'react';
import classes from './PlatformNav.css';


const subheader = (props) => (
        <div>
            <div className={classes.FlexContainer}>
                <div className={classes.YoutubeColumn}>
                    <h5>YOUTUBE</h5>
                </div>
                <div className={classes.ELearningColumn}>
                    <h5>MOOC</h5>
                </div>
                <div className={classes.WebColumn}>
                    <h5>WEB</h5>
                </div>
                <div className={classes.BookColumn}>
                    <h5>BOOKS</h5>
                </div>
            </div>           
        </div>
);


export default subheader;