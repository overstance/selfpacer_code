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

class EditBlogCategories extends Component {

    componentWillUnmount () {
        this.props.onClearEditBlogFiltersInfo();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.blogCategories !== prevProps.blogCategories) {
            const categoriesUpdated = {
                ...this.state.blogCategories,
                value: this.props.blogCategories
            }
    
            this.setState({ blogCategories: categoriesUpdated });
        }
    }

    state = {
        fillError: null,
        blogCategories: {
            value: this.props.blogCategories,
            label: "blog categories", 
            name: "blogCategories",
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

        if ( this.props.editBlogCategoriesSuccessInfo && !this.state.blogCategories.touched) {
            const blogCategoriesUpdated = {
                ...this.state.blogCategories,
                touched: true,
                valid: false
            }
            this.setState({ blogCategories: blogCategoriesUpdated, fillError: 'No Edit Made'});

        } else {
            this.props.onEditBlogCategories(this.state.blogCategories.value, this.props.categoriesId);
        }
        
    }

    blogCategoriesChangedHandler = (event) => {
        const updated = {
            ...this.state.blogCategories,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.blogCategories.validation),
            touched: true
        }
        this.setState({ blogCategories: updated, fillError: null});
       
    } 

    render() {

        let formButtonText = 'Submit';
        if(this.props.editBlogCategoriesLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Edit Categories</FormTitle>
                <Form
                submitForm={this.submitForm}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    <Input 
                    label={this.state.blogCategories.label} 
                    name={this.state.blogCategories.name}
                    value={this.state.blogCategories.value}
                    elementType={'textarea'}
                    invalid={!this.state.blogCategories.valid}
                    shouldValidate={this.state.blogCategories.validation}
                    touched={this.state.blogCategories.touched}
                    changed={(event) => this.blogCategoriesChangedHandler(event)}
                    />
                    { (!this.state.blogCategories.valid && this.state.blogCategories.touched) || 
                      this.state.fillError ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.editBlogCategoriesError ? 
                        <FormFeedback isFailed>
                            {this.props.editBlogCategoriesError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.editBlogCategoriesSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    editBlogCategoriesSuccessInfo: state.blog.editBlogCategoriesSuccessInfo,
    editBlogCategoriesLoading: state.blog.editBlogCategoriesLoading,
    editBlogCategoriesError: state.blog.editBlogCategoriesError,
    blogCategories: state.blog.blogCategories,
    categoriesId: state.blog.categoriesId
});

const mapDispatchToProps = dispatch => {
    return {
        onEditBlogCategories: (blogCategories, id) => dispatch( actions.editBlogCategories(blogCategories, id) ),
        onClearEditBlogFiltersInfo: () => dispatch( actions.clearEditBlogFiltersInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogCategories);