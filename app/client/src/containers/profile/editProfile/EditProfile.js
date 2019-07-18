import React, { Component } from 'react';
// import classes from './EditProfile.module.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword/ChangePassword';
import EditBio from './EditBio/EditBio';
import GridlessPageWrapper from '../../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper';

class EditProfile extends Component {

    componentDidMount() {
        if(!this.props.accountType) {
            this.props.history.push('/profile');
        }
        this.props.onResetEditProfileMessages();
    }

    state = {
        showChangePasswordForm: false,
    };

    
    render() {
        return (
            <GridlessPageWrapper 
            pageTitle='Edit Profile'
            >
                <EditBio handleBack={this.handleBack} />
                { this.props.facebookUser || this.props.googleUser ? null : <ChangePassword handleBack={this.handleBack} />}    
            </GridlessPageWrapper>                                 
        )
    }
};

const mapStateToProps = state => ({
    facebookUser: state.auth.user.facebookId,
    googleUser: state.auth.user.googleId,
    accountType: state.auth.user.accountType
});

const mapDispatchToProps = dispatch => {
    return {
        onResetEditProfileMessages: () => dispatch( actions.resetEditProfileMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (EditProfile);