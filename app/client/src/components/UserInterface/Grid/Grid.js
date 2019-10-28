import React, { Component } from 'react';
import classes from './Grid.module.css';
import Container from '../Container/Container'; 

class Grid extends Component {

    render() {

        return (
        <Container>
            <div className={classes.wrapper}>
                <div className={classes.HeadBar} /* page_category={this.props.page_category} */>
                    <div className={classes.HeadBarAdvert}>
                        <div className={classes.adFull} />
                        <div className={classes.adMedium} />
                    </div>
                </div>
                <div className={classes.Median}>
                    <main className={classes.Main}>
                        {this.props.children}
                    </main>
                    <aside className={classes.SideBar}>
                        <div className={classes.sideAd}>
                            <div className={classes.adFullSide}/>
                        </div>
                    </aside> 
                </div>
                <div className={classes.FootBar}>
                    <div className={classes.FootBarAdvert}>
                        <div className={classes.adFull} />
                        <div className={classes.adMedium} />
                    </div>
                </div>   
            </div>
        </Container>               
        )
    }
};

export default Grid;

//<div className={classes.aside2 + ' ' + classes.aside}><div></div></div>