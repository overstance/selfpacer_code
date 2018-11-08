import React from 'react';
import classes from './Footer.css';
import Container from '../../UserInterface/Container/Container';

const footer = () => (
    <footer className={classes.Footer}>
        <div className={classes.Copyright}>
            <Container>
                <div className={classes.Container}>
                    &copy;2018 selfpacer<a href="#!"><span>privacy-policy</span></a>
                    <div className={classes.SocialLinks} href="#!">More Links</div>
                </div>
            </Container>  
        </div>
    </footer>
);

export default footer;

/* <div className={classes.Copyright}>
    <div className={classes.Container}>
        &copy;2018 Selfpacer | <a href="#!"><span>Privacy Policy</span></a>
        <a className={classes.SocialLinks} href="#!">More Links</a>
    </div>  
</div>
 */