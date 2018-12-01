import React, { Component } from 'react';
import classes from './addResource.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import Grid from '../../components/UserInterface/Grid/Grid';

class AddResources extends Component {

    componentDidMount() {
        this.props.onFetchSubjects();

        console.log(this.props.activeSubject);
        // this.props.onFetchUser();
    }

    state = {
        fillError: null,
        subject: {
            value: this.props.activeSubject,
            label: "Select Subject", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        type: {
            value: this.props.activeContentPage,
            label: "Select Type", 
            name: "Type",
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
                        value: 'youtube',
                        displayValue: 'youtube'
                    },
                    {
                        value: 'mooc',
                        displayValue: 'mooc'
                    },
                    {
                        value: 'books',
                        displayValue: 'books'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        resource: {
            value: '',
            label: "Enter Resource Link(s)", 
            name: "resource",
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

    submitResourceHandler = (event) => {
        event.preventDefault();

        if ((this.state.subject.value === '' || this.state.type.value === '' || this.state.resource.value === '' ) && (!this.state.subject.touched || !this.state.resource.touched || !this.state.type.touched)) {
            const resourceUpdated = {
                ...this.state.resource,
                touched: true,
                valid: false
            }
            this.setState({ resource: resourceUpdated});

            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated});

            const typeUpdated = {
                ...this.state.type,
                touched: true,
                valid: false
            }
            this.setState({ type: typeUpdated});

            this.setState({ fillError: 'Please fill all fields' });

        } else {
            this.props.onAddResource(this.state.resource.value, this.state.subject.value, this.state.type.value, this.props.user, this.props.history);
            
            const youtubeReset = {
                    ...this.state.resource,
                    value: ''
                }
            const subjectReset = {
                ...this.state.subject,
                value: this.state.subject.value
            }

            const typeReset = {
                ...this.state.type,
                value: this.state.type.value
            }

            this.setState({ resource: youtubeReset, subject: subjectReset, type: typeReset, fillError: null});
        }
        
    }

    resourceInputChangedHandler = (event) => {
        const updated = {
            ...this.state.resource,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.resource.validation),
            touched: true,   
        }
        this.setState({ resource: updated});
        
        const subjectReset = {
            ...this.state.subject,
            value: this.state.subject.value,
            // valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: false
        }
        this.setState({ subject: subjectReset});

        const typeReset = {
            ...this.state.type,
            value: this.state.type.value,
            // valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: false
        }
        this.setState({ type: typeReset});
    }

    subjectChangedHandler = (event) => {
        const updated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }
        this.setState({ subject: updated});      
    }

    typeChangedHandler = (event) => {
        const updated = {
            ...this.state.type,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: true
        }
        this.setState({ type: updated});      
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
            <Grid>
                <div className={classes.ContentItems}>
                    <div className={classes.ContainerItem}>
                        <div className={classes.AdminAction}>SUBMIT A RESOURCE</div>
                        <div>
                            <form 
                            className={classes.Form}
                            onSubmit={this.submitResourceHandler}
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
                                elementType='textarea'
                                label={this.state.resource.label} 
                                name={this.state.resource.name}
                                value={this.state.resource.value}
                                invalid={!this.state.resource.valid}
                                shouldValidate={this.state.resource.validation}
                                touched={this.state.resource.touched}
                                changed={(event) => this.resourceInputChangedHandler(event)}
                                />
                                { (!this.state.resource.valid && this.state.resource.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.type.valid && this.state.type.touched)  ? 
                                    <Button btnType='Danger' disabled> Submit </Button> :
                                    <Button btnType='Success'> Submit </Button>    
                                }
                                { this.props.error ? 
                                    <div>
                                        <div className={classes.ErrorFeedbackInfo}>
                                            {this.props.error}
                                        </div>
                                    </div> 
                                    :
                                    <div>
                                        <div className={classes.AddFeedbackInfo}>
                                            {this.props.successMessage}
                                        </div>
                                    </div> 
                                }
                                
                            </form>
                            <div className={classes.FootNote} >
                                **Your Submitted resource(s) will be added to the selfpacer
                                resource lists only after been processed and approved
                                by standard efficiency requirements.
                            </div>
                        </div>
                    </div >
                </div>            
            </Grid>                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    successMessage: state.resource.successMessage,
    error: state.resource.error,
    user: state.auth.user,
    activeContentPage: state.explore.activeContentType,
    activeSubject: state.clickedSubject.subject[0].title
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onAddResource: (link, subject, type, user, history) => dispatch( actions.addResource(link, subject, type, user, history) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddResources);