import React from 'react';

import logoImage from '../../assets/images/selfpacer0147.png';
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logoImage} alt='Logo' />
    </div>
);

export default logo;