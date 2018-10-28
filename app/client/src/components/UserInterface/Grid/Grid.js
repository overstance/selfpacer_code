import React, { Component } from 'react';
import classes from './Grid.css';
//import Auxiliary from '../../../hoc/Auxiliary';

class Grid extends Component {
    render() {
        return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div></div>
            </div>
            <div className={classes.main}>
            {this.props.children}
            </div>
            <div className={classes.aside1 + ' ' + classes.aside}><div></div></div>
            <div className={classes.aside2 + ' ' + classes.aside}><div></div></div>
            <div className={classes.footer}>
                <div></div>
            </div>
        </div>               
        )
    }
};

export default Grid;