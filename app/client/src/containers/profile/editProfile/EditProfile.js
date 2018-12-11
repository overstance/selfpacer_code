import React, { Component } from 'react';
import classes from './EditProfile.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import ChangePassword from './ChangePassword/ChangePassword';
import EditBio from './EditBio/EditBio';

class EditProfile extends Component {

    componentDidMount() {
        this.props.onResetEditProfileMessages();
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    state = {
        showChangePasswordForm: false,
    };

    
    render() {
        return (
            <div className={classes.ContentItems}>
                <EditBio handleBack={this.handleBack} />
                <ChangePassword handleBack={this.handleBack} />    
            </div>                                 
        )
    }
};

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onResetEditProfileMessages: () => dispatch( actions.resetEditProfileMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (EditProfile);