import React, { Component } from 'react';
import classes from './Grid.css';
//import Auxiliary from '../../../hoc/Auxiliary';
import Container from '../Container/Container';

class Grid extends Component {
    render() {
        return (
        <Container>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <div></div>
                </div>
                <div className={classes.Median}>
                    <div className={classes.aside}><div></div></div>
                    <div className={classes.main}>
                    {this.props.children}
                    </div>
                    <div className={classes.SideBoard}><div></div></div> 
                </div>
                <div className={classes.footer}>
                    <div></div>
                </div>   
            </div>
        </Container>               
        )
    }
};

export default Grid;

//<div className={classes.aside2 + ' ' + classes.aside}><div></div></div>