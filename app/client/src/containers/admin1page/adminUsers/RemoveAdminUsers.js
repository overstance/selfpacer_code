import React, { Component } from 'react';
import classes from './AddAdminUsers.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';
import Form from '../../../components/UserInterface/Form/Form';
import FormTitle from '../../../components/UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../../../components/UserInterface/Form/FormFeedback/FormFeedback';

class RemoveAdminUsers extends Component {

    state = {
        fillError: null,
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
            this.props.onRemoveAdminUser(this.state.userId.value);
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
                <FormTitle isAdmin>Remove Admin User</FormTitle>
                <Form
                submitForm={this.submitUserHandler}
                >
                    <div className={classes.FillError}>{this.state.fillError}</div>
                    <Input 
                    label={this.state.userId.label} 
                    name={this.state.userId.name}
                    value={this.state.userId.value}
                    elementType={'textarea'}
                    invalid={!this.state.userId.valid}
                    shouldValidate={this.state.userId.validation}
                    touched={this.state.userId.touched}
                    changed={(event) => this.adminUserInputChangedHandler(event)}
                    />
                    { !this.state.userId.valid && this.state.userId.touched ? 
                        <Button btnType='Danger' disabled> Remove </Button> :
                        <Button btnType='Success'> Remove </Button>    
                    }
                    { this.props.adminUserRemoveError ? 
                        <FormFeedback isFailed>
                            {this.props.adminUserRemoveError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.adminUserRemovedFeedback}
                        </FormFeedback>
                    }
                </Form>
            </div>                      
        )
    }
};

const mapStateToProps = state => ({
    adminUserRemovedFeedback: state.admin1.adminUserRemovedFeedback,
    adminUserRemoveError: state.admin1.adminUserRemoveError,
});

const mapDispatchToProps = dispatch => {
    return {
        onRemoveAdminUser: ( user_id ) => dispatch( actions.removeAdminUser( user_id ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAdminUsers);