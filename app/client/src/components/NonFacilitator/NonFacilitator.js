import React, {Component} from 'react';
import classes from './NonFacilitator.module.css';
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
                    <h1>Join our team of facilitators</h1>
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
                <div className={classes.instructorContainer}>
                    <div className={classes.sectionTextWrapper}>
                        <div className={classes.sectionText}>
                                Are you an instructional content creator?
                                Add and manage your resources to equip users
                                and recieve feedback on your work.
                        </div>
                    </div>
                </div>
                <div className={classes.sectionTextSmallMedia}>
                    Are you an instructional content creator?
                    Add and manage your resources to equip users
                    and recieve feedback on your work.
                </div>
                <div className={classes.sectionDivider}/>
                <div className={classes.counsellorContainer}>
                    <div className={classes.sectionTextWrapper}>
                        <div className={classes.sectionText}>
                                Are you an educational expert or human resource
                                consultant? Help structure contents and guide users in
                                skill acquisition and career pursuit.
                        </div>
                    </div>
                </div>
                <div className={classes.sectionTextSmallMedia}>
                    Are you an educational expert or human resource
                    consultant? Help structure contents and guide users in
                    skill acquisition and career pursuit.
                </div>
                <div className={classes.sectionDivider}/>
                <div className={classes.researcherContainer}>
                    <div className={classes.sectionTextWrapper}>
                        <div className={classes.sectionText}>
                                Do you enjoy researching and making sense 
                                of raw information? Help gather and interprete
                                data on education and human capital to empower
                                users.
                        </div>
                    </div>
                </div>
                <div className={classes.sectionTextSmallMedia}>
                    Do you enjoy researching and making sense 
                    of raw information? Help gather and interprete
                    data on education and human capital to empower
                    users.
                </div>
                <div className={classes.sectionDivider}/>
                <div className={classes.writerDesignerContainer}>
                    <div className={classes.sectionTextWrapper}>
                        <div className={classes.sectionText}>
                                Do you write or do graphics design? You can 
                                get involved in our publication process while
                                you promote your skills.
                        </div>
                    </div>
                </div>
                <div className={classes.sectionTextSmallMedia}>
                    Do you write or do graphics design? You can 
                    get involved in our publication process while
                    you promote your skills.
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