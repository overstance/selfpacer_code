import React, { Component } from 'react';
import classes from './UpdateYoutubePlaylists.module.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';
import Form from '../../../components/UserInterface/Form/Form';
import FormTitle from '../../../components/UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../../../components/UserInterface/Form/FormFeedback/FormFeedback';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';

class UpdateYoutubePlaylists extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();
    } */

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

    submitYoutubePlaylistsHandler = (event) => {
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
            this.props.onUpdateYoutubePlaylists(this.state.subject.value, this.props.user);
            
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

        let updateButtonText = 'Update';
        if(this.props.updateYoutubePlaylistsLoading) {
            updateButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Update Youtube Playlist</FormTitle>
                <Form
                submitForm={this.submitYoutubePlaylistsHandler}
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
                        <Button btnType='Danger' disabled> {updateButtonText} </Button> :
                        <Button btnType='Success'> {updateButtonText} </Button>    
                    }
                    { this.props.updateYoutubePlaylistsError ? 
                        <FormFeedback isFailed>
                            {this.props.updateYoutubePlaylistsError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.updateYoutubePlaylistsFeedback}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    updateYoutubePlaylistsLoading: state.resource.updateYoutubePlaylistsLoading,
    updateYoutubePlaylistsFeedback: state.resource.updateYoutubePlaylistsFeedback,
    updateYoutubePlaylistsError: state.resource.updateYoutubePlaylistsError,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onUpdateYoutubePlaylists: (subject, user) => dispatch( actions.updateYoutubePlaylists(subject, user) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (UpdateYoutubePlaylists);