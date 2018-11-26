import React from 'react';
import classes from './PlatformNav.css';
//import { NavLink } from 'react-router-dom'; 


const subheader = (props) => {

    const youtubeClasses = [classes.Youtube];
    if (props.youtubeActived) {
        youtubeClasses.push(classes.Active);
    }

    const moocClasses = [classes.Mooc];
    if (props.moocActived) {
        moocClasses.push(classes.Active);
    }

    const allClasses = [classes.All];
    if (props.allActived) {
        allClasses.push(classes.Active);
    }

    const bookClasses = [classes.Book];
    if (props.booksActived) {
        bookClasses.push(classes.Active);
    }

    return (
        <div>
            <div className={classes.FlexContainer}>
                <div 
                    className={allClasses.join(' ')}
                    onClick={props.allClicked}
                >
                    ALL
                </div>
                <div 
                    className={youtubeClasses.join(' ')} 
                    onClick={props.youtubeClicked}
                >               
                    YOUTUBE
                </div>
                <div 
                    className={moocClasses.join(' ')}
                    onClick={props.moocClicked}
                >
                    MOOCs
                </div>
                <div
                    className={bookClasses.join(' ')}
                    onClick={props.booksClicked}
                >                
                    BOOKS
                </div>
            </div>           
        </div>
    );
}

export default subheader;