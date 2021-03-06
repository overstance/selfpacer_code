import React, { Component } from 'react';
import classes from './EditBio.module.css';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../../components/UserInterface/Input/Input';
import Button from '../../../../components/UserInterface/Button/Button';
import Spinner from '../../../../components/UserInterface/Spinner/Spinner';
import Dialogue from '../../../../components/Dialogues/Dialogue/Dialogue';
import Form from '../../../../components/UserInterface/Form/Form';
import FormFeedback from '../../../../components/UserInterface/Form/FormFeedback/FormFeedback';

class EditBio extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();
    } */

    state = {
        biodataFillError: null,
        showChangePasswordForm: false,
        specialization1: {
            value: this.props.specialization1,
            label: "Edit Specialization", 
            name: "specialization1",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        name: {
            value: this.props.name,
            label: "Edit name", 
            name: "name",
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

    submitEditedProfileHandler = (event) => {
        event.preventDefault();

        if ((!this.state.name.touched || this.state.name.value === '') && (!this.state.specialization1.touched || this.state.specialization1.value === '')) {
            const nameUpdated = {
                ...this.state.name,
                touched: true,
                valid: true
            }
            this.setState({ name: nameUpdated});

            const specialization1Updated = {
                ...this.state.specialization1,
                touched: true,
                valid: true
            }
            this.setState({ specialization1: specialization1Updated});

            this.setState({ biodataFillError: 'Please change one or more field' });
        } else {
            this.props.onEditProfile(this.state.name.value, this.state.specialization1.value, this.props.user, this.props.userSpecLocalStorage);
        }
        
    }

    nameInputChangedHandler = (event) => {
        const updated = {
            ...this.state.name,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.name.validation),
            touched: true,   
        }
        this.setState({ name: updated, biodataFillError: null});  
    }

    specialization1ChangedHandler = (event) => {

        const updated = {
            ...this.state.specialization1,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.specialization1.validation),
            touched: true
        }
        this.setState({ specialization1: updated, biodataFillError: null});  
    }

    elementConfigSpec1 = () => {
        let elementConfig = {};
        
        const specialization1 = this.props.subjects.map( specialization => specialization.title );

        const specialization1Sort = specialization1.sort();

        const temp = specialization1Sort.map( specialization1 => {
            return {
                value: specialization1,
                displayValue: specialization1
            }
        })

        temp.unshift({ value: this.props.specialization1, displayValue: this.props.specialization1});

        elementConfig.options = temp;

        return elementConfig;
    }

    render() {

        const editBioForm = 
        <Form
        submitForm={this.submitEditedProfileHandler}
        >
            <FormFeedback isFillError>
                {this.state.biodataFillError}
            </FormFeedback>
            <Input
            label={this.state.name.label} 
            name={this.state.name.name}
            value={this.state.name.value}
            invalid={!this.state.name.valid}
            shouldValidate={this.state.name.validation}
            touched={this.state.name.touched}
            changed={(event) => this.nameInputChangedHandler(event)}
            />
            <Input 
            label={this.state.specialization1.label} 
            name={this.state.specialization1.name}
            value={this.state.specialization1.value}
            elementType='select'
            invalid={!this.state.specialization1.valid}
            shouldValidate={this.state.specialization1.validation}
            touched={this.state.specialization1.touched}
            elementConfig={this.elementConfigSpec1()}
            changed={(event) => this.specialization1ChangedHandler(event)}
            />
            { (!this.state.name.valid && this.state.name.touched) || (!this.state.specialization1.valid && this.state.specialization1.touched) || this.state.biodataFillError ? 
                <Button btnType='Danger' disabled> Submit </Button> :
                <Button btnType='Success'> Submit </Button>    
            }
            { this.props.profileEditError ? 
                <FormFeedback isFailed>
                    {this.props.profileEditError}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.profileEditSuccessFeedback}
                </FormFeedback>
            }
        </Form>
        
        const successDialogue = 
        <Dialogue
        isPostSubmitDialogue
        showDialogue
        withLink
        to='/profile'
        buttonText='go back'
        >
            {this.props.profileEditSuccessFeedback}
        </Dialogue>

        let content = editBioForm;
        
        if (this.props.loading) {
            content = 
            <div className={classes.Form}>
                <Spinner />
            </div>

        }

        if (this.props.profileEditSuccessFeedback === 'Profile Edited') {
            content = successDialogue;
        }

        return (
                <div className={classes.ContainerItem}>
                    {content}
                </div >                               
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    specialization1:state.auth.user.specialization,
    name: state.auth.user.name,
    profileEditSuccessFeedback: state.profile.profileEditSuccessFeedback,
    profileEditError: state.profile.profileEditError,
    loading: state.profile.profileEditLoading,
    userSpecLocalStorage: state.auth.userSpecialization,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onEditProfile: (name, specialization1, user, userSpecLocalStorage) => dispatch( actions.editProfile(name, specialization1, user, userSpecLocalStorage) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (EditBio);