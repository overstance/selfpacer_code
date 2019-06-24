import React, { Component } from 'react';
import classes from './publishCollection.css';
// import Modal from '../../UserInterface/Modal/Modal';
import { connect } from 'react-redux';
import Spinner from '../../UserInterface/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import Input from '../../UserInterface/Input/Input';
import Button from '../../UserInterface/Button/Button';
import PostActionInfo from '../../PostActionInfo/PostActionInfo';
import Dialogue from '../../Dialogues/Dialogue/Dialogue';
import Form from '../../UserInterface/Form/Form';
// import { Link } from 'react-router-dom';

class publishCollection extends Component {

    componentWillUnmount() {
        this.props.onClearPublishCollectionMessages()
    }

    state = {
        fillError: null,
        subject: {
            value: '',
            label: "Add desciption", 
            name: "subject",
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


    submitHandler = (event) => {
        event.preventDefault();

        if ( !this.state.subject.touched && this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Description required'});

        } else {

            const subjectUpdated = {
                ...this.state.subject,
                touched: false
            }

            this.props.onPublishCollection(this.props.clickedCollectionAttributes.id, this.state.subject.value);

            this.setState({ fillError: null, subject: subjectUpdated});
            
        }
        
    }

    subjectChangedHandler = (event) => {
        const subjectUpdated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        this.setState({ subject: subjectUpdated, fillError: null});
       
    }

    elementConfig = () => {
        let elementConfig = {};
        
        const subjects = this.props.subjects.map( subject => subject.title );

        const subjectSort = subjects.sort();

        const temp = subjectSort.map( subject => {
            return {
                value: subject,
                displayValue: subject
            }
        })

        temp.unshift({ value: '', displayValue: ''});

        elementConfig.options = temp;

        return elementConfig;
    }

    render () {
        
        let editForm =
        <Form
        submitForm={this.submitHandler}
        >
            <div className={classes.FillError}>{this.state.fillError}</div>
            <Input 
            label={this.state.subject.label} 
            name={this.state.subject.name}
            value={this.state.subject.value}
            elementType='select'
            invalid={!this.state.subject.valid}
            shouldValidate={this.state.subject.validation}
            touched={this.state.subject.touched}
            elementConfig={this.elementConfig()}
            changed={(event) => this.subjectChangedHandler(event)}
            />
            
            { (!this.state.subject.valid && this.state.subject.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Publish </Button> :
                <Button btnType='Success'> Publish </Button>    
            }
        </Form>

        if (this.props.publishCollectionLoading) {
            editForm =
            <Spinner isDialogue/>
        }

        if (!this.props.publishCollectionLoading && this.props.publishCollectionSuccessInfo) {
            editForm =
            <PostActionInfo isSuccess>
               {this.props.publishCollectionSuccessInfo} 
            </PostActionInfo>
        } else if (!this.props.publishCollectionLoading && this.props.publishCollectionError) {
            editForm =
            <PostActionInfo isFailed>
               {this.props.publishCollectionError} 
            </PostActionInfo>
        }

        return (
            <Dialogue
            isPublishCollection
            closeDialogue={this.props.closeDialogue}
            showDialogue={this.props.showDialogue}
            >
                <div className={classes.DialogueMessage}>
                    {editForm} 
                </div>
            </Dialogue>
        )
    }
}

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    publishCollectionSuccessInfo: state.collection.publishCollectionSuccessInfo,
    publishCollectionError: state.collection.publishCollectionError,
    publishCollectionLoading: state.collection.publishCollectionLoading,
    clickedCollectionAttributes: state.collection.clickedCollectionAttributes
});

const mapDispatchToProps = dispatch => {
    return {
        onClearPublishCollectionMessages: () => dispatch(actions.clearPublishCollectionMessages()),
        onPublishCollection: (collectionId, description) => dispatch( actions.publishCollection(collectionId, description))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(publishCollection);
