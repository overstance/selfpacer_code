import React, { Component } from 'react';
import classes from './AddSubjectIcon.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class EditSubject extends Component {

    componentDidMount() {
        this.props.onFetchSubjects();
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

        } else {
            this.props.onEditSubject( this.state.subject.value, this.state.path.value, this.state.curriculum.value);
            
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
            
            this.setState({ subject: subjectReset, path: pathReset, curriculum: curriculumReset});
        }
        
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

                this.setState({ path: pathUpdated, curriculum: curriculumUpdated });
                
            }
        });
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
        return (
            <div className={classes.ContainerItem}>
                <div className={classes.AdminAction}>EDIT SUBJECT</div>
                <form 
                className={classes.Form}
                onSubmit={this.submitpathHandler}
                >
                    <div className={classes.FillError}>{this.state.fillError}</div>
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
                    { (!this.state.path.valid && this.state.path.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.curriculum.valid && this.state.curriculum.touched) || this.state.fillError ? 
                        <Button btnType='Danger' disabled> Submit </Button> :
                        <Button btnType='Success'> Submit </Button>    
                    }
                    { this.props.editSubjectError ? 
                        <div>
                            <div className={classes.ErrorFeedbackInfo}>
                                {this.props.editSubjectError}
                            </div>
                        </div> 
                        :
                        <div>
                            <div className={classes.AddFeedbackInfo}>
                                {this.props.editSubjectSuccessInfo}
                            </div>
                        </div> 
                    }
                </form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    editSubjectSuccessInfo: state.admin1.editSubjectSuccessInfo,
    editSubjectError: state.admin1.editSubjectError,
    subjectToEditPath: state.admin1.subjectToEditPath,
    subjectToEditCurriculum: state.admin1.subjectToEditCurriculum,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onFetchSelectSubjectInfo: (subject) => dispatch( actions.fetchSelectSubjectInfo(subject)),
        onEditSubject: ( subject, path, curriculum ) => dispatch( actions.editSubject( subject, path, curriculum ) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSubject);