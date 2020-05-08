import React, { Component } from 'react';
import classes from './ResetPassword.module.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';
// import PostSubmitDailogue from '../../Dialogues/PostSubmitDialogue/PostSubmitDialogue';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
// import { Link } from 'react-router-dom';
import Dialogue from '../../../components/Dialogues/Dialogue/Dialogue';
import Form from '../../../components/UserInterface/Form/Form';
import GridlessPageWrapper from '../../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 
import FormFeedback from '../../../components/UserInterface/Form/FormFeedback/FormFeedback';

class ResetPassword extends Component {

    componentDidMount() {
        this.props.onConfirmResetToken(this.props.match.params.token);
    }

    state = {
        fillError: null,
        newPassword: {
            value: '',
            elementConfig: {
                type: 'password',
                label: 'Enter New Password',
                labelspan: '(8 char. or more)',
            },
            validation: {
                required: true,
                minLength: 8,
                maxLength: 30
            },
            valid: false,
            touched: false,
        },
        newPasswordReenter: {
            value: '',
            elementConfig: {
                type: 'password',
                label: 'Reenter New Password'
            },
            validation: {
                required: true,
                minLength: 8,
                maxLength: 30
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

    newPasswordInputChangedHandler = (event) => {
        const updated = {
            ...this.state.newPassword,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.newPassword.validation),
            touched: true
        }
        this.setState({ newPassword: updated, fillError: null});
       
    }

    newPasswordReenterInputChangedHandler = (event) => {
        const updated = {
            ...this.state.newPasswordReenter,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.newPasswordReenter.validation),
            touched: true
        }
        this.setState({ newPasswordReenter: updated, fillError: null});
       
    }


    submitResetPasswordHandler = (event) => {
        event.preventDefault();

/*         if (this.props.resetPasswordError && !this.state.password.touched) {
            const passwordUpdated = {
                ...this.state.password,
                touched: true,
                valid: false
            }

            this.setState({ password: passwordUpdated});

        } else */ if ( (!this.state.newPassword.touched || this.state.newPassword.value === '') || (!this.state.newPasswordReenter.touched || this.state.newPasswordReenter.value === '')) {

            const newPasswordUpdated = {
                ...this.state.newPassword,
                touched: true,
                valid: true
            }
            this.setState({ newPassword: newPasswordUpdated});

            const newPasswordReenterUpdated = {
                ...this.state.newPasswordReenter,
                touched: true,
                valid: true
            }
            this.setState({ newPasswordReenter: newPasswordReenterUpdated});

            this.setState({ fillError: 'please fill all fields' });
        } else if(this.state.newPassword.value !== this.state.newPasswordReenter.value) {
            this.setState({ fillError: 'new password does not match!' });

        } else {
            this.props.onResetPassword(this.state.newPassword.value, this.props.match.params.token);
            
            /* const passwordUpdated = {
                ...this.state.password,
                touched: false,
                valid: false
            }

            this.setState({password: passwordUpdated, fillError: null}); */
        }   
    }

    render() {

        let errorMessage = null;
        let fillError = 
        <FormFeedback isFillError>
            {this.state.fillError}
        </FormFeedback>

        if (this.props.resetPasswordError === 'IncorrectPasswordError') {
            errorMessage =
            <FormFeedback isFillError>
                password incorrect
            </FormFeedback> 
        } else if (this.props.resetPasswordError) {
            errorMessage =
            <FormFeedback isFillError>
               {this.props.resetPasswordError}
            </FormFeedback>
        }

        const resetPasswordForm = 
        <Form
        submitForm={this.submitResetPasswordHandler}
        >
            {errorMessage}
            {fillError}
            <Input
                elementConfig={this.state.newPassword.elementConfig} 
                label={this.state.newPassword.elementConfig.label}
                labelspan={this.state.newPassword.elementConfig.labelspan}
                value={this.state.newPassword.value}
                invalid={!this.state.newPassword.valid}
                shouldValidate={this.state.newPassword.validation}
                touched={this.state.newPassword.touched}
                changed={(event) => this.newPasswordInputChangedHandler(event)}
            />
            <Input
                elementConfig={this.state.newPasswordReenter.elementConfig} 
                label={this.state.newPasswordReenter.elementConfig.label}
                value={this.state.newPasswordReenter.value}
                invalid={!this.state.newPasswordReenter.valid}
                shouldValidate={this.state.newPasswordReenter.validation}
                touched={this.state.newPasswordReenter.touched}
                changed={(event) => this.newPasswordReenterInputChangedHandler(event)}
            />
            { (!this.state.newPassword.valid && this.state.newPassword.touched) || (!this.state.newPasswordReenter.valid && this.state.newPasswordReenter.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Submit </Button> :
                <Button btnType='Success'> Submit </Button>    
            }
        </Form>
        
        const successDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/login'
        buttonText='login'
        >
             {this.props.resetPasswordSuccessFeedback}
        </Dialogue>

        const invalidTokenDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/'
        buttonText='exit'
        >          
            {this.props.confirmTokenError}
            <div style={{'marginTop': '10px'}}>Please try again!</div>
        </Dialogue>

        const resetPasswordFailDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/'
        buttonText='exit'
        >          
            {this.props.resetPasswordError}
            <div style={{'marginTop': '10px'}}>Please try again!</div>
        </Dialogue>

        let content = null;
        
        if (this.props.confirmTokenLoading) {
            content = 
            <Spinner isDialogue/>
        }

        if (this.props.comfirmTokenError || !this.props.confirmTokenSuccess) {
            content = invalidTokenDialogue
        }

        if (this.props.confirmTokenSuccess) {
            content = resetPasswordForm;
        }

        if (this.props.resetPasswordLoading) {
            content = 
            <Spinner isDialogue/>
        }

        if( this.props.confirmTokenSuccess && this.props.resetPasswordSuccessFeedback) {
            content = successDialogue
        }

        if( this.props.confirmTokenSuccess && this.props.resetPasswordError) {
            content = resetPasswordFailDialogue
        }

        return ( 
            <GridlessPageWrapper pageTitle='Password Reset'>
                <div className={classes.ContainerItem}>
                    <div>{content}</div>
                </div>
            </GridlessPageWrapper>   
        );
    }
};

const mapStateToProps = state => ({
    resetPasswordError: state.auth.resetPasswordError,
    resetPasswordSuccessFeedback: state.auth.resetPasswordSuccessFeedback,
    resetPasswordLoading: state.auth.resetPasswordLoading,
    confirmTokenSuccess: state.auth.confirmTokenSuccess,
    confirmTokenError: state.auth.confirmTokenError,
    confirmTokenLoading: state.auth.confirmTokenLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (newPassword, token) => dispatch( actions.resetPassword(newPassword, token)),
        onConfirmResetToken: (token) => dispatch(actions.confirmResetToken(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);