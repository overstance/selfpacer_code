import React from 'react';
import classes from './PostActionInfo.css';


const postActionInfo = (props) => (
 <div>
     {  props.isSuccess ?
        <div className={classes.Success}>{props.children}</div> : null
     }
     {  props.isFailed ?
        <div className={classes.Failed}>{props.children}</div> : null
     }
     
 </div>
);

export default  postActionInfo;