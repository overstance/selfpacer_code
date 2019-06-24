import React, { Component } from 'react';
import classes from './ReverifyEmail.css';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../UserInterface/Input/Input';
import Button from '../../../UserInterface/Button/Button';
// import PostSubmitDailogue from '../../../Dialogues/PostSubmitDialogue/PostSubmitDialogue';
import Dialogue from '../../../Dialogues/Dialogue/Dialogue';
import Spinner from '../../../UserInterface/Spinner/Spinner';
import Form from '../../../UserInterface/Form/Form';
import FormFeedback from '../../../UserInterface/Form/FormFeedback/FormFeedback';
import GridlessPageWrapper from '../../../UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 


class ReverifyEmail extends Component {
    componentDidMount () {
        if (this.props.emailToVerify === null) {
            this.props.history.push('/login');
        }
    }

    componentWillUnmount() {
        this.props.onClearReverifyEmailError();
    }

    state = {
        fillError: null,
        email: {
            value: this.props.emailToVerify,
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
        <Form 
        className={classes.Form}
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
                <Button btnType='Danger' disabled> verify </Button> :
                <Button btnType='Success'> verify </Button>    
            }
        </Form>
        
        const successDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withGoBackButton
        handleBack={this.handleBack}
        >
            {this.props.reverifyEmailSentInfo}
        </Dialogue>

        const failDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue 
        withGoBackButton 
        handleBack={this.handleBack}
        >
            {this.props.reverifyEmailFailedError}
        </Dialogue>

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
            <GridlessPageWrapper pageTitle='E-mail Verification Required'>
                <div className={classes.ContainerItem}>
                    {content}
                </div >  
            </GridlessPageWrapper>                                
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