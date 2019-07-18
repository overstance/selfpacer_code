import React, { Component } from 'react';
import classes from './ManageSubject.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
import Spinner from '../UserInterface/Spinner/Spinner';

class DeleteSubject extends Component {

    componentWillUnmount () {
        this.props.onClearDeleteSubjectInfo();
    }

    state = {
        fillError: null,
        subject: {
            value: '',
            label: "subject", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
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


    submitpathHandler = (event) => {
        event.preventDefault();

        if ( this.props.deleteSubjectSuccessInfo && !this.state.subject.touched) {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Delete New'});

        } else if ( this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Select Subject'});

        } else {
            this.props.onDeleteSubject( this.state.subject.value);
            
            const subjectReset = {
                ...this.state.subject,
                value: '',
                touched: false
            }
            
            this.setState({ subject: subjectReset});
        }
        
    }

    subjectChangedHandler = (event) => {

        const subjectUpdatedpdated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        this.setState({ subject: subjectUpdatedpdated, fillError: null});
    }

    elementConfig = () => {
        let elementConfig = {};
        
        const subjects = this.props.subjects.map( subject => subject.title );

        const subjectSort = subjects.sort();

        const temp = subjectSort.map( subject => {
            return {
                value: subject,
                displayValue: subject
            }
        })

        temp.unshift({ value: '', displayValue: ''});

        elementConfig.options = temp;

        return elementConfig;
    } 

    render() {

        let formButtonText = 'Delete';
        if(this.props.deleteSubjectLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Delete Subject</FormTitle>
                <Form
                submitForm={this.submitpathHandler}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    <Input 
                    label={this.state.subject.label} 
                    name={this.state.subject.name}
                    value={this.state.subject.value}
                    elementType='select'
                    invalid={!this.state.subject.valid}
                    shouldValidate={this.state.subject.validation}
                    touched={this.state.subject.touched}
                    elementConfig={this.elementConfig()}
                    changed={(event) => this.subjectChangedHandler(event)}
                    />
                    { (!this.state.subject.valid && this.state.subject.touched) || this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.deleteSubjectError ? 
                        <FormFeedback isFailed>
                            {this.props.deleteSubjectError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.deleteSubjectSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    deleteSubjectSuccessInfo: state.admin1.deleteSubjectSuccessInfo,
    deleteSubjectError: state.admin1.deleteSubjectError,
    deleteSubjectLoading: state.admin1.deleteSubjectLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onDeleteSubject: ( subjectTitle ) => dispatch( actions.deleteSubject( subjectTitle ) ),
        onClearDeleteSubjectInfo: () => dispatch( actions.clearDeleteSubjectInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSubject);