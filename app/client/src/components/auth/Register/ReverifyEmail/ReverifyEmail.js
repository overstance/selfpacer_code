import React, { Component } from 'react';
import classes from './ReverifyEmail.css';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../UserInterface/Input/Input';
import Button from '../../../UserInterface/Button/Button';
import PostSubmitDailogue from '../../../UserInterface/PostSubmitDialogue/PostSubmitDialogue';
import Spinner from '../../../UserInterface/Spinner/Spinner';

class ReverifyEmail extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();
    } */
    componentWillUnmount() {
        this.props.onClearReverifyEmailError();
    }

    state = {
        fillError: null,
        email: {
            value: this.props.emailToVerify,
            /* label: "Enter your e-mail", */ 
            name: "email",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();

        if (!this.state.email.touched && this.state.email.value === '') {
            const emailUpdated = {
                ...this.state.email,
                touched: true,
                valid: true
            }
            this.setState({ email: emailUpdated});

            this.setState({ fillError: 'Please enter e-mail' });
        } else {
            this.props.onReverifyEmail(this.state.email.value);
            
            const emailReset = {
                    ...this.state.email,
                    value: ''
                }
            
            this.setState({ email: emailReset});
        }
        
    }

    inputChangedHandler = (event) => {
        const updated = {
            ...this.state.email,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.email.validation),
            touched: true,   
        }
        this.setState({ email: updated, fillError: null});  
    }

    handleBack = () => {
        this.props.history.goBack()
    }


    render() {

        const reverifyForm = 
        <form 
        className={classes.Form}
        onSubmit={this.submitHandler}
        >
            <div className={classes.FillError}>{this.state.fillError}</div>
            <Input
            label={this.state.email.label} 
            name={this.state.email.name}
            value={this.state.email.value}
            invalid={!this.state.email.valid}
            shouldValidate={this.state.email.validation}
            touched={this.state.email.touched}
            changed={(event) => this.inputChangedHandler(event)}
            />
            
            { (!this.state.email.valid && this.state.email.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Verify </Button> :
                <Button btnType='Success'> Verify </Button>    
            }
        </form>
        
        const successDialogue = 
        <PostSubmitDailogue>
            {this.props.reverifyEmailSentInfo}
        </PostSubmitDailogue>

        const failDialogue = 
        <PostSubmitDailogue withGoBackButton handleBack={this.handleBack}>
            {this.props.reverifyEmailFailedError}
        </PostSubmitDailogue>

        let content = reverifyForm;
        
        if (this.props.loading) {
            content = 
            <div className={classes.Form}>
                <Spinner />
            </div>
        }

        if (this.props.reverifyEmailSentInfo) {
            content = successDialogue;
        }

        if (this.props.reverifyEmailFailedError) {
            content = failDialogue
        }

        return (
                <div className={classes.ContainerItem}>
                    <div className={classes.AdminAction}>E-MAIL VERIFICATION REQUIRED</div>
                    {content}
                </div >                               
        )
    }
};

const mapStateToProps = state => ({
    emailToVerify: state.auth.emailToVerify,
    loading: state.auth.reverifyEmailLoading,
    reverifyEmailSentInfo: state.auth.reverifyEmailSentInfo,
    reverifyEmailFailedError: state.auth.reverifyEmailFailedError


});

const mapDispatchToProps = dispatch => {
    return {
        onReverifyEmail: (email) => dispatch( actions.reverifyEmail(email) ),
        onClearReverifyEmailError: () => dispatch( actions.clearReverifyEmailError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ReverifyEmail);