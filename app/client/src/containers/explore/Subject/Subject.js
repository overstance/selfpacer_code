import React from 'react';
import PropTypes from 'prop-types';
import classes from './Subject.css';
import eyeIcon from '../../../assets/images/eye.svg';
import { Link } from 'react-router-dom';


const subject = (props) => (
    <li className={classes.Subject}>
        <div className={classes.SubjectWrapper}>
            <Link onClick={props.clicked} className={classes.SubjectContainer} to={props.to} exact={props.exact} >
                <img className={classes.SubjectIcon} src={props.src} alt={props.alt} />
                    <div className={classes.Caption}>
                        <span className={classes.SubjectSpan}>{props.title}</span>
                    </div>
                    <div className={classes.ViewCounter}>
                        <div>
                            <img className={classes.EyeIcon} src={eyeIcon} alt='eye icon' /><span style={{ color: "#ff4433" }}>{props.views}</span>
                        </div>
                    </div>
            </Link>
        </div>
    </li>
);

subject.propTypes= {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired   
}

export default subject;