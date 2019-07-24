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
// import Input from '../UserInterface/Input/Input';

class UploadBlogImage extends Component {

    componentWillUnmount() {
        this.props.onClearUploadBlogImageState();
    }

    state = {  
        fillError: null,
        Image: null,
    }

    handleUpload = (e) => {
        this.setState({ Image: e.target.files[0], fillError: null });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.Image) {
            this.setState({ fillError: 'No file added!'})
        } else {
            this.props.onUploadBlogImage(this.state.Image); 
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
            <FormTitle isAdmin>Upload Image</FormTitle>
            <Form
            submitForm={this.submitHandler}
            encType="multipart/form-data"
            >
                <FormFeedback isFillError>
                    {this.state.fillError}
                </FormFeedback>
                <input 
                id='Image'
                className={classes.fileInput}
                type='file'
                name='Image'
                onChange={this.handleUpload}
                />
                { this.state.fillError ?
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


        return(uploadForm);
    }
}

const mapStateToProps = state => ({
    uploadBlogImageLoading: state.blog.uploadBlogImageLoading,
    uploadBlogImageError: state.blog.uploadBlogImageError,
    uploadBlogImageSuccessInfo: state.blog.uploadBlogImageSuccessInfo,
    // uploadedBlogImage: state.blog.uploadedBlogImage
});

const mapDispatchToProps = dispatch => {
    return {
        onUploadBlogImage: ( imageFile ) => dispatch( actions.uploadBlogImage( imageFile )),
        onClearUploadBlogImageState: () => dispatch( actions.clearUploadBlogImageState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadBlogImage);