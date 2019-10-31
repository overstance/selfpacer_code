import React, { Component } from 'react';
import classes from './topSection.module.css';
import {connect} from 'react-redux';
import Resource from '../resource/resource';

class RecentlyViewed extends Component {

    render() {

        let resourcesArray =
        [
            {
                category: "Accounting",
                img: "https://i.ytimg.com/vi/5eGRi66iUfU/mqdefault.jpg",
                source: "youtube.com youtube.com youtube.com",
                title: "Introduction to Corporate Finance - FREE Course | Corporate Finance Institute | Corporate Finance Institute",
                type: "youtube#video",
                youtubelikes: "3,944",
                __v: 0,
                _id: "5c3b839c63b8c51434c95e9c"
            },
            {
                category: "Accounting",
                img: "https://i.ytimg.com/vi/j34otrXr-RQ/mqdefault.jpg",
                source: "youtube.com",
                title: "Strategic Management Control Systems",
                type: "youtube#playlist",
                videoCount: "47",
                __v: 0,
                _id: "5c3b837563b8c51434c95e98"
            },
            {
                avgRating: "4.5",
                category: "Accounting",
                img: "https://udemy-images.udemy.com/course/480x270/888716_4225_6.jpg",
                source: "udemy.com",
                title: "Introduction to Finance, Accounting, Modeling and Valuation",
                type: "mooc",
                __v: 0,
                _id: "5c3b84fd63b8c51434c95e9f"
            },
            {
                avgRating: "4",
                category: "Accounting",
                img: "https://images-na.ssl-images-amazon.com/images/I/41%2B4d6KCtAL._SX299_BO1,204,203,200_.jpg",
                source: "amazon.com",
                title: "Accounting Made Simple",
                type: "books",
                __v: 0,
                _id: "5c3b85fb63b8c51434c95ea1"
            }
        ];

        let resources = resourcesArray.map((resource, i) => (
            <Resource 
                key={i}
                category={resource.category}
                img={resource.img}
                source={resource.source}
                type={resource.type}
                id={resource._id}
                title={resource.title}
                avgRating={resource.avgRating}
                youtubelikes={resource.youtubelikes}
                videoCount={resource.videoCount}
            />
        ))


        return(
            <div className={classes.recentlyViewedContainer}>
                <h2>Recently viewed resources</h2>
                <div className={classes.recentlyViewed}>
                    {resources}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userRecentlyViewed: state.auth.user.recentlyViewed,
        visitorRecentlyViewed: state.auth.visitorRecentlyViewed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewed);