import React, { Component } from 'react';
import classes from './ManageBlogFilters.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
// import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
// import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
// import Spinner from '../UserInterface/Spinner/Spinner';

class InitializeTags extends Component {

    initializeHandler = (e) => {
        e.preventDefault();
        this.props.onInitializeTags();
    }

    render() {

        /* let formButtonText = 'Initialize';
        if(this.props.editBlogTagsLoading) {
            formButtonText = <Spinner isButton/>;
        } */

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Initialize Tags</FormTitle>
                <Form
                submitForm={this.initializeHandler}
                >
                    {/* { this.props.editBlogTagsError ?  */}
                        {/* <FormFeedback isFailed>
                            {this.props.editBlogTagsError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.editBlogTagsSuccessInfo}
                        </FormFeedback> */}
                    {/* } */}
                    <Button btnType='Success' /* clicked={this.initializeHandler} */> Initialize Tags </Button>    
                </Form>
            </div >                                 
        )
    }
};

/* const mapStateToProps = state => ({
    editBlogTagsSuccessInfo: state.blog.editBlogTagsSuccessInfo,
    editBlogTagsLoading: state.blog.editBlogTagsLoading,
    editBlogTagsError: state.blog.editBlogTagsError,
    blogTags: state.blog.blogTags
}); */

const mapDispatchToProps = dispatch => {
    return {
        onInitializeTags: () => dispatch( actions.initializeTags())
    };
};

export default connect(null, mapDispatchToProps)(InitializeTags);