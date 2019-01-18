import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './ConfirmResource.css';
import Resource from '../../../components/Resource/Resource';
import Container from '../../../components/UserInterface/Container/Container'


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
        <div className={classes.Container}>
            <div className={classes.Spinner}><Spinner /></div>
        </div>

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
            <div className={classes.PostAddInfo}>
                <div>You have no unconfirmed resources.</div>
            </div>
        }  
        

        return (
            <Container>
                <div style={{'padding': '16px 0'}}>
                    {unconfirmedResources}
                </div>
            </Container>  
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