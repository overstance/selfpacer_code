import React, { Component } from 'react';
import classes from './AddYoutubeVideos.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import Form from '../../../components/UserInterface/Form/Form';
import FormTitle from '../../../components/UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../../../components/UserInterface/Form/FormFeedback/FormFeedback';

class ManageYoutubeVideos extends Component {

    componentWillUnmount() {
        this.props.onClearAddMessages();
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
        },
        youtubeVideo: {
            value: '',
            label: "Enter Video Id(s)", 
            name: "youtubeVideo",
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


    submitYoutubeVideoHandler = (event) => {
        event.preventDefault();

        if ( this.props.youtubeVideoAddedFeedback && !this.state.youtubeVideo.touched) {
            const youtubeUpdated = {
                ...this.state.youtubeVideo,
                touched: true,
                valid: false
            }
            this.setState({ youtubeVideo: youtubeUpdated, fillError: 'Add new'});

        } else if (!this.state.youtubeVideo.touched || this.state.youtubeVideo.value === '') {
            const youtubeUpdated = {
                ...this.state.youtubeVideo,
                touched: true,
                valid: false
            }
            this.setState({ youtubeVideo: youtubeUpdated, fillError: 'Please fill all fields'});

        } else if ( !this.state.subject.touched && this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Please fill all fields'});

        } else {
            this.props.onAddYoutubeVideo(this.state.youtubeVideo.value, this.state.subject.value, this.props.user._id);
            
            const youtubeReset = {
                    ...this.state.youtubeVideo,
                    value: '',
                    touched: false
                }
            
            this.setState({ youtubeVideo: youtubeReset});
        }
        
    }

    youtubeVideoInputChangedHandler = (event) => {
        const updated = {
            ...this.state.youtubeVideo,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.youtubeVideo.validation),
            touched: true,   
        }
        this.setState({ youtubeVideo: updated, fillError: null});  
    }

    subjectChangedHandler = (event) => {
        const updated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }
        this.setState({ subject: updated}, () => {
            if (this.state.subject.value === '') {
                this.setState({fillError: 'please select subject'});
            } else {   
                this.setState({ subject: updated, fillError: null});
                this.props.onClearAddMessages();
            }
        });
       
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
        let youtubeVideoButtonText = 'submit';

        if(this.props.youtubeVideoLoading) {
            youtubeVideoButtonText = <Spinner isButton/>;
        }
        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Add Youtube Video</FormTitle>
                <Form
                submitForm={this.submitYoutubeVideoHandler}
                >
                    <div className={classes.FillError}>{this.state.fillError}</div>
                    <Input 
                    label={this.state.youtubeVideo.label} 
                    name={this.state.youtubeVideo.name}
                    value={this.state.youtubeVideo.value}
                    elementType={'textarea'}
                    invalid={!this.state.youtubeVideo.valid}
                    shouldValidate={this.state.youtubeVideo.validation}
                    touched={this.state.youtubeVideo.touched}
                    changed={(event) => this.youtubeVideoInputChangedHandler(event)}
                    />
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
                    { (!this.state.youtubeVideo.valid && this.state.youtubeVideo.touched) || (!this.state.subject.valid && this.state.subject.touched) || this.state.fillError ? 
                        <Button btnType='Danger' disabled> {youtubeVideoButtonText} </Button> :
                        <Button btnType='Success'> {youtubeVideoButtonText} </Button>    
                    }
                    { this.props.youtubeVideoAddError ? 
                        <FormFeedback isFailed>
                            {this.props.youtubeVideoAddError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.youtubeVideoAddedFeedback}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    youtubeVideoLoading: state.admin1.youtubeVideoLoading,
    youtubeVideoAddedFeedback: state.admin1.youtubeVideoAddedFeedback,
    youtubeVideoAddError: state.admin1.addYoutubeVideoError,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onAddYoutubeVideo: (videoId, subject, user) => dispatch( actions.addYoutubeVideo(videoId, subject, user) ),
        onClearAddMessages: () => dispatch(actions.clearAddMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ManageYoutubeVideos);