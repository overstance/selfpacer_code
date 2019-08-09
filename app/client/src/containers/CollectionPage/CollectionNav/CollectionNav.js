import React from 'react';
import classes from './CollectionNav.module.css'; 


const collectionNav = (props) => {

   /*  const youtubeClasses = [classes.Youtube];
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
    } */

    return (
        <div>
            {props.isShared ? 
                <div className={classes.FlexContainer}>
                    { props.accountType === 'Administrator' || props.accountType === 'Senior Administrator' || props.accountType === 'Head Administrator' ?  
                        <div 
                        className={classes.Feature}
                        onClick={props.featureClicked}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.FeatureIcon} viewBox="0 0 576 512">
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className={classes.FeatureIcon} viewBox="0 0 48 48">
                                <path d="M42 6H6c-2.2 0-4 1.8-4 4v6h4v-6h36v28H28v4h14c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zM2 36v6h6c0-3.32-2.68-6-6-6zm0-8v4c5.52 0 10 4.48 10 10h4c0-7.74-6.26-14-14-14zm0-8v4c9.94 0 18 8.06 18 18h4c0-12.16-9.86-22-22-22zm20 2.18v4L29 30l7-3.82v-4L29 26l-7-3.82zM29 12l-11 6 11 6 11-6-11-6z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                            </svg> */}
                            { props.featured ? <div>unfeature</div> : <div>feature</div>}
                        </div> : null
                    }
                    <div
                        className={classes.Pin}
                        onClick={props.pinClicked}
                    >                
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.PinIcon} viewBox="0 0 384 512">
                            <path d="M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z"/>
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className={classes.PinIcon} viewBox="0 0 448 512">
                            <path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"/>
                        </svg> */}
                        { props.pinned ? <div>unpin</div> : <div>pin</div> }
                    </div>
                </div> 
                :
                <div className={classes.FlexContainer}>
                    <div 
                        className={classes.Edit}
                        onClick={props.editClicked}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.EditIcon} viewBox="0 0 576 512">
                            <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
                        </svg>
                        <div>edit</div>
                    </div>
                    <div 
                        className={classes.Publish} 
                        onClick={props.publishClicked}
                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" className={classes.PublishIcon} viewBox="0 0 448 512">
                            <path d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"/>
                        </svg>              
                       {/*  <svg xmlns="http://www.w3.org/2000/svg" className={classes.PublishIcon} viewBox="0 0 576 512">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                        </svg> */}
                        { props.published ? <div>unpublish</div> : <div>publish</div> }
                    </div>
                    <div 
                        className={classes.Delete}
                        onClick={props.deleteClicked}
                    >
                        <svg  className={classes.DeleteIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/>
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className={classes.DeleteIcon} viewBox="0 0 48 48">
                            <path d="M42 6H6c-2.2 0-4 1.8-4 4v6h4v-6h36v28H28v4h14c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zM2 36v6h6c0-3.32-2.68-6-6-6zm0-8v4c5.52 0 10 4.48 10 10h4c0-7.74-6.26-14-14-14zm0-8v4c9.94 0 18 8.06 18 18h4c0-12.16-9.86-22-22-22zm20 2.18v4L29 30l7-3.82v-4L29 26l-7-3.82zM29 12l-11 6 11 6 11-6-11-6z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                        </svg> */}
                        <div>delete</div>
                    </div>
                </div>
            }          
        </div>
    
    );
}

export default collectionNav;