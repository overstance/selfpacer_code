import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthBackdrop from '../../../components/UserInterface/Backdrop/AuthBackdrop';
// import logoImage from '../../../assets/images/selfpacer_hareLogo_green.png';
import classes from './Login.module.css';
// import facebookLogo from '../../../assets/images/Facebook-2-512.png';
// import googleLogo from '../../../assets/images/google_PNG19635.png';
import { connect } from 'react-redux';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';
import * as actions from '../../../store/actions/index';
import { Link } from 'react-router-dom';
import Logo from '../../../components/UserInterface/Logo/Logo';


class Login extends Component {

    componentDidMount() {
        this.props.onSetIsSiteHomeOrAuth();
    }

    componentWillUnmount() {
        this.props.onUnsetIsSiteHomeOrAuth();
        this.props.onClearErrors();
    }
    
    state = {
        fillError: null,
        authorizationError: this.props.error,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'e-mail',
                    labelspan: '*',
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
                    label: 'password',
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        }
    };

    /* componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    } */

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
        this.setState({ controls: updatedControls, fillError: null, authorizationError: null });
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
        if (this.state.controls.email.value === '' && !this.state.controls.email.touched ) {
            event.preventDefault();
            
            // console.log( 'if block');

            const updatedControls = {
                ...this.state.controls,
                email: {
                    ...this.state.controls.email,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'please fill all fields', });

        } else if (this.state.controls.password.value === '' && !this.state.controls.password.touched ) {
            event.preventDefault();

            // console.log( 'else if block 1');
            const updatedControls = {
                ...this.state.controls,
                password: {
                    ...this.state.controls.password,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'please fill all fields', });

        } else if ( this.props.error && (!this.state.controls.email.touched || !this.state.controls.password.touched )) {           
            event.preventDefault();

            const updatedEmailControls = {
                ...this.state.controls,
                email: {
                    ...this.state.controls.email,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedEmailControls });

            const updatedPasswordControls = {
                ...this.state.controls,
                password: {
                    ...this.state.controls.password,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedPasswordControls });

        } else {
            event.preventDefault();
            // console.log( 'else block');

            const updatedEmailControls = {
                ...this.state.controls,
                email: {
                    ...this.state.controls.email,
                    touched: false
                }
            };
            this.setState({ controls: updatedEmailControls });

            const updatedPasswordControls = {
                ...this.state.controls,
                password: {
                    ...this.state.controls.password,
                    touched: false
                }
            };
            this.setState({ controls: updatedPasswordControls });

            this.props.onLoginUser(this.state.controls.email.value, this.state.controls.password.value, this.props.history);
            this.props.onClearErrors();

        }
       
    }

    handleBack = () => {
        this.props.history.goBack()
      }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let formAll = null;
        let LoginInput = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.elementConfig.label}
                labelspan={formElement.config.elementConfig.labelspan}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                errorMessage={this.onValidationError(formElement.id)}
            />

        ));

        let errorMessage = null;
        let fillError =
        <p className={classes.Error}>{this.state.fillError}</p>

        if (this.props.error === 'Request failed with status code 401') {    
            errorMessage = 
            <p className={classes.Error}>username/password pair incorrect</p>
        } else if (this.props.error === 'Please verify your email') {
            errorMessage = 
            <p className={classes.Error}>{this.props.error}</p>
        } else if ( this.props.error !== null && (this.props.error !== 'Request failed with status code 401' || this.props.error !== 'Please verify your email') ) {
            errorMessage = 
                <p className={classes.Error}>Error: Try again</p>
        }

        formAll =
        <div className={classes.Login}>
            {errorMessage}
            {fillError}
            <form className={classes.Form} onSubmit={this.submitHandler}>
                {LoginInput}
                {/* <Button btnType='Success'>LOG IN</Button> */}
                { (!this.state.controls.password.valid && this.state.controls.password.touched) || (!this.state.controls.email.valid && this.state.controls.email.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> LOG IN </Button> :
                <Button btnType='Success'> LOG IN </Button>    
                }
                {/* <div className={classes.Oauth}>
                    <p>Log in with</p>
                    <a className={classes.Google} href='/auth/google'>
                        <img src={googleLogo} alt='google logo' />
                    </a>
                    <p>or</p>
                    <a className={classes.Facebook} href="/auth/facebook">
                        <img src={facebookLogo} alt='facebook logo' />
                    </a>
                </div> */}
                <Link to='/forgot_password' className={classes.ForgotPassword}>Forgot Password?</Link>
                <div className={classes.signUpHere}>
                    <span>Don't have an account?</span>
                    <Link to='/register'>Sign Up Here.</Link>
                </div>
                
            </form>
        </div>

        if (this.props.loading) {
            formAll = 
            <div className={classes.Login}>
                <Spinner isDialogue/>
            </div>
        }

        return (
            <div className={classes.UniversalWrapper}>
                <AuthBackdrop show /* clicked={this.handleBack} */ />
                <div className={classes.container}>
                    <a href="/" className={classes.Logo}>
                        <Logo isAuth/>
                    </a>
                    {formAll}   
                </div>
            </div>
        )
    }
};

Login.propTypes = {
    onLoginUser: PropTypes.func.isRequired,
    onClearErrors: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    /* errors: PropTypes.object,
    error: PropTypes.object */
  };


const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
    return {
        onSetIsSiteHomeOrAuth: () => dispatch(actions.setIsSiteHome()),
        onUnsetIsSiteHomeOrAuth: () => dispatch(actions.unsetIsSiteHome()),
        onLoginUser: (email, password, history) => dispatch(actions.loginUser(email, password, history)),
        onClearErrors: () => dispatch(actions.clearErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


