import React, { Component } from 'react';
import classes from './ManageUsers.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
import Spinner from '../UserInterface/Spinner/Spinner';
import FetchedUser from './fetchedUser';

class FetchUserByAttribute extends Component {
    componentWillUnmount () {
        this.props.onClearFetchUserByAttributeInfo();
    }

    state = {
        fillError: null,
        type: {
            value: '',
            label: "fetch By", 
            name: "type",
            validation: {
                required: true
            },
            elementConfig: { 
                options: [ 
                    {
                        value: '',
                        displayValue: ''
                    },
                    {
                        value: 'name',
                        displayValue: 'name'
                    },
                    {
                        value: 'email',
                        displayValue: 'email'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        attribute: {
            value: '',
            label: "enter value", 
            name: "attribute",
            validation: {
                required: true
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

        return isValid;
    }


    submitForm = (event) => {
        event.preventDefault();

        if ( this.props.fetchUserByAttributeSuccessInfo && !this.state.type.touched) {
            const typeUpdated = {
                ...this.state.type,
                touched: true,
                valid: false
            }
            this.setState({ type: typeUpdated, fillError: 'Edit New'});

        } else if ( this.state.type.value === '') {
            const typeUpdated = {
                ...this.state.type,
                touched: true,
                valid: false
            }
            this.setState({ type: typeUpdated, fillError: 'Please fill all fields'});

        } else if (this.state.attribute.value === '') {
            const attributeUpdated = {
                ...this.state.attribute,
                touched: true,
                valid: false
            }
            this.setState({ attribute: attributeUpdated, fillError: 'Please fill all fields'});

        } else {
            this.props.onFetchUserByAttribute(this.state.type.value, this.state.attribute.value);

            const attributeReset = {
                ...this.state.attribute,
                value: '',
                touched: false
            }
            
            this.setState({ attribute: attributeReset });
        }
        
    }

    typeChangedHandler = (event) => {

        if(this.props.fetchUserByAttributeSuccessInfo || this.props.fetchUserByAttributeError) {
            this.props.onClearFetchUserByAttributeInfo()
        }

        const typeUpdatedpdated = {
            ...this.state.type,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: true
        }

        this.setState({ type: typeUpdatedpdated, fillError: null});
    }

    attributeChangedHandler = (event) => {
        if(this.props.fetchUserByAttributeSuccessInfo || this.props.fetchUserByAttributeError) {
            this.props.onClearFetchUserByAttributeInfo()
        }
        const updated = {
            ...this.state.attribute,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.attribute.validation),
            touched: true,   
        }
        this.setState({ attribute: updated, fillError: null});  
    }

    render() {

        let displayedUser;

        let formButtonText = 'Submit';
        if(this.props.fetchUserByAttributeLoading) {
            formButtonText = <Spinner isButton/>;
        }

        if(!this.props.fetchUserByAttributeLoading && this.props.fetchUserByAttributeSuccessInfo && this.props.fetchedUser.length > 0) {
            displayedUser = this.props.fetchedUser.map( (user, i) => (
                <FetchedUser 
                key={i}
                id={user._id}
                name={user.name}
                email={user.email}
                specialization={user.specialization}
                accountType={user.accountType}
                isAuthor={user.isAuthor}
                isEditor={user.isEditor}
                isUserManager={user.isUserManager}
                isAssetManager={user.isAssetManager}
                isResearcher={user.isResearcher}
                isArtist={user.isArtist}
                />    
            ))
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Fetch User By Attribute</FormTitle>
                <Form
                submitForm={this.submitForm}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    <Input 
                    label={this.state.type.label} 
                    name={this.state.type.name}
                    value={this.state.type.value}
                    elementType='select'
                    invalid={!this.state.type.valid}
                    shouldValidate={this.state.type.validation}
                    touched={this.state.type.touched}
                    elementConfig={this.state.type.elementConfig}
                    changed={(event) => this.typeChangedHandler(event)}
                    />
                    <Input 
                    label={this.state.attribute.label} 
                    name={this.state.attribute.name}
                    value={this.state.attribute.value}
                    elementType={'textarea'}
                    invalid={!this.state.attribute.valid}
                    shouldValidate={this.state.attribute.validation}
                    touched={this.state.attribute.touched}
                    changed={(event) => this.attributeChangedHandler(event)}
                    />
                    { (!this.state.attribute.valid && this.state.attribute.touched) ||
                      (!this.state.type.valid && this.state.type.touched) ||
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.fetchUserByAttributeError ? 
                        <FormFeedback isFailed>
                            {this.props.fetchUserByAttributeError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.fetchUserByAttributeSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
                <div className={classes.fetchedUserContainer}>{displayedUser}</div>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    fetchUserByAttributeSuccessInfo: state.admin1.fetchUserByAttributeSuccessInfo,
    fetchUserByAttributeError: state.admin1.fetchUserByAttributeError,
    fetchUserByAttributeLoading: state.admin1.fetchUserByAttributeLoading,
    fetchedUser: state.admin1.fetchedUser
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserByAttribute: ( type, attribute ) => dispatch( actions.fetchUserByAttribute( type, attribute ) ),
        onClearFetchUserByAttributeInfo: () => dispatch(actions.clearFetchUserByAttributeInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchUserByAttribute);