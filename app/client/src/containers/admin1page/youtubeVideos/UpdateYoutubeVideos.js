import React, { Component } from 'react';
import classes from './AddYoutubeVideos.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class UpdateYoutubeVideos extends Component {

    componentDidMount() {
        this.props.onFetchSubjects();
        // this.props.onFetchAccountingVideos();
    }

    state = {
        fillError: null,
        subject: {
            value: '',
            label: "Select Subject", 
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

    submitYoutubeVideoHandler = (event) => {
        event.preventDefault();

        if (!this.state.subject.touched || this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated});

            this.setState({ fillError: 'Please fill all fields' });
        } else {
            this.props.onUpdateYoutubeVideos(this.state.subject.value, this.props.user);
            
            const subjectReset = {
                ...this.state.subject,
                value: ''
            }

            this.setState({ subject: subjectReset });
        }
        
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
                <div className={classes.AdminAction}>UPDATE YOUTUBE VIDEOS</div>
                <form 
                className={classes.Form}
                onSubmit={this.submitYoutubeVideoHandler}
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
                    { !this.state.subject.valid && this.state.subject.touched ? 
                        <Button btnType='Danger' disabled> Update </Button> :
                        <Button btnType='Success'> Update </Button>    
                    }
                    { this.props.youtubeVideoUpdateError ? 
                        <div>
                            <div className={classes.ErrorFeedbackInfo}>
                                {this.props.youtubeVideoUpdateError}
                            </div>
                        </div> 
                        :
                        <div>
                            <div className={classes.AddFeedbackInfo}>
                                {this.props.youtubeVideoUpdatedFeedback}
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
    youtubeVideoUpdatedFeedback: state.admin1.youtubeVideosUpdatedFeedback,
    youtubeVideoUpdateError: state.admin1.updateYoutubeVideosError,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onUpdateYoutubeVideos: (subject, user) => dispatch( actions.updateYoutubeVideos(subject, user) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (UpdateYoutubeVideos);