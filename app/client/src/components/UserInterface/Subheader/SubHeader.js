import React from 'react';
import classes from './SubHeader.css';
import filterIcon from '../../../assets/images/angle-down.svg';
import {Link} from 'react-router-dom';


const subheader = (props) => {
    const filterIconClasses = [classes.FilterIcon];

    if (props.filterIconRotate) {
        filterIconClasses.push(classes.Rotate180);
    }

    return (
        <div className={classes.Subhead}>
            { props.isLink ?
                <div className={classes.FlexContainer}>
                    <div className={classes.TitleColumn}>
                        <h5>{props.subheadTitle}</h5>
                    </div>
                    <Link to={props.link} className={classes.IconColumn}>
                        <img className={classes.RightAngleIcon} src={filterIcon} alt="filter icon" />    
                    </Link>
                </div>
                :
                <div className={classes.FlexContainer}>
                    <div className={classes.TitleColumn}>
                        <h5>{props.subheadTitle}</h5>
                    </div>
                    <div onClick={props.filterToggleHandler} className={classes.IconColumn}>
                        <img className={filterIconClasses.join(' ')} src={filterIcon} alt="filter icon" />    
                    </div>
                </div>
            }           
        </div>
    );
};

export default subheader;