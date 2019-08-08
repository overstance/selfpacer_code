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

class RemoveAuthorOrEditor extends Component {
    componentWillUnmount () {
        this.props.onClearRemoveAuthorOrEditorInfo();
    }

    state = {
        fillError: null,
        type: {
            value: '',
            label: "select role*", 
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
                        value: 'author',
                        displayValue: 'author'
                    },
                    {
                        value: 'editor',
                        displayValue: 'editor'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        userId: {
            value: '',
            label: "userId*", 
            name: "userId",
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

        if (rules.isUrl) {
            const pattern = /^(ftp|http|https):\/\/[^ "]+$/
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    submitForm = (event) => {
        event.preventDefault();

        if ( this.props.removeAuthorOrEditorSuccessInfo && !this.state.type.touched) {
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
            this.setState({ type: typeUpdated, fillError: 'Please fill asterisked fields'});

        } else if (this.state.userId.value === '') {
            const userIdUpdated = {
                ...this.state.userId,
                touched: true,
                valid: false
            }
            this.setState({ userId: userIdUpdated, fillError: 'Please fill asterisked fields'});

        } else {
            this.props.onRemoveAuthorOrEditor(this.state.type.value, this.state.userId.value);

            const userIdReset = {
                ...this.state.userId,
                value: '',
                touched: false
            }
            
            this.setState({ userId: userIdReset });
        }
        
    }

    typeChangedHandler = (event) => {

        const typeUpdatedpdated = {
            ...this.state.type,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: true
        }

        this.setState({ type: typeUpdatedpdated, fillError: null});
    }

    userIdChangedHandler = (event) => {
        const updated = {
            ...this.state.userId,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.userId.validation),
            touched: true,   
        }
        this.setState({ userId: updated, fillError: null});  
    }

    render() {

        let formButtonText = 'Remove';
        if(this.props.removeAuthorOrEditorLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Remove Author or Editor</FormTitle>
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
                    label={this.state.userId.label} 
                    name={this.state.userId.name}
                    value={this.state.userId.value}
                    elementType={'textarea'}
                    invalid={!this.state.userId.valid}
                    shouldValidate={this.state.userId.validation}
                    touched={this.state.userId.touched}
                    changed={(event) => this.userIdChangedHandler(event)}
                    />
                    { (!this.state.userId.valid && this.state.userId.touched) ||
                      (!this.state.type.valid && this.state.type.touched) ||
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.removeAuthorOrEditorError ? 
                        <FormFeedback isFailed>
                            {this.props.removeAuthorOrEditorError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.removeAuthorOrEditorSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    removeAuthorOrEditorSuccessInfo: state.admin1.removeAuthorOrEditorSuccessInfo,
    removeAuthorOrEditorError: state.admin1.removeAuthorOrEditorError,
    removeAuthorOrEditorLoading: state.admin1.removeAuthorOrEditorLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onRemoveAuthorOrEditor: ( type, userId ) => dispatch( actions.removeAuthorOrEditor( type, userId ) ),
        onClearRemoveAuthorOrEditorInfo: () => dispatch(actions.clearRemoveAuthorOrEditorInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAuthorOrEditor);