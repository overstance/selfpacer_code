import React from 'react';
import classes from './blogNav.module.css';
import RightNavItems from './RightNavItems';
import MainNavItems from './mainNavItems';
import LowerToolBar from './lowerToolBar';
import { Link } from 'react-router-dom';
import Container from '../../UserInterface/Container/Container';
import Logo from '../../UserInterface/Logo/Logo';

const toolbar = (props) => (
    <div>
        <div className={classes.Container}>
            <Container>
                <header className={classes.Toolbar}>
                    <div className={classes.leftNavItems}>
                        <Link to= "/">
                            <Logo isBlog/>
                        </Link>
                        <MainNavItems sectionClicked={props.sectionMenuClicked}/>
                    </div>
                    <RightNavItems
                        isAuthenticated={props.isAuth}
                    />
                </header>    
            </Container>
        </div>
        <LowerToolBar sectionClicked={props.sectionMenuClicked}/>
    </div>   
);

export default toolbar;