import React, { Component } from 'react';
import classes from './AddAdminUsers.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class AddAdminUsers extends Component {

    state = {
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
        } else {
            this.props.onAddAdminUser(this.state.userId.value);
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
                <div className={classes.AdminAction}>ADD ADMIN USER</div>
                <form
                className={classes.Form} 
                onSubmit={this.submitUserHandler}
                >
                    <Input 
                    label={this.state.userId.label} 
                    name={this.state.userId.name}
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
                        <div>
                            <div className={classes.ErrorFeedbackInfo}>
                                {this.props.adminAddError}
                            </div>
                        </div> 
                        :
                        <div>
                            <div className={classes.AddFeedbackInfo}>
                                {this.props.adminUserAddedFeedback}
                            </div>
                        </div> 
                    }
                </form>
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
        onAddAdminUser: ( user_id ) => dispatch( actions.addAdminUser( user_id ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdminUsers);

