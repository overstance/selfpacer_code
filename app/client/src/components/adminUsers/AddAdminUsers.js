import React, { Component } from 'react';
import classes from './AddAdminUsers.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';

class AddAdminUsers extends Component {

    state = {
        userId: {
            fillError: null,
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

    submitUserHandler = (event) => {
        event.preventDefault();

        if (!this.state.userId.touched || this.state.userId.value === '') {
            const updated = {
                ...this.state.userId,
                touched: true,
                valid: false
            }
        this.setState({ userId: updated});

        this.setState({ fillError: 'Please fill all fields' });
        } else {
            this.props.onAddAdminUser(this.state.userId.value, 'Administrator');
            const updated = {
                ...this.state.userId,
                value: '',
                touched: false
            }
            this.setState({ userId: updated});
        }
        
    };

    
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
        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Add Admin User</FormTitle>
                <Form 
                submitForm={this.submitUserHandler}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
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
                        <Button btnType='Danger' disabled> Add </Button> :
                        <Button btnType='Success'> Add </Button>    
                    }
                    { this.props.adminAddError ? 
                        <FormFeedback isFailed>
                            {this.props.adminAddError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.adminUserAddedFeedback}
                        </FormFeedback>
                    }
                </Form>
            </div>                      
        )
    }
};

const mapStateToProps = state => ({
    adminUserAddedFeedback: state.admin1.userAddedFeedback,
    adminAddError: state.admin1.adminAddError,
});

const mapDispatchToProps = dispatch => {
    return {
        onAddAdminUser: ( user_id, newAccountType ) => dispatch( actions.addAdminUser( user_id, newAccountType ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdminUsers);

