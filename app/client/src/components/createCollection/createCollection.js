import React, { Component } from 'react';
import classes from './createCollection.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Form from '../../components/UserInterface/Form/Form';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import FormTitle from '../../components/UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../../components/UserInterface/Form/FormFeedback/FormFeedback';

class CreateCollection extends Component {

    componentWillUnmount() {
        this.props.onResetCollectionMessages();
        this.props.onClearResourceToCollect();
    }

    state = {
        fillError: null,
        title: {
            value: '',
            label: "Name your Collection", 
            name: "title",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
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

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitResourceHandler = (event) => {
        event.preventDefault();

        if ( this.state.title.value === '' || !this.state.title.touched ) {

            const titleUpdated = {
                ...this.state.title,
                touched: true,
                valid: false
            }
            this.setState({ title: titleUpdated});

            this.setState({ fillError: 'Please fill all fields' });

        } else {
            this.props.onCreateCollection(this.state.title.value, this.props.user, this.props.resourceToCollect.id);
            
            const titleReset = {
                ...this.state.title,
                value: this.state.title.value
            }

            this.setState({ title: titleReset, fillError: null});
        }
        
    }

    titleChangedHandler = (event) => {
        const updated = {
            ...this.state.title,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.title.validation),
            touched: true
        }
        this.setState({ title: updated});      
    };

    render() {

        let createCollectionButtonText = 'create';
        if(this.props.loading) {
            createCollectionButtonText = <Spinner isButton/>;
        }

        const form = 
        <Form
        submitForm={this.submitResourceHandler}
        >
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
            <Input 
            label={this.state.title.label} 
            name={this.state.title.name}
            value={this.state.title.value}
            invalid={!this.state.title.valid}
            shouldValidate={this.state.title.validation}
            touched={this.state.title.touched}
            changed={(event) => this.titleChangedHandler(event)}
            />
            { this.props.resourceToCollect.id === '' ? null : 
                <div className={classes.ResourceLabel}>Resource To Add: </div>
            }
            { this.props.resourceToCollect.id === '' ? null :
                <div className={classes.ResourceContainer}>
                    <div className={classes.ResourceImgColumn}>
                        <img src={this.props.resourceToCollect.img} alt='resource' /> 
                    </div>
                    <div className={classes.ResourceTitleColumn}>
                        <div className={classes.ResourceTitle}>{this.props.resourceToCollect.title}</div>
                    </div>   
                </div>     
            }                      
            { (!this.state.title.valid && this.state.title.touched)  ? 
                <Button btnType='Danger' disabled> {createCollectionButtonText} </Button> :
                <Button btnType='Success'> {createCollectionButtonText} </Button>    
            }
            { this.props.error ? 
                <FormFeedback isFailed>
                    {this.props.error}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.successMessage}
                </FormFeedback>
            }
        </Form>

        const successDialogue = 
        <PostActionInfo
        isSuccess
        >
            {this.props.successMessage}
        </PostActionInfo>

        let content = form;

        if ( this.props.successMessage) {
            content = successDialogue;
        }


        return (
            <div className={classes.ContainerItem}>
                <FormTitle>Create Collection</FormTitle>
                {content}
            </div >                                  
        )
    }
};

const mapStateToProps = state => ({
    successMessage: state.collection.successMessage,
    loading: state.collection.loading,
    error: state.collection.error,
    user: state.auth.user,
    resourceToCollect: state.collection.resourceToCollect
});

const mapDispatchToProps = dispatch => {
    return {
        onCreateCollection: (title, user, resourceToAdd) => dispatch( actions.createCollection(title, user, resourceToAdd) ),
        onResetCollectionMessages: () => dispatch(actions.resetCollectionMessages() ),
        onClearResourceToCollect: () => dispatch(actions.clearResourceToCollect())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (CreateCollection);