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

class AddSubject extends Component {

    componentWillUnmount () {
        this.props.onClearAddSubjectState();
    }

    state = {
        fillError: null,
        subject: {
            value: '',
            label: "title", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        category: {
            value: '',
            label: "category", 
            name: "category",
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
                        value: 'Creative',
                        displayValue: 'Creative'
                    },
                    {
                        value: 'Business',
                        displayValue: 'Business'
                    },
                    {
                        value: 'Technology',
                        displayValue: 'Technology'
                    },
                    {
                        value: 'Science',
                        displayValue: 'Science'
                    },
                    {
                        value: 'Life-style',
                        displayValue: 'Life-style'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        iconPath: {
            value: '/images/image-file-name',
            label: "icon path", 
            name: "IconPath",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        iconAlt: {
            value: '',
            label: "icon description", 
            name: "IconAlt",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        path: {
            value: '',
            label: "paths", 
            name: "path",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        curriculum: {
            value: '',
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

        if ( this.props.addSubjectSuccessInfo && !this.state.subject.touched) {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Add New'});

        } else if ( this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Please fill all fields'});

        } else if ( this.state.category.value === '') {
            const categoryUpdated = {
                ...this.state.category,
                touched: true,
                valid: false
            }
            this.setState({ category: categoryUpdated, fillError: 'Please fill all fields'});

        } else if ( this.state.iconPath.value === '') {
            const iconPathUpdated = {
                ...this.state.iconPath,
                touched: true,
                valid: false
            }
            this.setState({ iconPath: iconPathUpdated, fillError: 'Please fill all fields'});

        } else if ( this.state.iconAlt.value === '') {
            const iconAltUpdated = {
                ...this.state.iconAlt,
                touched: true,
                valid: false
            }
            this.setState({ iconAlt: iconAltUpdated, fillError: 'Please fill all fields'});

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
            this.props.onAddSubject( this.state.subject.value, this.state.category.value, this.state.iconPath.value, this.state.iconAlt.value, this.state.path.value, this.state.curriculum.value);
            
            const subjectReset = {
                ...this.state.subject,
                value: '',
                touched: false
            }

            const categoryReset = {
                ...this.state.category,
                value: '',
                touched: false
            }

            const iconPathReset = {
                ...this.state.iconPath,
                value: '',
                touched: false
            }

            const iconAltReset = {
                ...this.state.iconAlt,
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
            
            this.setState({ 
                subject: subjectReset, 
                category: categoryReset, 
                iconPath: iconPathReset, 
                iconAlt: iconAltReset, 
                path: pathReset, 
                curriculum: curriculumReset
            });
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

    categoryChangedHandler = (event) => {
        const updated = {
            ...this.state.category,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.category.validation),
            touched: true
        }
        this.setState({ category: updated, fillError: null});      
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

    iconAltChangedHandler = (event) => {
        const updated = {
            ...this.state.iconAlt,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.iconAlt.validation),
            touched: true
        }
        this.setState({ iconAlt: updated, fillError: null});
       
    }

    render() {

        let formButtonText = 'Submit';
        if(this.props.addSubjectLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Add Subject</FormTitle>
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
                    elementcategory='input'
                    invalid={!this.state.subject.valid}
                    shouldValidate={this.state.subject.validation}
                    touched={this.state.subject.touched}
                    changed={(event) => this.subjectChangedHandler(event)}
                    />
                    <Input 
                    label={this.state.category.label} 
                    name={this.state.category.name}
                    value={this.state.category.value}
                    elementType='select'
                    invalid={!this.state.category.valid}
                    shouldValidate={this.state.category.validation}
                    touched={this.state.category.touched}
                    elementConfig={this.state.category.elementConfig}
                    changed={(event) => this.categoryChangedHandler(event)}
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
                    <Input 
                    label={this.state.iconAlt.label} 
                    name={this.state.iconAlt.name}
                    value={this.state.iconAlt.value}
                    elementType={'input'}
                    invalid={!this.state.iconAlt.valid}
                    shouldValidate={this.state.iconAlt.validation}
                    touched={this.state.iconAlt.touched}
                    changed={(event) => this.iconAltChangedHandler(event)}
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
                    {  
                      (!this.state.iconPath.valid && this.state.iconPath.touched) || 
                      (!this.state.iconAlt.valid && this.state.iconAlt.touched) ||
                      (!this.state.subject.valid && this.state.subject.touched) || 
                      (!this.state.category.valid && this.state.category.touched) ||
                      (!this.state.path.valid && this.state.path.touched) || 
                      (!this.state.curriculum.valid && this.state.curriculum.touched) || 
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.addSubjectError ? 
                        <FormFeedback isFailed>
                            {this.props.addSubjectError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.addSubjectSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    addSubjectSuccessInfo: state.admin1.addSubjectSuccessInfo,
    addSubjectLoading: state.admin1.addSubjectLoading,
    addSubjectError: state.admin1.addSubjectError,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onAddSubject: ( subjectTitle, category, iconPath, iconAlt, path, curriculum ) => dispatch( actions.addSubject( subjectTitle, category, iconPath, iconAlt, path, curriculum ) ),
        onClearAddSubjectState: () => dispatch( actions.clearAddSubjectState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);