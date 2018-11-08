import React, { Component } from 'react';
import classes from './ManageYoutubeVideos.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class ManageYoutubeVideos extends Component {

    componentDidMount() {
        this.props.onFetchSubjects();
    }

    state = {
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

    youtubeVideoInputChangedHandler = (event) => {
        const updated = {
            ...this.state.youtubeVideo,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.youtubeVideo.validation),
            touched: true,   
        }
        this.setState({ youtubeVideo: updated});

        console.log(this.state.youtubeVideo);   
    }

    submitYoutubeVideoHandler = (event) => {
        event.preventDefault();

        if ((!this.state.youtubeVideo.touched || this.state.youtubeVideo.value === '') && (!this.state.youtubeVideo.touched || this.state.youtubeVideo.value === '')) {
            const youtubeUpdated = {
                ...this.state.youtubeVideo,
                touched: true,
                valid: false
            }
            this.setState({ youtubeVideo: youtubeUpdated});

            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated});
        } else {
            this.props.onAddYoutubeVideo(this.state.youtubeVideo.value, this.state.subject.value);
            console.log(this.state.youtubeVideo.value, this.state.subject.value);
            const youtubeReset = {
                    ...this.state.youtubeVideo,
                    value: ''
                }
            const subjectReset = {
                ...this.state.subject,
                value: ''
            }

            this.setState({ youtubeVideo: youtubeReset, subject: subjectReset});
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

        console.log(this.state.subject.value);
    }

    elementConfig = () => {
        let elementConfig = {};

       const temp = this.props.subjects.map( subject => {
            return {
                value: subject.title,
                displayValue: subject.title
            }
        })

        elementConfig.options = temp;
        elementConfig.options[0] = { value: '', displayValue: ''};
        return elementConfig;
    } 

    render() {
        return (
            <div>
                <div className={classes.ContainerItem}>
                    <div className={classes.AdminAction}>ADD YOUTUBE VIDEOS</div>
                    <form 
                    className={classes.Form}
                    onSubmit={this.submitYoutubeVideoHandler}
                    >
                        <Input 
                        label={this.state.youtubeVideo.label} 
                        name={this.state.youtubeVideo.name}
                        value={this.state.youtubeVideo.value}
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
                        { (!this.state.youtubeVideo.valid && this.state.youtubeVideo.touched) || (!this.state.subject.valid && this.state.subject.touched) ? 
                            <Button btnType='Danger' disabled> Add </Button> :
                            <Button btnType='Success'> Add </Button>    
                        }
                        { this.props.youtubeVideoAddError ? 
                            <div>
                                <div className={classes.ErrorFeedbackInfo}>
                                    {this.props.youtubeVideoAddError}
                                </div>
                            </div> 
                            :
                            <div>
                                <div className={classes.AddFeedbackInfo}>
                                    {this.props.youtubeVideoAddedFeedback}
                                </div>
                            </div> 
                        }
                    </form>
                </div >            
            </div>
                      
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    youtubeVideoAddedFeedback: state.profile.youtubeVideoAddedFeedback,
    youtubeVideoAddError: state.profile.addYoutubeVideoError
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onAddYoutubeVideo: (videoId, subject) => dispatch( actions.addYoutubeVideo(videoId, subject) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ManageYoutubeVideos);