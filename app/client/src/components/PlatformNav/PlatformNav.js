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
                    <div className={classes.AllIcon}></div><div>all</div>
                </div>
                <div 
                    className={youtubeClasses.join(' ')} 
                    onClick={props.youtubeClicked}
                >               
                    <div className={classes.YoutubeIcon}></div><div>youtube</div>
                </div>
                <div 
                    className={moocClasses.join(' ')}
                    onClick={props.moocClicked}
                >
                    <div className={classes.MoocIcon}></div><div>moocs</div>
                </div>
                <div
                    className={bookClasses.join(' ')}
                    onClick={props.booksClicked}
                >                
                    <div className={classes.BookIcon}></div><div>books</div>
                </div>
            </div>           
        </div>
    );
}

export default subheader;