import React, { Component } from 'react';
import classes from './ForgotPassword.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../UserInterface/Input/Input';
import Button from '../../UserInterface/Button/Button';
import Spinner from '../../UserInterface/Spinner/Spinner';
import Dialogue from '../../Dialogues/Dialogue/Dialogue';
import Form from '../../UserInterface/Form/Form';
import FormFeedback from '../../UserInterface/Form/FormFeedback/FormFeedback';
import GridlessPageWrapper from '../../UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 

class ForgotPassword extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();
    } */
    componentWillUnmount() {
        this.props.onClearForgetPasswordError();
    }

    state = {
        fillError: null,
        email: {
            value: '',
            label: "Enter your e-mail", 
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

        if (!this.state.email.touched || this.state.email.value === '') {
            const emailUpdated = {
                ...this.state.email,
                touched: true,
                valid: true
            }
            this.setState({ email: emailUpdated});

            this.setState({ fillError: 'Please enter e-mail' });
        } else {
            this.props.onForgotPassword(this.state.email.value);
            
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

        const editBioForm = 
        <Form
        submitForm={this.submitHandler}
        >
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
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
                <Button btnType='Danger' disabled> Submit </Button> :
                <Button btnType='Success'> Submit </Button>    
            }
        </Form>
        
        const successDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withGoBackButton
        handleBack={this.handleBack}
        >
            {this.props.emailSentInfo}
        </Dialogue>

        const failDialogue =
        <Dialogue
        isPostSubmitDialogue
        showDialogue 
        withGoBackButton 
        handleBack={this.handleBack}
        >
            {this.props.emailSendFailedError}
        </Dialogue> 

        let content = editBioForm;
        
        if (this.props.forgotPasswordloading) {
            content = 
            <Spinner isDialogue/>
        }

        if (this.props.emailSentInfo) {
            content = successDialogue;
        }

        if (this.props.emailSendFailedError) {
            content = failDialogue
        }

        return (
                <GridlessPageWrapper pageTitle='Forgot Password'>
                    <div className={classes.ContainerItem}>
                        {content}
                    </div>
                </GridlessPageWrapper >                               
        )
    }
};

const mapStateToProps = state => ({
    emailSentInfo: state.auth.emailSentInfo,
    emailSendFailedError: state.auth.emailSendFailedError,
    forgotPasswordloading: state.auth.forgotPasswordLoading,

});

const mapDispatchToProps = dispatch => {
    return {
        onForgotPassword: (name) => dispatch( actions.forgotPassword(name) ),
        onClearForgetPasswordError: () => dispatch( actions.clearForgetPasswordError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ForgotPassword);