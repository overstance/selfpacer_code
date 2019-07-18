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

class EditSubject extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();
    } */
    componentWillUnmount () {
        this.props.onClearEditSubjectInfo();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.subjectToEditPath !== prevProps.subjectToEditPath) {
            const pathUpdated = {
                ...this.state.path,
                value: this.props.subjectToEditPath
            }
    
            this.setState({ path: pathUpdated });
        }

        if (this.props.subjectToEditCurriculum !== prevProps.subjectToEditCurriculum) {
    
            const curriculumUpdated = {
                ...this.state.curriculum,
                value: this.props.subjectToEditCurriculum
            }

            this.setState({ curriculum: curriculumUpdated});
        }

        if (this.props.subjectToEditIconPath !== prevProps.subjectToEditIconPath) {
    
            const iconPathUpdated = {
                ...this.state.iconPath,
                value: this.props.subjectToEditIconPath
            }

            this.setState({ iconPath: iconPathUpdated});
        }

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
        },
        path: {
            value: this.props.subjectToEditPath,
            label: "paths", 
            name: "path",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        curriculum: {
            value: this.props.subjectToEditCurriculum,
            label: "study topics", 
            name: "Curriculum",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        iconPath: {
            value: this.props.subjectToEditIconPath,
            label: "icon path", 
            name: "IconPath",
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


    submitpathHandler = (event) => {
        event.preventDefault();

        if ( this.props.editSubjectSuccessInfo && !this.state.subject.touched) {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Edit New'});

        } else if ( this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Please fill all fields'});

        } else if (this.state.path.value === '') {
            const pathUpdated = {
                ...this.state.path,
                touched: true,
                valid: false
            }
            this.setState({ path: pathUpdated, fillError: 'Please fill all fields'});

        } else if ( this.state.curriculum.value === '') {
            const curriculumUpdated = {
                ...this.state.curriculum,
                touched: true,
                valid: false
            }
            this.setState({ curriculum: curriculumUpdated, fillError: 'Please fill all fields'});

        } else if ( this.state.iconPath.value === '') {
            const iconPathUpdated = {
                ...this.state.iconPath,
                touched: true,
                valid: false
            }
            this.setState({ iconPath: iconPathUpdated, fillError: 'Please fill all fields'});

        } else {
            this.props.onEditSubject( this.state.subject.value, this.state.path.value, this.state.curriculum.value, this.state.iconPath.value);
            
            const subjectReset = {
                ...this.state.subject,
                value: '',
                touched: false
            }

            const pathReset = {
                ...this.state.path,
                value: '',
                touched: false
            }

            const curriculumReset = {
                ...this.state.curriculum,
                value: '',
                touched: false
            }

            const iconPathReset = {
                ...this.state.iconPath,
                value: '',
                touched: false
            }
            
            this.setState({ subject: subjectReset, path: pathReset, curriculum: curriculumReset, iconPath: iconPathReset});
        }
        
    }

    subjectChangedHandler = (event) => {

        const subjectUpdatedpdated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        this.setState({ subject: subjectUpdatedpdated, fillError: null}, () => {
            if (this.state.subject.value !== '') {
                this.props.onFetchSelectSubjectInfo( this.state.subject.value );

                const pathUpdated = {
                    ...this.state.path,
                    valid: true,
                    touched: false
                }
        
                const curriculumUpdated = {
                    ...this.state.curriculum,
                    valid: true,
                    touched: false
                }

                const iconPathUpdated = {
                    ...this.state.iconPath,
                    valid: true,
                    touched: false
                }

                this.setState({ path: pathUpdated, curriculum: curriculumUpdated, iconPath: iconPathUpdated });
                
            }
        });
    }

    pathChangedHandler = (event) => {
        const updated = {
            ...this.state.path,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.path.validation),
            touched: true,   
        }
        this.setState({ path: updated, fillError: null});  
    }

    curriculumChangedHandler = (event) => {
        const updated = {
            ...this.state.curriculum,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.curriculum.validation),
            touched: true
        }
        this.setState({ curriculum: updated, fillError: null});
       
    }

    iconPathChangedHandler = (event) => {
        const updated = {
            ...this.state.iconPath,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.iconPath.validation),
            touched: true
        }
        this.setState({ iconPath: updated, fillError: null});
       
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

        let formButtonText = 'Submit';
        if(this.props.editSubjectLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Edit Subject</FormTitle>
                <Form
                submitForm={this.submitpathHandler}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    {this.props.fetchSubjectToEditError ? 
                        <FormFeedback isFillError>
                            {this.props.fetchSubjectToEditError}
                        </FormFeedback> : null
                    }
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
                    <Input 
                    label={this.state.path.label} 
                    name={this.state.path.name}
                    value={this.state.path.value}
                    elementType={'textarea'}
                    invalid={!this.state.path.valid}
                    shouldValidate={this.state.path.validation}
                    touched={this.state.path.touched}
                    changed={(event) => this.pathChangedHandler(event)}
                    />
                    <Input 
                    label={this.state.curriculum.label} 
                    name={this.state.curriculum.name}
                    value={this.state.curriculum.value}
                    elementType={'textarea'}
                    invalid={!this.state.curriculum.valid}
                    shouldValidate={this.state.curriculum.validation}
                    touched={this.state.curriculum.touched}
                    changed={(event) => this.curriculumChangedHandler(event)}
                    />
                    <Input 
                    label={this.state.iconPath.label} 
                    name={this.state.iconPath.name}
                    value={this.state.iconPath.value}
                    elementType={'input'}
                    invalid={!this.state.iconPath.valid}
                    shouldValidate={this.state.iconPath.validation}
                    touched={this.state.iconPath.touched}
                    changed={(event) => this.iconPathChangedHandler(event)}
                    />
                    { (!this.state.path.valid && this.state.path.touched) ||
                      (!this.state.subject.valid && this.state.subject.touched) || 
                      (!this.state.curriculum.valid && this.state.curriculum.touched) || 
                      (!this.state.iconPath.valid && this.state.iconPath.touched) || 
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.editSubjectError ? 
                        <FormFeedback isFailed>
                            {this.props.editSubjectError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.editSubjectSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    editSubjectSuccessInfo: state.admin1.editSubjectSuccessInfo,
    fetchSubjectToEditError: state.admin1.fetchSubjectToEditError,
    editSubjectLoading: state.admin1.editSubjectLoading,
    editSubjectError: state.admin1.editSubjectError,
    subjectToEditPath: state.admin1.subjectToEditPath,
    subjectToEditCurriculum: state.admin1.subjectToEditCurriculum,
    subjectToEditIconPath: state.admin1.subjectToEditIconPath,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onFetchSelectSubjectInfo: (subject) => dispatch( actions.fetchSelectSubjectInfo(subject)),
        onEditSubject: ( subject, path, curriculum, iconPath ) => dispatch( actions.editSubject( subject, path, curriculum, iconPath ) ),
        onClearEditSubjectInfo: () => dispatch( actions.clearEditSubjectInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSubject);