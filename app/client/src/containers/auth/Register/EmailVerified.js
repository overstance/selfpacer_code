import React, { Component } from 'react';
// import classes from './Register.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
// import PostSubmitDailogue from '../../Dialogues/PostSubmitDialogue/PostSubmitDialogue';
import Dialogue from '../../../components/Dialogues/Dialogue/Dialogue';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
// import { Link } from 'react-router-dom';

class VerifyEmail extends Component {

    componentWillUnmount() {
        this.props.onClearErrors();
    }

    componentDidMount() {
        this.props.onEmailVerified(this.props.match.params.token);
        console.log(this.props.match.params.token);
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {

        let content = <Spinner isComponent/>;

        const successDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/login'
        buttonText='login'
        >
            {this.props.verifyEmailSuccessinfo}
            {/* <Link className={classes.PostSubmitLogin} to='/login'>Go to Login</Link> */}
        </Dialogue>

        const failDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/'
        buttonText='exit'
        >          
            {this.props.error}
            <div style={{'margin': '10px 0'}}>Please try again!</div>
        </Dialogue>

        if (this.props.verifyEmailSuccessinfo) {
            content = successDialogue;
        }

        if (this.props.error) {
            content = failDialogue;
        }

        return(
            <div>{content}</div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    verifyEmailSuccessinfo: state.auth.verifyEmailSuccessinfo
});

const mapDispatchToProps = dispatch => {
    return {
        onEmailVerified: (token) => dispatch(actions.emailVerified(token)),
        onClearErrors: () => dispatch(actions.clearErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);