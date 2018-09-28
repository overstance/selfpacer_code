import React, { Component } from 'react';
//import AuthBackdrop from '../../UserInterface/Backdrop/AuthBackdrop/AuthBackdrop';
import classes from './Login.css';
import Logo from '../../Logo/Logo';
//import { withRouter } from 'react-router-dom'
//import { Link } from 'react-router-dom';
import facebookLogo from '../../../assets/images/Facebook-2-512.png';
import googleLogo from '../../../assets/images/google_PNG19635.png';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import Input from '../../UserInterface/Input/Input';
import Button from '../../UserInterface/Button/Button';
import * as actions from '../../../store/actions/index';


class Login extends Component {
    state = {
        errors: this.props.validationErrors,
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'USERNAME'
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'PASSWORD'

                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            }
        }
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/home');
        }
    }

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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onClearErrors();
        this.props.onLoginUser(this.state.controls.username.value, this.state.controls.password.value, this.props.history);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }


        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.elementConfig.label}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));


        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            let incomingMessage = this.props.error.message;

            if (incomingMessage === 'Request failed with status code 401') {
                errorMessage = (
                    <p className={classes.Error}>username/password pair incorrect</p>
                );
            } else {
                errorMessage = (
                    <p className={classes.Error}>{this.props.error.message}</p>
                );
            }
        }

        let validationError = null;
        if (this.props.errors) {
            validationError = (
                <div className={classes.ValidationErrors}>
                    <p>{this.props.errors.username}</p>
                    <p>{this.props.errors.password}</p>
                </div>
            );
        }

        return (
            <div className={classes.content}>
                <div className={classes.Logo}>
                    <a href="/"><Logo /></a>
                </div>
                <div className={classes.container}>
                    <div className={classes.Menu}>
                        <h2 className={classes.HeaderItem}>LOG IN</h2>
                    </div>
                    <div className={classes.Login}>
                        {errorMessage}
                        {validationError}
                        <form className={classes.Form} onSubmit={this.submitHandler}>
                            {form}
                            <Button btnType='Success'>LOG IN</Button>
                            <div>
                                <p>Login with</p>
                                <a href='/auth/google'>
                                    <img className={classes.Google} src={googleLogo} alt='google logo' />
                                </a>
                                <p>or</p>
                                <a href="/">
                                    <img className={classes.Facebook} src={facebookLogo} alt='facebook logo' />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};


const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (username, password, history) => dispatch(actions.loginUser(username, password, history)),
        onClearErrors: () => dispatch(actions.clearErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


