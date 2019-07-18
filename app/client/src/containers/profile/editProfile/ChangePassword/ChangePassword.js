import React, { Component } from 'react';
import classes from './ChangePassword.module.css';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../../components/UserInterface/Input/Input';
import Button from '../../../../components/UserInterface/Button/Button';
// import PostSubmitDailogue from '../../../../components/Dialogues/PostSubmitDialogue/PostSubmitDialogue';
import Spinner from '../../../../components/UserInterface/Spinner/Spinner';
import Dialogue from '../../../../components/Dialogues/Dialogue/Dialogue';
import Form from '../../../../components/UserInterface/Form/Form';

class ChangePassword extends Component {

    state = {
        showChangePasswordForm: false,
        changePasswordFillError: null,
        password: {
            value: '',
            elementConfig: {
                type: 'password',
                label: 'Enter Password'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
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

    passwordInputChangedHandler = (event) => {
        const updated = {
            ...this.state.password,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.password.validation),
            touched: true
        }
        this.setState({ password: updated, changePasswordFillError: null, changePasswordError: null});
       
    }

    newPasswordInputChangedHandler = (event) => {
        const updated = {
            ...this.state.newPassword,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.newPassword.validation),
            touched: true
        }
        this.setState({ newPassword: updated, changePasswordFillError: null});
       
    }

    newPasswordReenterInputChangedHandler = (event) => {
        const updated = {
            ...this.state.newPasswordReenter,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.newPasswordReenter.validation),
            touched: true
        }
        this.setState({ newPasswordReenter: updated, changePasswordFillError: null});
       
    }


    submitChangePasswordHandler = (event) => {
        event.preventDefault();

        if (this.props.changePasswordError && !this.state.password.touched) {
            const passwordUpdated = {
                ...this.state.password,
                touched: true,
                valid: false
            }

            this.setState({ password: passwordUpdated});

        } else if ((!this.state.password.touched || this.state.password.value === '') || (!this.state.newPassword.touched || this.state.newPassword.value === '') || (!this.state.newPasswordReenter.touched || this.state.newPasswordReenter.value === '')) {
            const passwordUpdated = {
                ...this.state.password,
                touched: true,
                valid: true
            }
            this.setState({ password: passwordUpdated});

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

            this.setState({ changePasswordFillError: 'please fill all fields' });
        } else if(this.state.newPassword.value !== this.state.newPasswordReenter.value) {
            this.setState({ changePasswordFillError: 'new password does not match!' });

        } else if ( this.state.password.value === this.state.newPassword.value) {

            this.setState({ changePasswordFillError: 'new password same as old!' });

        } else {
            this.props.onChangePassword(this.state.password.value, this.state.newPassword.value, this.props.user);
            
            const passwordUpdated = {
                ...this.state.password,
                touched: false,
                valid: false
            }

            this.setState({password: passwordUpdated, changePasswordFillError: null});
        }   
    }

    showFormHandler = (event) => {
        this.setState({ showChangePasswordForm: true });
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {

        let errorMessage = null;
        let fillError = <div className={classes.FillError}>{this.state.changePasswordFillError}</div>

        if (this.props.changePasswordError === 'IncorrectPasswordError') {
            errorMessage = <div className={classes.FillError}>password incorrect</div>
        } else if (this.props.changePasswordError) {
            errorMessage = <div className={classes.FillError}>{this.props.changePasswordError}</div>
        }

        const changePasswordForm = 
        <Form
        submitForm={this.submitChangePasswordHandler}
        >
            {errorMessage}
            {fillError}
            <Input
                elementConfig={this.state.password.elementConfig} 
                label={this.state.password.elementConfig.label}
                value={this.state.password.value}
                invalid={!this.state.password.valid}
                shouldValidate={this.state.password.validation}
                touched={this.state.password.touched}
                changed={(event) => this.passwordInputChangedHandler(event)}
            />
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
            { (!this.state.password.valid && this.state.password.touched) || (!this.state.newPassword.valid && this.state.newPassword.touched) || (!this.state.newPasswordReenter.valid && this.state.newPasswordReenter.touched) || this.state.changePasswordFillError ? 
                <Button btnType='Danger' disabled> Submit </Button> :
                <Button btnType='Success'> Submit </Button>    
            }
        </Form>
        
        const successDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/profile'
        buttonText='go back'
        >
            {this.props.changePasswordSuccessFeedback}
        </Dialogue>

        let content = changePasswordForm;
        
        if (this.props.loading) {
            content = 
            <div className={classes.Form}>
                <Spinner />
            </div>

        }

        if (this.props.changePasswordSuccessFeedback === 'password changed') {
            content = successDialogue;
        }

        return ( 
            <div className={classes.ContainerItem}>
                <div className={classes.ChangePassword}>
                    <Button btnType='Success' clicked={this.showFormHandler}>Change password</Button> 
                </div>
                { this.state.showChangePasswordForm ? <div>{content}</div> : null}
            </div>   
        );
    }
};

const mapStateToProps = state => ({
    changePasswordError: state.profile.changePasswordError,
    changePasswordSuccessFeedback: state.profile.changePasswordSuccessFeedback,
    loading: state.profile.changePasswordLoading,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (oldPassword, newPassword, user) => dispatch( actions.changePassword(oldPassword, newPassword, user) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ChangePassword);

/*
{ this.props.changePasswordError ? 
                <div>
                    <div className={classes.ErrorFeedbackInfo}>
                        {this.props.changePasswordError}
                    </div>
                </div> 
                :
                <div>
                    <div className={classes.AddFeedbackInfo}>
                        {this.props.changePasswordSuccessFeedback}
                    </div>
                </div> 
            }
*/