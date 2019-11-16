import React, { Component } from 'react';
import classes from './ManageBlogFilters.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
import Spinner from '../UserInterface/Spinner/Spinner';

class EditBlogTags extends Component {

    componentWillUnmount () {
        this.props.onClearEditBlogFiltersInfo();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.blogTags !== prevProps.blogTags) {
            const tagsUpdated = {
                ...this.state.blogTags,
                value: this.props.blogTags
            }
    
            this.setState({ blogTags: tagsUpdated });
        }
    }

    state = {
        fillError: null,
        blogTags: {
            value: this.props.blogTags,
            label: "blog tags", 
            name: "blogTags",
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

        return isValid;
    }


    submitForm = (event) => {
        event.preventDefault();

        if ( this.props.editBlogTagsSuccessInfo && !this.state.blogTags.touched) {
            const blogTagsUpdated = {
                ...this.state.blogTags,
                touched: true,
                valid: false
            }
            this.setState({ blogTags: blogTagsUpdated, fillError: 'No Edit Made'});

        } else {
            this.props.onEditBlogTags(this.state.blogTags.value, this.props.tagsId);
        }
        
    }

    blogTagsChangedHandler = (event) => {
        const updated = {
            ...this.state.blogTags,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.blogTags.validation),
            touched: true
        }
        this.setState({ blogTags: updated, fillError: null});
       
    } 

    render() {

        let formButtonText = 'Submit';
        if(this.props.editBlogTagsLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Edit Tags</FormTitle>
                <Form
                submitForm={this.submitForm}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    <Input 
                    label={this.state.blogTags.label} 
                    name={this.state.blogTags.name}
                    value={this.state.blogTags.value}
                    elementType={'textarea'}
                    invalid={!this.state.blogTags.valid}
                    shouldValidate={this.state.blogTags.validation}
                    touched={this.state.blogTags.touched}
                    changed={(event) => this.blogTagsChangedHandler(event)}
                    />
                    { (!this.state.blogTags.valid && this.state.blogTags.touched) || 
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.editBlogTagsError ? 
                        <FormFeedback isFailed>
                            {this.props.editBlogTagsError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.editBlogTagsSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    editBlogTagsSuccessInfo: state.blog.editBlogTagsSuccessInfo,
    editBlogTagsLoading: state.blog.editBlogTagsLoading,
    editBlogTagsError: state.blog.editBlogTagsError,
    blogTags: state.blog.blogTags,
    tagsId: state.blog.tagsId
});

const mapDispatchToProps = dispatch => {
    return {
        onEditBlogTags: (blogTags, id) => dispatch( actions.editBlogTags(blogTags, id) ),
        onClearEditBlogFiltersInfo: () => dispatch( actions.clearEditBlogFiltersInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogTags);