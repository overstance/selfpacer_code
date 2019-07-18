import React from 'react';
import classes from './PlatformNav.module.css'; 


const platformNav = (props) => {

    const youtubeClasses = [classes.Youtube];
    const youtubeIconClasses = [classes.YoutubeIcon];
    if (props.youtubeActived) {
        youtubeClasses.push(classes.Active);
        youtubeIconClasses.push(classes.IconActive)
    }

    const moocClasses = [classes.Mooc];
    const moocIconClasses = [classes.MoocIcon];
    if (props.moocActived) {
        moocClasses.push(classes.Active);
        moocIconClasses.push(classes.IconActive);
    }

    const allClasses = [classes.All];
    const allIconClasses = [classes.AllIcon];
    if (props.allActived) {
        allClasses.push(classes.Active);
        allIconClasses.push(classes.IconActive);
    }

    const bookClasses = [classes.Book];
    const bookIconClasses = [classes.BookIcon];
    if (props.booksActived) {
        bookClasses.push(classes.Active);
        bookIconClasses.push(classes.IconActive);
    }

    return (
        <div>
            <div className={classes.FlexContainer}>
                <div 
                    className={allClasses.join(' ')}
                    onClick={props.allClicked}
                >
                    {/* <div className={classes.AllIcon}></div> */}
                    <svg className={allIconClasses.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"/>
                    </svg>
                    <div>all</div>
                </div>
                <div 
                    className={youtubeClasses.join(' ')} 
                    onClick={props.youtubeClicked}
                >               
                    {/* <div className={classes.YoutubeIcon}></div> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={youtubeIconClasses.join(' ')} viewBox="0 0 576 512">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                    <div>youtube</div>
                </div>
                <div 
                    className={moocClasses.join(' ')}
                    onClick={props.moocClicked}
                >
                    {/* <div className={classes.MoocIcon}></div> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={moocIconClasses.join(' ')} viewBox="0 0 48 48">
                        <path d="M42 6H6c-2.2 0-4 1.8-4 4v6h4v-6h36v28H28v4h14c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zM2 36v6h6c0-3.32-2.68-6-6-6zm0-8v4c5.52 0 10 4.48 10 10h4c0-7.74-6.26-14-14-14zm0-8v4c9.94 0 18 8.06 18 18h4c0-12.16-9.86-22-22-22zm20 2.18v4L29 30l7-3.82v-4L29 26l-7-3.82zM29 12l-11 6 11 6 11-6-11-6z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    <div>courses</div>
                </div>
                <div
                    className={bookClasses.join(' ')}
                    onClick={props.booksClicked}
                >                
                    {/* <div className={classes.BookIcon}></div> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={bookIconClasses.join(' ')} viewBox="0 0 448 512">
                        <path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"/>
                    </svg>
                    <div>books</div>
                </div>
            </div>           
        </div>
    );
}

export default platformNav;