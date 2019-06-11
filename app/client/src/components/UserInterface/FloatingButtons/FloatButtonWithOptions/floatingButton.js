import React from 'react';
import classes from './floatingButton.css';


const floatingButton = (props) => {

    const wrapperClasses = [classes.Wrapper];
    const miniButtonContainerClasses = [classes.MiniButtonContainer];
    const addLabelClasses = [classes.AddLabelHide];
    const addYoutubeClasses = [classes.YoutubeLabelHide];
    const addCourseClasses = [classes.CourseLabelHide];
    const addBookClasses = [classes.BookLabelHide];


    if (props.showMiniButton) {
        wrapperClasses.push(classes.WrapperExpand);
        miniButtonContainerClasses.push(classes.MiniButtonContainerShow);
        // console.log(wrapperClasses);
    }

    return (
        <div  className={wrapperClasses.join(' ')}>
            <div className={miniButtonContainerClasses.join(' ')}>
                <div className={classes.MiniButton}>
                    <div className={classes.BookIcon}/>
                    <p className={addBookClasses.join(' ')}>add book</p>
                </div>
                <div className={classes.MiniButton}>
                    <div className={classes.CourseIcon}/>
                    <p className={addCourseClasses.join(' ')}>add course</p>
                </div>
                <div className={classes.MiniButton}>
                    <div className={classes.YoutubeIcon}/>
                    <p className={addYoutubeClasses.join(' ')}>add youtube</p>
                </div>
            </div>
            <div onClick={props.addClicked} className={classes.FloatingButton}>
                <div className={classes.AddIcon}/>
                <p className={addLabelClasses.join(' ')}>Add</p>
            </div>
        </div>

    );
}

export default floatingButton;