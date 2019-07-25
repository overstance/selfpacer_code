import React, { Component } from 'react';
import classes from './UploadBlogImage.module.css';
import Button from '../UserInterface/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
import Input from '../UserInterface/Input/Input';

class UploadWebBlogImage extends Component {

    componentWillUnmount() {
        this.props.onClearUploadBlogImageState();
    }

    state = {  
        fillError: null,
        imageUrl: {
            value: '',
            label: 'enter Image Url',
            name: 'imageUrl',
            validation: {
                required: true,
                isUrl: true
            },
            valid: false,
            touched: false,
        },
        source: {
            value: '',
            label: 'Enter Image Origin',
            labelspan: '(2 to 30 char.)',
            name: 'source',
            validation: {
                minLength:2,
                maxLength: 30
            },
            valid: false,
            touched: false,
        },
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

    imageUrlChangeHandler = (event) => {
        const updated = {
            ...this.state.imageUrl,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.imageUrl.validation),
            touched: true
        }
        this.setState({ imageUrl: updated, fillError: null});   
    }

    sourceChangedHandler = (event) => {
        if (event.target.value === '') {
            const updated = {
                ...this.state.source,
                value: event.target.value,
                valid: true,
                touched: true
            }
            this.setState({ source: updated})
        } else {
            const updated = {
                ...this.state.source,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.source.validation),
                touched: true
            }
            this.setState({ source: updated});
        }       
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

    submitHandler = (event) => {
        event.preventDefault();

        if (!this.state.imageUrl.touched || this.state.imageUrl.value === '') {
            const updated = {
                ...this.state.imageUrl,
                touched: true,
                valid: false
            }
        this.setState({ imageUrl: updated, fillError: 'Please enter web url'});
        } else {
            this.props.onUploadWebBlogImage(this.state.imageUrl.value, this.state.source.value, this.state.caption.value); 
            this.setState({ fillError: null});
        }             
    }

    render() {
        let formButtonText = 'Submit';
        if(this.props.uploadBlogImageLoading) {
            formButtonText = <Spinner isButton/>;
        }

        let uploadForm =
        <div className={classes.ContainerItem}>
            <FormTitle isAdmin>Upload From Web</FormTitle>
            <Form
            submitForm={this.submitHandler}
            >
                <FormFeedback isFillError>
                    {this.state.fillError}
                </FormFeedback>
                <Input 
                label={this.state.imageUrl.label} 
                name={this.state.imageUrl.name}
                elementType={'textarea'}
                value={this.state.imageUrl.value}
                invalid={!this.state.imageUrl.valid}
                shouldValidate={this.state.imageUrl.validation}
                touched={this.state.imageUrl.touched}
                changed={(event) => this.imageUrlChangeHandler(event)}
                />
                <Input 
                label={this.state.source.label} 
                labelspan={this.state.source.labelspan}
                name={this.state.source.name}
                elementType={'textarea'}
                value={this.state.source.value}
                invalid={!this.state.source.valid}
                shouldValidate={this.state.source.validation}
                touched={this.state.source.touched}
                changed={(event) => this.sourceChangedHandler(event)}
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
                { (!this.state.imageUrl.valid && this.state.imageUrl.touched) || (!this.state.source.valid && this.state.source.touched) || (!this.state.caption.valid && this.state.caption.touched) || this.state.fillError ?
                    <Button btnType='Danger'  disabled> {formButtonText} </Button> :
                    <Button btnType='Success'> {formButtonText} </Button>
                }
                { this.props.uploadBlogImageError ? 
                    <FormFeedback isFailed>
                        {this.props.uploadBlogImageError}
                    </FormFeedback>
                    :
                    <FormFeedback isSuccess>
                        {this.props.uploadBlogImageSuccessInfo}
                    </FormFeedback>
                }
            </Form>
        </div>  
        
        if (!this.props.uploadBlogImageLoading && this.props.uploadBlogImageSuccessInfo) {
            uploadForm =
            <PostActionInfo isSuccess>
               {this.props.uploadBlogImageSuccessInfo} 
            </PostActionInfo>
        } else if (!this.props.uploadBlogImageLoading && this.props.uploadBlogImageError) {
            uploadForm =
            <PostActionInfo isFailed>
               {this.props.uploadBlogImageError} 
            </PostActionInfo>
        }

        return(uploadForm)
    }
}

const mapStateToProps = state => ({
    uploadBlogImageLoading: state.blog.uploadBlogImageLoading,
    uploadBlogImageError: state.blog.uploadBlogImageError,
    uploadBlogImageSuccessInfo: state.blog.uploadBlogImageSuccessInfo,
    // uploadedWebBlogImage: state.blog.uploadedWebBlogImage
    
});

const mapDispatchToProps = dispatch => {
    return {
        onUploadWebBlogImage: ( imageUrl, source, caption ) => dispatch( actions.uploadWebBlogImage( imageUrl, source, caption )),
        onClearUploadBlogImageState: () => dispatch( actions.clearUploadBlogImageState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadWebBlogImage);