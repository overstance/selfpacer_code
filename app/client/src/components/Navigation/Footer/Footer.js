import React from 'react';
import classes from './Footer.css';

const footer = () => (
    <footer className={classes.Footer}>
        <div className={classes.Copyright}>
            <div className={classes.Container}>
                &copy;2018 Selfpacer | <a href="#!"><span>Privacy Policy</span></a>
                <a className={classes.SocialLinks} href="#!">More Links</a>
            </div>
        </div>
    </footer>
);

export default footer;
