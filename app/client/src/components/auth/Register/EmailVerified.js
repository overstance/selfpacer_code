import React, { Component } from 'react';
import classes from './Register.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import PostSubmitDailogue from '../../UserInterface/PostSubmitDialogue/PostSubmitDialogue';
import Spinner from '../../UserInterface/Spinner/Spinner';
import { Link } from 'react-router-dom';

class VerifyEmail extends Component {

    componentDidMount() {
        this.props.onEmailVerified(this.props.match.params.token);
        console.log(this.props.match.params.token);
    }

    render() {

        let content = <Spinner />;

        const successDialogue = 
        <PostSubmitDailogue>
            {this.props.verifyEmailSuccessinfo}
            <Link className={classes.PostSubmitLogin} to='/login'>Go to Login</Link>
        </PostSubmitDailogue>

        const failDialogue = 
        <PostSubmitDailogue>
            {this.props.error}
            <div style={{'marginTop': '10px'}}>Please try again!</div>
        </PostSubmitDailogue>

        if (this.props.verifyEmailSuccessinfo) {
            content = successDialogue;
        }

        if (this.props.error) {
            content = failDialogue;
        }

        return(
            <div className={classes.PostSubmitContainer}>
                <div>{content}</div>
            </div>
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
        onEmailVerified: (token) => dispatch(actions.emailVerified(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);