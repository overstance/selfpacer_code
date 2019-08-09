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

class AddAuthorOrEditor extends Component {
    componentWillUnmount () {
        this.props.onClearAddAuthorOrEditorInfo();
    }

    state = {
        fillError: null,
        isEditorRole: false,
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
        },
        twitterUrl: {
            value: '',
            label: "twitterUrl", 
            name: "twitterUrl",
            validation: {
                isUrl: true
            },
            valid: false,
            touched: false,
        },
        facebookUrl: {
            value: '',
            label: "facebookUrl", 
            name: "facebookUrl",
            validation: {
                isUrl: true
            },
            valid: false,
            touched: false,
        },
        linkedinUrl: {
            value: '',
            label: "linkedinUrl", 
            name: "linkedinUrl",
            validation: {
                isUrl: true
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

        if ( this.props.addAuthorOrEditorSuccessInfo && !this.state.type.touched) {
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
            this.props.onAddAuthorOrEditor(this.state.type.value, this.state.userId.value, this.state.twitterUrl.value, this.state.facebookUrl.value, this.state.linkedinUrl.value);

            const userIdReset = {
                ...this.state.userId,
                value: '',
                touched: false
            }

            const twitterUrlReset = {
                ...this.state.twitterUrl,
                value: '',
                touched: false
            }

            const facebookUrlReset = {
                ...this.state.facebookUrl,
                value: '',
                touched: false
            }

            const linkedinUrlReset = {
                ...this.state.linkedinUrl,
                value: '',
                touched: false
            }
            
            this.setState({ userId: userIdReset, twitterUrl: twitterUrlReset, facebookUrl: facebookUrlReset, linkedinUrl: linkedinUrlReset });
        }
        
    }

    typeChangedHandler = (event) => {
        if (event.target.value === 'editor') {
            const typeUpdatedpdated = {
                ...this.state.type,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.type.validation),
                touched: true
            }
    
            this.setState({ type: typeUpdatedpdated, isEditorRole: true, fillError: null});
        } else {
            const typeUpdatedpdated = {
                ...this.state.type,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.type.validation),
                touched: true
            }
    
            this.setState({ type: typeUpdatedpdated, isEditorRole: false, fillError: null});
        }    
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

    twitterUrlChangedHandler = (event) => {

        if (event.target.value === '') {
            const updated = {
                ...this.state.twitterUrl,
                value: event.target.value,
                valid: true,
                touched: true,   
            }
            this.setState({ twitterUrl: updated, fillError: null}); 
        } else {
            const updated = {
                ...this.state.twitterUrl,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.twitterUrl.validation),
                touched: true,   
            }
            this.setState({ twitterUrl: updated, fillError: null});
        }     
    }

    facebookUrlChangedHandler = (event) => {

        if (event.target.value === '') {
            const updated = {
                ...this.state.facebookUrl,
                value: event.target.value,
                valid: true,
                touched: true,   
            }
            this.setState({ facebookUrl: updated, fillError: null});
        } else {
            const updated = {
                ...this.state.facebookUrl,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.facebookUrl.validation),
                touched: true,   
            }
            this.setState({ facebookUrl: updated, fillError: null});
        }
          
    }

    linkedinUrlChangedHandler = (event) => {
        if (event.target.value === '') {
            const updated = {
                ...this.state.linkedinUrl,
                value: event.target.value,
                valid: true,
                touched: true,   
            }
            this.setState({ linkedinUrl: updated, fillError: null});
        } else {
            const updated = {
                ...this.state.linkedinUrl,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.linkedinUrl.validation),
                touched: true,   
            }
            this.setState({ linkedinUrl: updated, fillError: null});
        }         
    }

    render() {

        let formButtonText = 'Submit';
        if(this.props.addAuthorOrEditorLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Add Author Or Editor</FormTitle>
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
                    { this.state.isEditorRole ? null :
                        <Input 
                        label={this.state.twitterUrl.label} 
                        name={this.state.twitterUrl.name}
                        value={this.state.twitterUrl.value}
                        elementType={'textarea'}
                        invalid={!this.state.twitterUrl.valid}
                        shouldValidate={this.state.twitterUrl.validation}
                        touched={this.state.twitterUrl.touched}
                        changed={(event) => this.twitterUrlChangedHandler(event)}
                        />
                    }
                    { this.state.isEditorRole ? null :
                        <Input 
                        label={this.state.facebookUrl.label} 
                        name={this.state.facebookUrl.name}
                        value={this.state.facebookUrl.value}
                        elementType={'textarea'}
                        invalid={!this.state.facebookUrl.valid}
                        shouldValidate={this.state.facebookUrl.validation}
                        touched={this.state.facebookUrl.touched}
                        changed={(event) => this.facebookUrlChangedHandler(event)}
                        />
                    }
                    { this.state.isEditorRole ? null :
                        <Input 
                        label={this.state.linkedinUrl.label} 
                        name={this.state.linkedinUrl.name}
                        value={this.state.linkedinUrl.value}
                        elementType={'textarea'}
                        invalid={!this.state.linkedinUrl.valid}
                        shouldValidate={this.state.linkedinUrl.validation}
                        touched={this.state.linkedinUrl.touched}
                        changed={(event) => this.linkedinUrlChangedHandler(event)}
                        />
                    }
                    { (!this.state.userId.valid && this.state.userId.touched) ||
                      (!this.state.type.valid && this.state.type.touched) ||
                      (!this.state.twitterUrl.valid && this.state.twitterUrl.touched) ||
                      (!this.state.facebookUrl.valid && this.state.facebookUrl.touched) ||
                      (!this.state.linkedinUrl.valid && this.state.linkedinUrl.touched) ||
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.addAuthorOrEditorError ? 
                        <FormFeedback isFailed>
                            {this.props.addAuthorOrEditorError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.addAuthorOrEditorSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    addAuthorOrEditorSuccessInfo: state.admin1.addAuthorOrEditorSuccessInfo,
    addAuthorOrEditorError: state.admin1.addAuthorOrEditorError,
    addAuthorOrEditorLoading: state.admin1.addAuthorOrEditorLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onAddAuthorOrEditor: ( type, userId, twitterUrl, facebookUrl, linkedinUrl ) => dispatch( actions.addAuthorOrEditor( type, userId, twitterUrl, facebookUrl, linkedinUrl ) ),
        onClearAddAuthorOrEditorInfo: () => dispatch(actions.clearAddAuthorOrEditorInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAuthorOrEditor);