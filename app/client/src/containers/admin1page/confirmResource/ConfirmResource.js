import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ConfirmResource.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import Resource from '../../../components/Resource/Resource';
import PostActionInfo from '../../../components/PostActionInfo/PostActionInfo';
import GridlessPageWrapper from '../../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'


class ConfirmResource extends Component {
    
    componentDidMount() {
        this.props.onFetchUnconfirmed();
    }

    state = {}

    confirmResourceHandler = ( resourceId ) => {
        this.props.onConfirmResource(resourceId)
    }

    deleteUnconfirmedResourceHandler = ( resourceId ) => {
        this.props.onDeleteUnconfirmedResource(resourceId)    
    }

    render() {
       
        let unconfirmedResources = 
        <Spinner isComponent/>

        if (!this.props.loading) {
            unconfirmedResources = this.props.unconfirmedResources.map( (resource, i) => (
                <Resource 
                key={i}
                id={resource._id} 
                link={resource.link}
                image={resource.img}
                title={resource.title}
                likes={resource.likes}
                lastUpdated={resource.lastUpdated}
                avgRating={resource.avgRating}
                tutor={resource.tutor}
                enrollees={resource.enrollees}
                duration={resource.duration}
                level={resource.level}
                author={resource.author}
                youtubeViews={resource.youtubeviews}
                publishDate={resource.publishDate}
                source={resource.source}
                type={resource.type}
                videoCount={resource.videoCount}
                confirmClicked={() => this.confirmResourceHandler( resource._id )}
                deleteClicked={() => this.deleteUnconfirmedResourceHandler( resource._id )}
                dateAdded={new Date(resource.dateAdded).toLocaleDateString()}
                toConfirm
                deletable
                />
            ));
        }
        
        if (!this.props.loading && this.props.unconfirmedResources.length === 0) {
            unconfirmedResources =
            <PostActionInfo isSuccess>
                You have no unconfirmed resources.
            </PostActionInfo>
        }  
        

        return (
            <GridlessPageWrapper pageTitle='Confirm Resources'>
                <div classesName={classes.Resources}>
                    {unconfirmedResources} 
                </div>
            </GridlessPageWrapper>  
        );
    };
};

const mapStateToProps = state => {
    return {
        unconfirmedResources: state.resource.unconfirmedResources,
        loading: state.resource.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUnconfirmed: () => dispatch(actions.fetchUnconfirmed()),
        onConfirmResource: (resourceId) => dispatch(actions.confirmResource(resourceId)),
        onDeleteUnconfirmedResource: (resourceId) => dispatch(actions.deleteUnconfirmedResource(resourceId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmResource);