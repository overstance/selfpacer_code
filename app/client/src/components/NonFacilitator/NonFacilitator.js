import React, {Component} from 'react';
import classes from './NonFacilitator.css';
import Container from '../UserInterface/Container/Container';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';
import * as actions from '../../store/actions/index';
import Dialogue from '../Dialogues/Dialogue/Dialogue';

class NonFacilitator extends Component {
    
    componentWillUnmount() {
        this.props.onResetEditProfileMessages();
    }

    state = {
        workUrl1: {
            fillError: null,
            value: '',
            label: 'Url1',
            labelspan: '*',
            name: 'workUrl1',
            validation: {
                required: true,
                isUrl: true
            },
            valid: false,
            touched: false,
        },
        workUrl2: {
            fillError: null,
            value: '',
            label: 'Url2',
            name: 'workUrl2',
            validation: {
                isUrl: true
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

        if (rules.isUrl) {
            const pattern = /^(ftp|http|https):\/\/[^ "]+$/
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitUserHandler = (event) => {
        event.preventDefault();

        if (!this.state.workUrl1.touched || this.state.workUrl1.value === '') {
            const updated = {
                ...this.state.workUrl1,
                touched: true,
                valid: false
            }
        this.setState({ workUrl1: updated});

        this.setState({ fillError: 'Please enter url1' });
        } else {
            this.props.onBecomeFacilitator(this.state.workUrl1.value, this.state.workUrl2.value, this.props.userId);
            const workUrl1Updated = {
                ...this.state.workUrl1,
                value: '',
                touched: false
            }

            const workUrl2Updated = {
                ...this.state.workUrl2,
                value: '',
                touched: false
            }
            this.setState({ workUrl1: workUrl1Updated, workUrl2: workUrl2Updated});
        }
        
    };

    
    input1ChangedHandler = (event) => {
        const updated = {
            ...this.state.workUrl1,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.workUrl1.validation),
            touched: true
        }
        this.setState({ workUrl1: updated, fillError: null });   
    }

    input2ChangedHandler = (event) => {

        if (event.target.value === '' ) {
            
            const updated = {
                ...this.state.workUrl2,
                value: event.target.value,
                valid: true,
                touched: true
            }
            this.setState({ workUrl2: updated, fillError: null });
        } else {
            const updated = {
                ...this.state.workUrl2,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.workUrl2.validation),
                touched: true
            }
            this.setState({ workUrl2: updated, fillError: null });
        }   
    }

    render() {

        let formButtonText = 'Submit';
        if(this.props.becomeFacilitatorLoading) {
            formButtonText = <Spinner isButton/>;
        }

        let form =
        <Form 
        submitForm={this.submitUserHandler}
        >
            <div className={classes.FormInstruction}>
                Enter 1 or 2 urls to your works: 
                <span>
                    can be a web-address or link to social media 
                    page or channel
                </span>
            </div>
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
            <Input 
            label={this.state.workUrl1.label}
            labelspan={this.state.workUrl1.labelspan} 
            name={this.state.workUrl1.name}
            elementType={'textarea'}
            value={this.state.workUrl1.value}
            invalid={!this.state.workUrl1.valid}
            shouldValidate={this.state.workUrl1.validation}
            touched={this.state.workUrl1.touched}
            changed={(event) => this.input1ChangedHandler(event)}
            />
            <Input 
            label={this.state.workUrl2.label} 
            name={this.state.workUrl2.name}
            elementType={'textarea'}
            value={this.state.workUrl2.value}
            invalid={!this.state.workUrl2.valid}
            shouldValidate={this.state.workUrl2.validation}
            touched={this.state.workUrl2.touched}
            changed={(event) => this.input2ChangedHandler(event)}
            />
            { (!this.state.workUrl1.valid && this.state.workUrl1.touched) || (!this.state.workUrl2.valid && this.state.workUrl2.touched)  ? 
                <Button btnType='Danger' disabled> {formButtonText} </Button> :
                <Button btnType='Success'> {formButtonText} </Button>    
            }
            { this.props.becomeFacilitatorError ? 
                <FormFeedback isFailed>
                    {this.props.becomeFacilitatorError}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.becomeFacilitatorSuccessInfo}
                </FormFeedback>
            }
        </Form>

        if (this.props.workUrl1 || this.props.workUrl2 ) {
            form = 
            <PostActionInfo isSuccess>
                You already submitted a facilitator
                application.
            </PostActionInfo>
        }

        if (!this.props.becomeFacilitatorLoading && this.props.becomeFacilitatorSuccessInfo ) {
            form =
            <PostActionInfo isSuccess>
                {this.props.becomeFacilitatorSuccessInfo}
            </PostActionInfo>

        } else if (!this.props.becomeFacilitatorLoading && this.props.becomeFacilitatorError) {
            form =
            <PostActionInfo isFailed>
                {this.props.becomeFacilitatorSuccessInfo}
            </PostActionInfo>
        }

        return (
            <Container>
                <div className={classes.Header}>
                    <div>Help Build the Future of Work and Education</div>
                </div>
                { this.props.accountType === 'Facilitator' && this.props.useTypeContext === '0' ?
                    <Dialogue
                    isPostSubmitDialogue
                    showDialogue
                    withLink
                    to='/logout'
                    buttonText='log-out'
                    >
                        Yay! Your facilitator application had been approved. 
                        Please log out and log in again to start facilitating.
                    </Dialogue>
                    : null
                }
                <div className={classes.Container}>
                    <div className={classes.Art}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#3a2d80">
                            <path d="M378.94 321.41L284.7 224h49.22c15.3 0 23.66-16.6 13.86-27.53L234.45 69.96c3.43-6.61 5.55-14 5.55-21.96 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 7.96 2.12 15.35 5.55 21.96L36.22 196.47C26.42 207.4 34.78 224 50.08 224H99.3L5.06 321.41C-6.69 333.56 3.34 352 21.7 352H160v32H48c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h288c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16H224v-32h138.3c18.36 0 28.39-18.44 16.64-30.59zM192 31.98c8.85 0 16.02 7.17 16.02 16.02 0 8.84-7.17 16.02-16.02 16.02S175.98 56.84 175.98 48c0-8.85 7.17-16.02 16.02-16.02zM304 432v32H80v-32h224z"/>
                        </svg>
                    </div>
                    <div className={classes.TextArea}>
                        <div className={classes.Text}>
                            <span>
                            Are you an active practitioner in your 
                            field of endeavor who creates educational contents?
                            </span> 
                            <span>
                            Add and manage your educational resources
                            to enrich our resource lists. Help equip our users
                            and recieve feedback on your work.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.Art}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#3a2d80">
                            <path d="M378.94 321.41L284.7 224h49.22c15.3 0 23.66-16.6 13.86-27.53L234.45 69.96c3.43-6.61 5.55-14 5.55-21.96 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 7.96 2.12 15.35 5.55 21.96L36.22 196.47C26.42 207.4 34.78 224 50.08 224H99.3L5.06 321.41C-6.69 333.56 3.34 352 21.7 352H160v32H48c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h288c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16H224v-32h138.3c18.36 0 28.39-18.44 16.64-30.59zM192 31.98c8.85 0 16.02 7.17 16.02 16.02 0 8.84-7.17 16.02-16.02 16.02S175.98 56.84 175.98 48c0-8.85 7.17-16.02 16.02-16.02zM304 432v32H80v-32h224z"/>
                        </svg>
                    </div>
                    <div className={classes.TextArea}>
                        <div className={classes.Text}>
                            <span>
                            Are you an educational expert or consultant?
                            </span> 
                            <span>
                            Help give structure to our contents and guide
                            users in choosing study topics and work paths that is 
                            best suited to specific careers.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.Art}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#3a2d80">
                            <path d="M378.94 321.41L284.7 224h49.22c15.3 0 23.66-16.6 13.86-27.53L234.45 69.96c3.43-6.61 5.55-14 5.55-21.96 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 7.96 2.12 15.35 5.55 21.96L36.22 196.47C26.42 207.4 34.78 224 50.08 224H99.3L5.06 321.41C-6.69 333.56 3.34 352 21.7 352H160v32H48c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h288c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16H224v-32h138.3c18.36 0 28.39-18.44 16.64-30.59zM192 31.98c8.85 0 16.02 7.17 16.02 16.02 0 8.84-7.17 16.02-16.02 16.02S175.98 56.84 175.98 48c0-8.85 7.17-16.02 16.02-16.02zM304 432v32H80v-32h224z"/>
                        </svg>
                    </div>
                    <div className={classes.TextArea}>
                        <div className={classes.Text}>
                            <span>
                            Join conversations to analyse research topics
                            on eduaction and human capital development, thereby
                            contributing editorially to blog publication tailored to 
                            further empower users.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.Art}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#3a2d80">
                            <path d="M378.94 321.41L284.7 224h49.22c15.3 0 23.66-16.6 13.86-27.53L234.45 69.96c3.43-6.61 5.55-14 5.55-21.96 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 7.96 2.12 15.35 5.55 21.96L36.22 196.47C26.42 207.4 34.78 224 50.08 224H99.3L5.06 321.41C-6.69 333.56 3.34 352 21.7 352H160v32H48c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h288c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16H224v-32h138.3c18.36 0 28.39-18.44 16.64-30.59zM192 31.98c8.85 0 16.02 7.17 16.02 16.02 0 8.84-7.17 16.02-16.02 16.02S175.98 56.84 175.98 48c0-8.85 7.17-16.02 16.02-16.02zM304 432v32H80v-32h224z"/>
                        </svg>
                    </div>
                    <div className={classes.TextArea}>
                        <div className={classes.Text}>
                            <span>
                            Are you a writer, creative, or developer?
                            </span> 
                            <span>
                            You can contribute editorially to publications
                            posted on selfpacer, and also help enhance the look and 
                            feel of selfpacer for optimum user experience.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.Art}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#3a2d80">
                            <path d="M378.94 321.41L284.7 224h49.22c15.3 0 23.66-16.6 13.86-27.53L234.45 69.96c3.43-6.61 5.55-14 5.55-21.96 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 7.96 2.12 15.35 5.55 21.96L36.22 196.47C26.42 207.4 34.78 224 50.08 224H99.3L5.06 321.41C-6.69 333.56 3.34 352 21.7 352H160v32H48c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h288c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16H224v-32h138.3c18.36 0 28.39-18.44 16.64-30.59zM192 31.98c8.85 0 16.02 7.17 16.02 16.02 0 8.84-7.17 16.02-16.02 16.02S175.98 56.84 175.98 48c0-8.85 7.17-16.02 16.02-16.02zM304 432v32H80v-32h224z"/>
                        </svg>
                    </div>
                    <div className={classes.TextArea}>
                        <div className={classes.Text}>
                            <span>
                            You can equip, structure, analyze, and enhance, 
                            all at the same time. If you are up to the task, you are 
                            more than welcome.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.FormContainer}>
                    <FormTitle>Become a Facilitator</FormTitle>
                    {form}
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user._id,
    accountType: state.auth.user.accountType,
    useTypeContext: state.auth.useTypeContext,
    workUrl1: state.auth.user.workUrl1,
    workUrl2: state.auth.user.workUrl2,
    becomeFacilitatorSuccessInfo: state.profile.becomeFacilitatorSuccessInfo,
    becomeFacilitatorError: state.profile.becomeFacilitatorError,
    becomeFacilitatorLoading: state.profile.becomeFacilitatorLoading
});

const mapDispatchToProps = dispatch => {
    return {
        onBecomeFacilitator: ( workUrl1, workUrl2, userId ) => dispatch( actions.becomeFacilitator( workUrl1, workUrl2, userId )),
        onResetEditProfileMessages: () => dispatch( actions.resetEditProfileMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NonFacilitator);