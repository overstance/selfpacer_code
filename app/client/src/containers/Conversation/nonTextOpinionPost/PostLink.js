import React, { Component } from 'react';
import classes from './nonTextOpinionPost.module.css';
import Button from '../../../components/UserInterface/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Form from '../../../components/UserInterface/Form/Form';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import PostActionInfo from '../../../components/PostActionInfo/PostActionInfo';
import FormFeedback from '../../../components/UserInterface/Form/FormFeedback/FormFeedback';
import Input from '../../../components/UserInterface/Input/Input';

class PostLinkOpinion extends Component {

    componentWillUnmount() {
        this.props.onClearNonTextOpinionPostMessages();
    }

    state = {  
        fillError: null,
        linkUrl: {
            value: '',
            label: 'enter link url',
            labelspan: '*',
            validation: {
                required: true,
                isUrl: true
            },
            valid: false,
            touched: false,
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isUrl) {
            const pattern = /^(ftp|http|https):\/\/[^ "]+$/
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    linkUrlChangeHandler = (event) => {
        const updated = {
            ...this.state.linkUrl,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.linkUrl.validation),
            touched: true
        }
        this.setState({ linkUrl: updated, fillError: null});   
    }

    submitHandler = (event) => {
        event.preventDefault();

        if (!this.state.linkUrl.touched || this.state.linkUrl.value === '') {
            const updated = {
                ...this.state.linkUrl,
                touched: true,
                valid: false
            }
        this.setState({ linkUrl: updated, fillError: 'Please enter link url'});
        } else {
            this.props.onPostLinkOpinion(this.state.linkUrl.value, this.props.opinions, this.props.user.name, this.props.user._id, this.props.conversationId); 
            this.setState({ fillError: null});
        }             
    }

    render() {
        let formButtonText = 'Post';
        if(this.props.postLinkOpinionLoading) {
            formButtonText = <Spinner isButton/>;
        }

        let uploadForm =
        <div className={classes.ContainerItem}>
            <Form
            submitForm={this.submitHandler}
            >
                <FormFeedback isFillError>
                    {this.state.fillError}
                </FormFeedback>
                <Input 
                label={this.state.linkUrl.label} 
                labelspan={this.state.linkUrl.labelspan}
                name={this.state.linkUrl.name}
                elementType={'textarea'}
                value={this.state.linkUrl.value}
                invalid={!this.state.linkUrl.valid}
                shouldValidate={this.state.linkUrl.validation}
                touched={this.state.linkUrl.touched}
                changed={(event) => this.linkUrlChangeHandler(event)}
                />
                { (!this.state.linkUrl.valid && this.state.linkUrl.touched) || this.props.postLinkOpinionLoading || this.state.fillError ?
                    <Button btnType='Danger'  disabled> {formButtonText} </Button> :
                    <Button btnType='Success'> {formButtonText} </Button>
                }
                { this.props.postLinkOpinionError ? 
                    <FormFeedback isFailed>
                        {this.props.postLinkOpinionError}
                    </FormFeedback>
                    :
                    <FormFeedback isSuccess>
                        {this.props.postLinkOpinionSuccessInfo}
                    </FormFeedback>
                }
            </Form>
        </div>  
        
        if (!this.props.postLinkOpinionLoading && this.props.postLinkOpinionSuccessInfo) {
            uploadForm =
            <PostActionInfo isSuccess>
               {this.props.postLinkOpinionSuccessInfo} 
            </PostActionInfo>
        } else if (!this.props.postLinkOpinionLoading && this.props.postLinkOpinionError) {
            uploadForm =
            <PostActionInfo isFailed>
               {this.props.postLinkOpinionError} 
            </PostActionInfo>
        }

        return(uploadForm)
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    opinions: state.conversation.opinions,
    postLinkOpinionLoading: state.conversation.postLinkOpinionLoading,
    postLinkOpinionError: state.conversation.postLinkOpinionError,
    postLinkOpinionSuccessInfo: state.conversation.postLinkOpinionSuccessInfo  
});

const mapDispatchToProps = dispatch => {
    return {
        onPostLinkOpinion: ( linkUrl, opinions, opiner, opinerId, conversationId ) => dispatch( actions.postLinkOpinion( linkUrl, opinions, opiner, opinerId, conversationId )),
        onClearNonTextOpinionPostMessages: () => dispatch( actions.clearNonTextOpinionPostMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLinkOpinion);