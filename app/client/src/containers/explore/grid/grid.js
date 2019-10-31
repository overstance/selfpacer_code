import React from 'react';
import classes from './grid.module.css';

const grid = (props) => (
    <section className={classes.Wrapper}>
        <main className={classes.Main}>
            {props.children}
        </main>
        <aside className={classes.SideBar}>
            <div className={classes.sideAd}>
                {/* <div className={classes.adFullSide}/> */}
                {props.sideAd}
            </div>
        </aside> 
    </section>
);

export default grid;