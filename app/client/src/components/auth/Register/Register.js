import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logoImage from '../../../assets/images/selfpacer_hareLogo_green.png';
//import Logo from '../../Logo/Logo';
import classes from './Register.css';
import AuthBackdrop from '../../UserInterface/Backdrop/AuthBackdrop';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import facebookLogo from '../../../assets/images/Facebook-2-512.png';
import googleLogo from '../../../assets/images/google_PNG19635.png';
import Input from '../../UserInterface/Input/Input';
import Button from '../../UserInterface/Button/Button';
import * as actions from '../../../store/actions/index';
// import PostSubmitDailogue from '../../UserInterface/PostSubmitDialogue/PostSubmitDialogue';



class Register extends Component {

    componentWillUnmount() {
        this.props.onClearErrors();
    }


    state = {
        fillError: null,
        errors: this.props.validationErrors,
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'name',
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 30
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'email',
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'password',
                    labelspan: '*(8 char. or more)'

                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 30
                },
                valid: false,
                touched: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'confirm password',
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 30
                },
                valid: false,
                touched: false
            }
        },
    }

    /* componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/home');
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

        this.setState({ controls: updatedControls, fillError: null });

    }

    submitHandler = (event) => {
        event.preventDefault();

        if (this.state.controls.name.value === '' && !this.state.controls.name.touched ) {

            const updatedControls = {
                ...this.state.controls,
                name: {
                    ...this.state.controls.name,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'please fill all fields', });
        } else if ( this.state.controls.email.value === '' && !this.state.controls.email.touched) {

            const updatedControls = {
                ...this.state.controls,
                email: {
                    ...this.state.controls.email,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });
        } else if( this.state.controls.password.value === '' && !this.state.controls.password.touched) {

            const updatedControls = {
                ...this.state.controls,
                password: {
                    ...this.state.controls.password,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });
        } else if( this.state.controls.password2.value === '' && !this.state.controls.password2.touched) {

            const updatedControls = {
                ...this.state.controls,
                password2: {
                    ...this.state.controls.password2,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });
        } else if(this.state.controls.password.value !== this.state.controls.password2.value) {
            this.setState({ fillError: 'new password does not match!' });

        } else if ( this.props.error && (!this.state.controls.email.touched )) {           

            const updatedEmailControls = {
                ...this.state.controls,
                email: {
                    ...this.state.controls.email,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedEmailControls });
        } else {
        event.preventDefault();

        const updatedEmailControls = {
            ...this.state.controls,
            email: {
                ...this.state.controls.email,
                touched: false
            }
        };

        this.setState({ controls: updatedEmailControls });
        
        this.props.onClearErrors();
        this.props.onRegisterUser(this.state.controls.name.value, this.state.controls.email.value, this.state.controls.password.value, this.state.controls.password2.value, this.props.history);
        }
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    onValidationError = (name) => {
        if (name === 'name' && this.props.errors) {
            return this.props.errors.name;
        }

        if (name === 'email' && this.props.errors) {
            return this.props.errors.email;
        }

        if (name === 'password' && this.props.errors) {
            return this.props.errors.password;
        }

        if (name === 'password2' && this.props.errors) {
            return this.props.errors.password2;
        }

        if (!this.props.errors) {
            return null;
        }
    };

    /* googleHandler = () => {
        this.props.onGoogleAuth();
    } */

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let formAll = null;
        let RegisterInput = formElementsArray.map(formElement => (
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

        /* const successDialogue = 
        <PostSubmitDailogue>
            {this.props.registerSuccessInfo}
        </PostSubmitDailogue> */

        let errorMessage = null;
        if (this.props.error === 'A user with the given username is already registered') {
            errorMessage = (
                <p className={classes.Error}>A user with the given e-mail exists</p>
            );
        } else if ( this.props.error !== 'A user with the given username is already registered') {
            errorMessage = (
                <p className={classes.Error}>{this.props.error}</p>
            );
        }

        let fillError =
        <p className={classes.Error}>{this.state.fillError}</p>

        formAll = 
        <div className={classes.Register}>
            {fillError}
            {errorMessage}
            <form className={classes.Form} onSubmit={this.submitHandler}>
                {RegisterInput}
                { (!this.state.controls.name.valid && this.state.controls.name.touched) || (!this.state.controls.email.valid && this.state.controls.email.touched)|| (!this.state.controls.password.valid && this.state.controls.password.touched)|| (!this.state.controls.password2.valid && this.state.controls.password2.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> SIGN UP </Button> :
                <Button btnType='Success'> SIGN UP </Button>    
                }
                <div className={classes.Oauth}>
                    <p>Sign up with</p>
                    <a className={classes.Google} href='/auth/google'>
                        <img src={googleLogo} alt='google logo' />
                    </a>
                    <p>or</p>
                    <a className={classes.Facebook} href="/auth/facebook">
                        <img src={facebookLogo} alt='facebook logo' />
                    </a>
                </div>
            </form>
        </div>

        if (this.props.loading) {
            formAll = <div className={classes.Spinner}><Spinner /></div>
        }

        if (this.props.registerSuccessInfo) {
            formAll = <div style={{ 'color': '#8ee630', 'padding': '60px 20px'}}>{this.props.registerSuccessInfo}</div>
        }

        return (
            <div className={classes.UniversalWrapper}>
                <AuthBackdrop show clicked={this.handleBack}/>
                <div className={classes.container}>
                    <a href="/" className={classes.Logo}>
                        {/* <img src={logoImage} alt='logo' /> */}
                    </a>
                    <div className={classes.Menu}>
                        <h2 className={classes.HeaderItem}> SIGN UP</h2>
                    </div>
                    {formAll}
                </div>
            </div>
        )
    }
};

Register.propTypes = {
    onRegisterUser: PropTypes.func.isRequired,
    onClearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    error: PropTypes.object
  };


const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    errors: state.auth.errors,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    registerSuccessInfo: state.auth.registerSuccessInfo
});

const mapDispatchToProps = dispatch => {
    return {
        onRegisterUser: (name, email, password, password2, history) => dispatch(actions.registerUser(name, email, password, password2, history)),
        onClearErrors: () => dispatch(actions.clearErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);


/*      return (
            <AuthBackdrop show>

                <div className={classes.Logo}>
                    <a href="/"><img src={logoImage} alt='logo' /></a>
                </div>
                <div className={classes.container}>
                    <div className={classes.Menu}>
                        <h2 className={classes.HeaderItem}> SIGN UP</h2>
                    </div>
                    <div className={classes.Register}>
                        {errorMessage}
                        <form className={classes.Form} onSubmit={this.submitHandler}>

                            {RegisterInput}
                            <Button btnType='Success'>SIGN UP</Button>
                            <div>
                                <p>Sign-up  with</p>
                                <a href="/auth/google">
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
 */