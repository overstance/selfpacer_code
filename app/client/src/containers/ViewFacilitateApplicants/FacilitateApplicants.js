import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './FacilitateApplicants.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import User from '../../components/User/User';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import LoadMorePrompt from '../../components/UserInterface/LoadMorePrompt/LoadMore';

class FacilitateApplicants extends Component {
    
    componentDidMount() {
        if ( this.props.useTypeContext === '0' || this.props.useTypeContext === '1') {
            this.props.history.push('/');
        } else {
            window.addEventListener('scroll', this.handleScroll, false);

            this.props.onFetchFacilitateApplicants(0);
        }       
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    state = {
        pageIndex: 0
    }

    handleScroll = () => {
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
                this.props.onFetchMoreFacilitateApplicants(this.state.pageIndex, this.props.facilitateApplicants);
            })
            
        }      
    }

    approveHandler = ( userId ) => {
        this.props.onApproveFacilitateApplicant(userId, this.props.facilitateApplicants)
    }

    disapproveHandler = ( userId ) => {
        this.props.onDisapproveFacilitateApplicant(userId, this.props.facilitateApplicants)    
    }

    render() {
       
        let facilitateApplicants = 
        <Spinner isComponent/>

        if (!this.props.loading) {
            facilitateApplicants = this.props.facilitateApplicants.map( (user, i) => (
                <User
                key={i}
                id={user._id} 
                name={user.name}
                email={user.email}
                specialization={user.specialization}
                workUrl1={user.workUrl1}
                workUrl2={user.workUrl2}
                applicationDate={new Date(user.dateOfFacilitateApplication).toLocaleDateString()}
                joinDate={new Date(user.date).toLocaleDateString()}                
                approve={() => this.approveHandler( user._id )}
                disapprove={() => this.disapproveHandler( user._id )}
                />
            ));
        }
        
        if (!this.props.loading && this.props.facilitateApplicants.length === 0) {
            facilitateApplicants =
            <PostActionInfo isSuccess>
                There is no applicant.
            </PostActionInfo>
        }  
        

        return (
            <GridlessPageWrapper pageTitle='Faciliate Applicants'>
                <div className={classes.Resources}>
                    {facilitateApplicants} 
                </div>
                { this.props.fetchMoreLoading ? <LoadMorePrompt /> : null}
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} />
            </GridlessPageWrapper>  
        );
    };
};

const mapStateToProps = state => {
    return {
        facilitateApplicants: state.admin1.facilitateApplicants,
        loading: state.admin1.unconfirmedLoading,
        fetchFacilitateApplicantsError: state.admin1.fetchFacilitateApplicantsError,
        useTypeContext: state.auth.useTypeContext,
        fetchMoreLoading: state.admin1.fetchMoreFacilitateApplicantsLoading,
        latestFetchLength: state.admin1.latestFetchFaciliteApplicantLength,
        /* 
        confirmResourceLoading: state.resource.confirmResourceLoading,
        confirmResourceError: state.resource.confirmResourceError,
        deleteUnconfirmedError: state.resource.deleteUnconfirmedError,
        deleteUnconfirmedLoading: state.resource.deleteUnconfirmedLoading,        
        */
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFacilitateApplicants: (pageIndex) => dispatch(actions.fetchFacilitateApplicants(pageIndex)),
        onFetchMoreFacilitateApplicants: (pageIndex, facilitateApplicants) => dispatch(actions.fetchMoreFacilitateApplicants(pageIndex, facilitateApplicants)),
        onApproveFacilitateApplicant: (userId, facilitateApplicants) => dispatch(actions.approveFacilitateApplicant(userId, facilitateApplicants)),
        onDisapproveFacilitateApplicant: (userId, facilitateApplicants) => dispatch(actions.disapproveFacilitateApplicant(userId, facilitateApplicants))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilitateApplicants);