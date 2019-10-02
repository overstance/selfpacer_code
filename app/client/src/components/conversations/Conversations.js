import React, { Component } from 'react';
import classes from './conversations.module.css';
// import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Conversation from './conversation';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Dialogue from '../Dialogues/Dialogue/Dialogue';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';
import Form from '../UserInterface/Form/Form';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';

class Conversations extends Component {

    componentDidMount() {
        this.props.onFetchConversations();
    }

    componentWillUnmount() {
        this.props.onClearFetchConversationsMessage();
    }

    state = {
        showStartNewForm: false,

        fillError: null,
        type: {
            value: '',
            label: "select conversation type", 
            labelspan: '*',
            name: "type",
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
                        value: 'Skills and Curricula',
                        displayValue: 'Skills and Curricula'
                    },
                    {
                        value: 'User Experience',
                        displayValue: 'User Experience'
                    },
                    {
                        value: 'Publication Research',
                        displayValue: 'Publication Research'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        topic: {
            value: '',
            label: 'enter topic',
            labelspan: '(100 or less char.)*',
            validation: {
                required: true,
                maxLength: 120
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

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    startNewClicked = () => {
        this.setState({ showStartNewForm: true });
    }

    closeStartNewForm = () => {
        this.props.onClearStartNewConversationInfo();
        const topicReset = {
            ...this.state.topic,
            value: '',
            touched: false
        }

        const typeReset = {
            ...this.state.type,
            value: '',
            touched: false
        }
        this.setState({ showStartNewForm: false, type: typeReset, topic: topicReset, fillError: null});
    }

    typeChangedHandler = (event) => {
        const updated = {
            ...this.state.type,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: true
        }

        this.setState({ type: updated, fillError: null});   
    }

    topicChangedHandler = (event) => {
        const updated = {
            ...this.state.topic,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.topic.validation),
            touched: true
        }

        this.setState({ topic: updated, fillError: null});   
    }

    submitForm = (event) => {
        event.preventDefault();
        if (!this.state.type.touched || this.state.type.value === '') {
            const updated = {
                ...this.state.type,
                touched: true,
                valid: false
            }

            this.setState({ fillError: 'Please fill all fields', type: updated });
        } else if (!this.state.topic.touched || this.state.topic.value === '') {
            const updated = {
                ...this.state.topic,
                touched: true,
                valid: false
            }

            this.setState({ fillError: 'Please fill all fields', topic: updated });
        } else {
            this.props.onStartNewConversation(this.state.type.value, this.state.topic.value, this.props.user._id, this.props.user.name, this.props.onGoingConversations);
            const topicReset = {
                ...this.state.topic,
                value: '',
                touched: false
            }

            const typeReset = {
                ...this.state.type,
                value: '',
                touched: false
            }
            this.setState({ type: typeReset, topic: topicReset, fillError: null});
        }
        
    };

    render() {

        let formButtonText = 'start';
        if(this.props.startNewConversationLoading) {
            formButtonText = <Spinner isButton/>
        }

        let startNewForm = 
        <Form submitForm={this.submitForm}>
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
            <Input 
            label={this.state.type.label} 
            labelspan={this.state.type.labelspan}
            value={this.state.type.value}
            elementType='select'
            invalid={!this.state.type.valid}
            shouldValidate={this.state.type.validation}
            touched={this.state.type.touched}
            elementConfig={this.state.type.elementConfig}
            changed={(event) => this.typeChangedHandler(event)}
            />
            <Input 
            label={this.state.topic.label} 
            labelspan={this.state.topic.labelspan}
            elementType={'textarea'}
            value={this.state.topic.value}
            invalid={!this.state.topic.valid}
            shouldValidate={this.state.topic.validation}
            touched={this.state.topic.touched}
            changed={(event) => this.topicChangedHandler(event)}
            />
            { (!this.state.type.valid && this.state.type.touched) ||
              (!this.state.topic.valid && this.state.topic.touched) ||
              this.state.fillError ||
              this.props.startNewConversationLoading  ? 
                <Button btnType='Danger' disabled> {formButtonText} </Button> :
                <Button btnType='Success'> {formButtonText} </Button>    
            }
            { this.props.startNewConversationError ? 
                <FormFeedback isFailed>
                    {this.props.startNewConversationError}
                </FormFeedback>
                :
                null
            }
        </Form>

        if (!this.props.startNewConversationLoading && this.props.startNewConversationSuccessInfo) {
            startNewForm = 
            <PostActionInfo isSuccess>
                {this.props.startNewConversationSuccessInfo}
            </PostActionInfo>
        }

        let conversationCount = this.props.onGoingConversations.length;

        let conversations = <Spinner isComponent/> 

        if (!this.props.fetchConversationsLoading && !this.props.fetchConversationsError && this.props.onGoingConversations.length === 0) {
            conversations =
            <PostActionInfo isSuccess>
                No currently ongoing conversations at the moment.
            </PostActionInfo>
        } else if (!this.props.fetchConversationsLoading && !this.props.fetchConversationsError) {
            conversations = this.props.onGoingConversations.map((conversation, i) => (
                <Conversation 
                key={i}
                topic={conversation.topic}
                type={conversation.type}
                id={conversation._id}
                initiator={conversation.initiator}
                closingDate={conversation.closingDate}
                startDate={conversation.startDate}
                />
            ));
        } else if (!this.props.fetchConversationsLoading && this.props.fetchConversationsError) {
            conversations =
            <PostActionInfo isFailed>
                {this.props.fetchConversationsError}
            </PostActionInfo>
        }


        return(
            <div className={classes.container}>
                <div className={classes.conversations}>
                    <div className={classes.header}>
                        <div className={classes.heading}>
                            {'(' + conversationCount + ') conversations'}
                        </div>
                        { conversationCount >= 10 || this.props.fetchConversationsError || this.props.fetchConversationsLoading ?
                            null :
                            <div className={classes.startNew}>
                                <div 
                                    className={classes.startNewButton}
                                    onClick={this.startNewClicked}
                                >
                                    start new
                                </div>
                            </div>     
                        }
                    </div>
                    {conversations}
                </div>
                { this.state.showStartNewForm ?
                    <Dialogue
                        isStartConversation
                        closeDialogue={this.closeStartNewForm}
                        showDialogue={this.state.showStartNewForm}
                    >
                        {startNewForm}
                    </Dialogue>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,

    fetchConversationsLoading: state.conversation.fetchConversationsLoading,
    fetchConversationsError: state.conversation.fetchConversationsError,
    onGoingConversations: state.conversation.onGoingConversations,

    startNewConversationLoading: state.conversation.startNewConversationLoading,
    startNewConversationError: state.conversation.startNewConversationError,
    startNewConversationSuccessInfo: state.conversation.startNewConversationSuccessInfo
});

const mapDispatchToProps = dispatch => ({
    onFetchConversations: () => dispatch(actions.fetchConversations()),
    onClearFetchConversationsMessage: () =>(actions.clearFetchConversationsMessage()),
    onStartNewConversation: (type, topic, initiatorId, initiator, onGoingConversations) => dispatch(actions.startNewConversation(type, topic, initiatorId, initiator, onGoingConversations)),
    onClearStartNewConversationInfo: () => dispatch(actions.clearStartNewConversationInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)