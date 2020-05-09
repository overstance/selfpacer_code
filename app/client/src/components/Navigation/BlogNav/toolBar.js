import React from 'react';
import classes from './blogNav.module.css';
import RightNavItems from './RightNavItems';
import MainNavItems from './mainNavItems';
import LowerToolBar from './lowerToolBar';
import { Link } from 'react-router-dom';
import Container from '../../UserInterface/Container/Container';
import Logo from '../../UserInterface/Logo/Logo';

const toolbar = (props) => (
    <header>
        <div className={classes.Container}>
            <Container>
                <div className={classes.Toolbar}>
                    <nav className={classes.leftNavItems}>
                        <Link 
                            to= "/"
                            role="menuitem"
                            aria-label="site logo go home"
                        >
                            <Logo isBlog/>
                        </Link>
                        <MainNavItems 
                            sectionClicked={props.sectionMenuClicked}
                            activeLink={props.activeLink}
                        />
                    </nav>
                    <RightNavItems
                        isAuthenticated={props.isAuth}
                        showBlogSearch={props.showBlogSearch}
                        showBlogSearchOnKey={props.showBlogSearchOnKey}
                        blogSearchTrigger={props.blogSearchTriggerRef}
                    />
                </div>    
            </Container>
        </div>
        { props.blogSearchActive ?
            null :
            <LowerToolBar 
                sectionClicked={props.sectionMenuClicked}
                showBlogSearch={props.showBlogSearch}
                activeLink={props.activeLink}
            />
        }
    </header>   
);

export default toolbar;