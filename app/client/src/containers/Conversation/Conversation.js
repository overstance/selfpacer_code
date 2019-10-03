import React, { Component } from 'react';
import classes from './conversation.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/UserInterface/Button/Button';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Opinion from './opinion';


class Conversation extends Component {

    componentDidMount() {
        
        if (this.props.useTypeContext === '0') {
            this.props.history.push('/login');
        }   

        if (this.props.onGoingConversations.length === 0) {
            this.props.history.push('/facilitate');
        } else {
            // this.props.onFetchOpinions(this.props.match.params.id);
        }
    }

    state = {
        commentText: '',
        commentFillError: null,
    }

    captureCommentText = (event) => {
        this.setState({ commentText: event.target.value, commentFillError: null});   
    }

        

    render() {

        let displayedClosingDate;
        let topic;
        let currentConversation = this.props.onGoingConversations.find(conversation => conversation._id === this.props.match.params.id );
        if (currentConversation) {
            topic = currentConversation.topic;
            displayedClosingDate = new Date(currentConversation.closingDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }

        let formButtonText = 'post';
        if (this.props.postCommentLoading) {
            formButtonText = <Spinner isButton/>;
        }

        let opinionsArray = [
            {
                postDate: new Date(),
                opiner: 'Babatunde Ali-Brown',
                opinionText: 'Bacon ipsum dolor amet tri-tip beef tenderloin frankfurter alcatra burgdoggen tail andouille shankle jowl spare ribs boudin doner ham. Turkey ground round meatloaf pork loin venison sirloin strip steak buffalo. Picanha capicola prosciutto ribeye buffalo cupim burgdoggen filet mignon. Tail beef pig venison chicken corned beef picanha boudin prosciutto salami burgdoggen shankle. Sausage ground round rump jowl pastrami prosciutto biltong kielbasa. Biltong short ribs bresaola ham flank. Frankfurter picanha shank jerky landjaeger.'
            },
            {
                postDate: new Date(),
                opiner: 'Babatunde Ali-Brown',
                opinionText: 'Bacon ipsum dolor amet tri-tip beef tenderloin frankfurter alcatra burgdoggen tail andouille shankle jowl spare ribs boudin doner ham. Turkey ground round meatloaf pork loin venison sirloin strip steak buffalo. Picanha capicola prosciutto ribeye buffalo cupim burgdoggen filet mignon. Tail beef pig venison chicken corned beef picanha boudin prosciutto salami burgdoggen shankle. Sausage ground round rump jowl pastrami prosciutto biltong kielbasa. Biltong short ribs bresaola ham flank. Frankfurter picanha shank jerky landjaeger.'
            },
            {
                postDate: new Date(),
                opiner: 'Babatunde Ali-Brown',
                opinionText: 'Bacon ipsum dolor amet tri-tip beef tenderloin frankfurter alcatra burgdoggen tail andouille shankle jowl spare ribs boudin doner ham. Turkey ground round meatloaf pork loin venison sirloin strip steak buffalo. Picanha capicola prosciutto ribeye buffalo cupim burgdoggen filet mignon. Tail beef pig venison chicken corned beef picanha boudin prosciutto salami burgdoggen shankle. Sausage ground round rump jowl pastrami prosciutto biltong kielbasa. Biltong short ribs bresaola ham flank. Frankfurter picanha shank jerky landjaeger.'
            },

        ];
        
        let opinions = opinionsArray.map((opinion, i) => (
            <Opinion 
                key={i}
                postDate={opinion.postDate}
                opiner={opinion.opiner}
                opinionText={opinion.opinionText}
            />
        ));

        return (
            <div className={classes.backdrop}>
                <div className={classes.pageContainer}>
                    <Link to='/facilitate' className={classes.goBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"/>
                        </svg>
                        Go Back
                    </Link>
                    <div className={classes.header}>
                        <div className={classes.topic}>
                            {topic}
                        </div>
                        <div className={classes.options}>
                            <div className={classes.closing}>
                                <span>closing: </span><div>{displayedClosingDate}</div>
                            </div>
                            <div className={classes.buttons}>
                                <div className={classes.button}>
                                    close
                                </div>
                                <div className={classes.button}>
                                    extend
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.postSection}>
                        <form onSubmit={this.postComment}>
                            <div className={classes.textAreaWrapper}>
                                <textarea 
                                    ref={this.textInput}
                                    placeholder="enter your comment"
                                    className={classes.commentInput}
                                    value={this.state.commentText} 
                                    onChange={this.captureCommentText}
                                />
                            </div>
                            { this.state.commentText === '' || this.state.commentFillError ? 
                                <Button btnType='Danger' disabled> {formButtonText} </Button> :
                                <Button btnType='Success'> {formButtonText} </Button>    
                            }
                        </form>
                        <div className={classes.otherPostOptions}>  
                            <div className={classes.linkPost}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 01-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0120.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0020.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 00-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                                </svg>
                                <span>post link</span>
                            </div>
                            <div className={classes.imagePost}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/>
                                </svg>
                                <span>post image</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.formFeedBack}> 
                        { this.state.commentFillError ? <span className={classes.fillError}>{this.state.commentFillError}</span> : null}
                        { this.props.postCommentError ? <span className={classes.fillError}>{this.props.postCommentError}</span> : null}
                        { this.props.postCommentSuccessMessage ? <span className={classes.commentPostSuccess}>{this.props.postCommentSuccessMessage}</span> : null} 
                    </div>
                    <div className={classes.opinionSectionWrapper}>  
                        <div className={classes.opinions}>        
                            {opinions}
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        useTypeContext: state.auth.useTypeContext,
        onGoingConversations: state.conversation.onGoingConversations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onFetchOpinions: (conversationId) => dispatch(fetchOpinions(conversationId)),
        // onFetchConversations: () => dispatch(actions.fetchConversations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);