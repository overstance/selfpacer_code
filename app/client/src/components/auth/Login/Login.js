import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthBackdrop from '../../UserInterface/Backdrop/AuthBackdrop';
import logoImage from '../../../assets/images/selfpacer0147.png';
import classes from './Login.css';
import facebookLogo from '../../../assets/images/Facebook-2-512.png';
import googleLogo from '../../../assets/images/google_PNG19635.png';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import Input from '../../UserInterface/Input/Input';
import Button from '../../UserInterface/Button/Button';
import * as actions from '../../../store/actions/index';


class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'EMAIL',
                    name: 'username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                errorMessage: null
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

    onValidationError = (name) => {
        if (name === 'email' && this.props.errors) {
            return this.props.errors.username;
        }

        if (name === 'password' && this.props.errors) {
            return this.props.errors.password;
        }

        if (!this.props.errors) {
            return null;
        }
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onClearErrors();
        this.props.onLoginUser(this.state.controls.email.value, this.state.controls.password.value, this.props.history);
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                errorMessage={this.onValidationError(formElement.id)}
            />

        ));


        if (this.props.loading) {
            form = <div className={classes.SpinnerContainer}><Spinner /></div>
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


        return (

            <AuthBackdrop show>
                <div className={classes.Logo}>
                    <a href="/"><img src={logoImage} alt='logo' /></a>
                </div>
                <div className={classes.container}>
                    <div className={classes.Menu}>
                        <h2 className={classes.HeaderItem}>LOG IN</h2>
                    </div>
                    <div className={classes.Login}>
                        {errorMessage}

                        <form className={classes.Form} onSubmit={this.submitHandler}>
                            {form}
                            <Button btnType='Success'>LOG IN</Button>
                            <div>
                                <p>Login with</p>
                                <a href='/auth/google'>
                                    <img className={classes.Google} src={googleLogo} alt='google logo' />
                                </a>
                                <p>or</p>
                                <a href="/auth/facebook">
                                    <img className={classes.Facebook} src={facebookLogo} alt='facebook logo' />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthBackdrop>
        )
    }
};

Login.propTypes = {
    onLoginUser: PropTypes.func.isRequired,
    onClearErrors: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    error: PropTypes.object
  };


const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (email, password, history) => dispatch(actions.loginUser(email, password, history)),
        onClearErrors: () => dispatch(actions.clearErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


