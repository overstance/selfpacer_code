import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ConfirmResource.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Resource from '../../components/Resource/Resource';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import LoadMorePrompt from '../../components/UserInterface/LoadMorePrompt/LoadMore';

class ConfirmResource extends Component {
    
    componentDidMount() {
        if ( this.props.useTypeContext === '0' || this.props.useTypeContext === '1') {
            this.props.history.push('/');
        } else {
            window.addEventListener('scroll', this.handleScroll, false);

            this.props.onFetchUnconfirmed(0);
        }       
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    state = {
        pageIndex: 0
    }

    handleScroll = () => {
        /* if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
            this.fetchMoreData();
        } */
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) 
            && !this.props.fetchMoreLoading && !this.props.loading) {
            this.fetchMoreData() 
        }
    }

    fetchMoreData(){
        if (this.props.latestFetchLength >= 10) {
            this.setState({
                pageIndex: this.state.pageIndex + 1
            }, () => {
                this.props.onFetchMoreUnconfirmed(this.state.pageIndex, this.props.unconfirmedResources);
            })
            
        }      
    }

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
                isConfirmResources 
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
                category={resource.category}
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
                <div className={classes.Resources}>
                    {unconfirmedResources} 
                </div>
                { this.props.fetchMoreLoading ? <LoadMorePrompt /> : null}
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} />
            </GridlessPageWrapper>  
        );
    };
};

const mapStateToProps = state => {
    return {
        unconfirmedResources: state.resource.unconfirmedResources,
        loading: state.resource.unconfirmredLoading,
        useTypeContext: state.auth.useTypeContext,
        fetchMoreLoading: state.resource.fetchMoreUnconfirmedLoading,
        latestFetchLength: state.resource.unconfirmedLatestFetchLength,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUnconfirmed: (pageIndex) => dispatch(actions.fetchUnconfirmed(pageIndex)),
        onConfirmResource: (resourceId) => dispatch(actions.confirmResource(resourceId)),
        onDeleteUnconfirmedResource: (resourceId) => dispatch(actions.deleteUnconfirmedResource(resourceId)),
        onFetchMoreUnconfirmed: (pageIndex, unconfirmedResources) => dispatch(actions.fetchMoreUnconfirmed( pageIndex, unconfirmedResources))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmResource);