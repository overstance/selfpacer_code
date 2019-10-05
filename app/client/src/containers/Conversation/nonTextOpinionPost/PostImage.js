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

class PostImageOpinion extends Component {

    componentWillUnmount() {
        this.props.onClearNonTextOpinionPostMessages();
    }

    state = {  
        fillError: null,
        Image: null,
        caption: {
            value: '',
            label: 'Enter Image Caption',
            labelspan: '(6 to 100 char.)',
            name: 'caption',
            validation: {
                minLength:6,
                maxLength: 100
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    captionChangedHandler = (event) => {
        if (event.target.value === '') {
            const updated = {
                ...this.state.caption,
                value: event.target.value,
                valid: true,
                touched: true
            }
            this.setState({ caption: updated})
        } else {
            const updated = {
                ...this.state.caption,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.caption.validation),
                touched: true
            }
            this.setState({ caption: updated});
        }       
    }

    handleUpload = (e) => {
        this.setState({ Image: e.target.files[0], fillError: null });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.Image) {
            this.setState({ fillError: 'No file added!'})
        } else {
            this.props.onpostImageOpinion(this.state.Image, this.state.caption.value, this.props.opinions, this.props.user.name, this.props.user._id, this.props.conversationId); 
            const captionReset = {
                ...this.state.caption,
                value: '',
                touched: false
            }
            this.setState({ fillError: null, caption: captionReset});
        }             
    }

    render() {
        let formButtonText = 'Post';
        if(this.props.postImageOpinionLoading) {
            formButtonText = <Spinner isButton/>;
        }

        let uploadForm = 
        <div className={classes.ContainerItem}>
            <Form
            submitForm={this.submitHandler}
            encType="multipart/form-data"
            >
                <FormFeedback isFillError>
                    {this.state.fillError}
                </FormFeedback>
                <label className={classes.fileInputLabel}>image files only(png/jpeg/gif)</label>
                <input 
                    id='Image'
                    className={classes.fileInput}
                    type='file'
                    name='Image'
                    onChange={this.handleUpload}
                />
                <Input 
                label={this.state.caption.label} 
                labelspan={this.state.caption.labelspan}
                name={this.state.caption.name}
                elementType={'textarea'}
                value={this.state.caption.value}
                invalid={!this.state.caption.valid}
                shouldValidate={this.state.caption.validation}
                touched={this.state.caption.touched}
                changed={(event) => this.captionChangedHandler(event)}
                />
                { (!this.state.caption.valid && this.state.caption.touched) || this.props.postImageOpinionLoading || this.state.fillError ?
                    <Button btnType='Danger'  disabled> {formButtonText} </Button> :
                    <Button btnType='Success'> {formButtonText} </Button>
                }
                { this.props.postImageOpinionError ? 
                    <FormFeedback isFailed>
                        {this.props.postImageOpinionError}
                    </FormFeedback>
                    :
                    <FormFeedback isSuccess>
                        {this.props.postImageOpinionSuccessInfo}
                    </FormFeedback>
                }
            </Form>
        </div> 
        
        if (!this.props.postImageOpinionLoading && this.props.postImageOpinionSuccessInfo) {
            uploadForm =
            <PostActionInfo isSuccess>
               {this.props.postImageOpinionSuccessInfo} 
            </PostActionInfo>
        } else if (!this.props.postImageOpinionLoading && this.props.postImageOpinionError) {
            uploadForm =
            <PostActionInfo isFailed>
               {this.props.postImageOpinionError} 
            </PostActionInfo>
        }


        return(uploadForm);
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    opinions: state.conversation.opinions,
    postImageOpinionLoading: state.conversation.postImageOpinionLoading,
    postImageOpinionError: state.conversation.postImageOpinionError,
    postImageOpinionSuccessInfo: state.conversation.postImageOpinionSuccessInfo
});

const mapDispatchToProps = dispatch => {
    return {
        onpostImageOpinion: ( imageFile, caption, opinions, opiner, opinerId, conversationId ) => dispatch( actions.postImageOpinion( imageFile, caption, opinions, opiner, opinerId, conversationId )),
        onClearNonTextOpinionPostMessages: () => dispatch( actions.clearNonTextOpinionPostMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostImageOpinion);