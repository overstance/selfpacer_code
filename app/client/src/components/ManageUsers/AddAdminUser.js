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

class AddAdminUser extends Component {

    state = { 
        fillError: null,
        type: {
            value: '',
            label: "select user level*", 
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
                        value: 'User',
                        displayValue: 'User'
                    },
                    {
                        value: 'Facilitator',
                        displayValue: 'Facilitator'
                    },
                    {
                        value: 'Editor',
                        displayValue: 'Editor'
                    },
                    {
                        value: 'Administrator',
                        displayValue: 'Administrator'
                    },
                    {
                        value: 'Senior Administrator',
                        displayValue: 'Senior Administrator'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        userId: {
            value: '',
            label: 'Enter User Id',
            name: 'userId',
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

    submitUserHandler = (event) => {
        event.preventDefault();

        if (!this.state.userId.touched || this.state.userId.value === '') {
            const updated = {
                ...this.state.userId,
                touched: true,
                valid: false
            }

            this.setState({ fillError: 'Please fill all fields', userId: updated });
        } else if (!this.state.type.touched || this.state.type.value === '') {
            const updated = {
                ...this.state.type,
                touched: true,
                valid: false
            }

            this.setState({ fillError: 'Please fill all fields', type: updated });
        } else {
            this.props.onAddAdminUser(this.state.userId.value, this.state.type.value);
            const updated = {
                ...this.state.userId,
                value: '',
                touched: false
            }
            this.setState({ userId: updated});
        }
        
    };

    typeChangedHandler = (event) => {
        const typeUpdatedpdated = {
            ...this.state.type,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: true
        }

        this.setState({ type: typeUpdatedpdated, isEditorRole: false, fillError: null});   
    }

    
    adminUserInputChangedHandler = (event) => {
        const updated = {
            ...this.state.userId,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.userId.validation),
            touched: true
        }
        this.setState({ userId: updated});   
    }

    render() {

        let formButtonText = 'Add';
        if(this.props.addAdminUserLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Add Or Remove Admin</FormTitle>
                <Form 
                submitForm={this.submitUserHandler}
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
                    label={this.state.userId.label} 
                    name={this.state.userId.name}
                    elementType={'textarea'}
                    value={this.state.userId.value}
                    invalid={!this.state.userId.valid}
                    shouldValidate={this.state.userId.validation}
                    touched={this.state.userId.touched}
                    changed={(event) => this.adminUserInputChangedHandler(event)}
                    />
                    { !this.state.userId.valid && this.state.userId.touched ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.addAdminError ? 
                        <FormFeedback isFailed>
                            {this.props.addAdminError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.addAdminSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div>                      
        )
    }
};

const mapStateToProps = state => ({
    addAdminSuccessInfo: state.admin1.addAdminSuccessInfo,
    addAdminError: state.admin1.addAdminError,
    addAdminUserLoading: state.admin1.addAdminUserLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onAddAdminUser: ( user_id, newAccountType ) => dispatch( actions.addAdminUser( user_id, newAccountType ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdminUser);

