import React from 'react';
import classes from './blogNav.module.css';
import RightNavItems from './RightNavItems';
import MainNavItems from './mainNavItems';
import { Link } from 'react-router-dom';
import Container from '../../UserInterface/Container/Container';
import Logo from '../../UserInterface/Logo/Logo';

const toolbar = (props) => (
    <div className={classes.Container}>
        <Container>
            <header className={classes.Toolbar}>
                <div className={classes.leftNavItems}>
                    <Link to= "/">
                        <Logo isBlog/>
                    </Link>
                    <MainNavItems />
                </div>
                <RightNavItems
                    isAuthenticated={props.isAuth}
                />
            </header>
        </Container>
    </div>
);

export default toolbar;