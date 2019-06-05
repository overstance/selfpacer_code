import React from 'react';
import classes from './Footer.css';
import Container from '../../UserInterface/Container/Container';

const footer = () => (
    <footer className={classes.Footer}>
        <Container>
            <div className={classes.Container}>
                &copy;2018 selfpacer<a href="#!"><span>privacy-policy</span></a>
                <div className={classes.SocialLinks} href="#!">More Links</div>
            </div>
        </Container>
    </footer>
);

export default footer;