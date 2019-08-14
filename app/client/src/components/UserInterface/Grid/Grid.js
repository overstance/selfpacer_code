import React, { Component } from 'react';
import classes from './Grid.module.css';
import Container from '../Container/Container';
import Ad728By90 from '../../../assets/art/head-art/ad_728X90.png';
import Ad468By60 from '../../../assets/art/head-art/ad_468X60.png';
import Ad320By100 from '../../../assets/art/head-art/ad_320X100.png'; 

class Grid extends Component {

    render() {

        let attachedClasses = [classes.HeadBar];

        if (this.props.page_category === 'Explore') {
            attachedClasses = [classes.HeadBar, classes.ExplorePage];
        }

        if (this.props.page_category === 'Business') {
            attachedClasses = [classes.HeadBar, classes.BusinessPage];
        }

        if (this.props.page_category === 'Creative') {
            attachedClasses = [classes.HeadBar, classes.CreativePage];
        }

        if (this.props.page_category === 'Technology') {
            attachedClasses = [classes.HeadBar, classes.TechnologyPage];
        }

        if (this.props.page_category === 'Life-style') {
            attachedClasses = [classes.HeadBar, classes.LifeStylePage];
        }

        if (this.props.page_category === 'Science') {
            attachedClasses = [classes.HeadBar, classes.SciencePage];
        }

        return (
        <Container>
            <div className={classes.wrapper}>
                <div className={attachedClasses.join(' ')} page_category={this.props.page_category}>
                    <div className={classes.HeadBarAdvert}>
                        <img className={classes.LongAdvert} src={Ad728By90} alt='advert' />
                        <img className={classes.ShortAdvert} src={Ad320By100} alt='mobile advert' />
                    </div>
                </div>
                <div className={classes.Median}>
                    <div className={classes.Main}>
                        {this.props.children}
                    </div>
                    <div className={classes.SideBar}><div></div></div> 
                </div>
                <div className={classes.FootBar}>
                    <div className={classes.FootBarAdvert}>
                        <img className={classes.LongAdvert} src={Ad468By60} alt='advert' />
                        <img className={classes.ShortAdvert} src={Ad320By100} alt='mobile advert' />
                    </div>
                </div>   
            </div>
        </Container>               
        )
    }
};

export default Grid;

//<div className={classes.aside2 + ' ' + classes.aside}><div></div></div>