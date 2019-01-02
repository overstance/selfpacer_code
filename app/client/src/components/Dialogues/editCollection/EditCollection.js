import React, { Component} from 'react';
import classes from './EditCollection.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Modal from '../../UserInterface/Modal/Modal';
import Input from '../../UserInterface/Input/Input';
import Button from '../../UserInterface/Button/Button';
import Spinner from '../../UserInterface/Spinner/Spinner';
// import { Link } from 'react-router-dom';
// import Collection from '../../../containers/collection/Collection';

class AddToCollection extends Component {

    componentWillUnmount() {
        this.props.onClearEditCollectionMessages()
    }

    state = {
        fillError: null,
        title: {
            value: this.props.clickedCollectionAttributes.title,
            label: "title", 
            name: "title",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        subject: {
            value: this.props.clickedCollectionAttributes.description,
            label: "change or add desciption", 
            name: "subject",
            validation: {},
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

        if ( !this.state.title.touched && !this.state.title.touched ) {
            const titleUpdated = {
                ...this.state.title,
                touched: true,
                valid: false
            }
            this.setState({ title: titleUpdated, fillError: 'Edit one or more field'});

        } else if ( !this.state.title.touched && this.state.subject.value === '') {
            const titleUpdated = {
                ...this.state.title,
                touched: true,
                valid: false
            }
            this.setState({ title: titleUpdated, fillError: 'Edit at least one field'});

        } else {

            const titleUpdated = {
                ...this.state.title,
                touched: false
            }

            const subjectUpdated = {
                ...this.state.subject,
                touched: false
            }

            this.props.onEditCollection(this.state.title.value, this.state.subject.value, this.props.clickedCollectionAttributes.id);

            this.setState({ fillError: null, title: titleUpdated, subject: subjectUpdated});
            
        }
        
    }

    subjectChangedHandler = (event) => {
        const subjectUpdated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        const titleUpdated = {
            ...this.state.title,
            valid: this.checkValidity(event.target.value, this.state.title.validation),
            touched: true
        }

        this.setState({ subject: subjectUpdated, title: titleUpdated, fillError: null});
       
    }

    titleChangedHandler = (event) => {
        const updated = {
            ...this.state.title,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.title.validation),
            touched: true
        }
        this.setState({ title: updated, fillError: null});
       
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
        <form 
        className={classes.Form}
        onSubmit={this.submitHandler}
        >
            <div className={classes.FillError}>{this.state.fillError}</div>
            <Input 
            label={this.state.title.label} 
            name={this.state.title.name}
            value={this.state.title.value}
            invalid={!this.state.title.valid}
            shouldValidate={this.state.title.validation}
            touched={this.state.title.touched}
            changed={(event) => this.titleChangedHandler(event)}
            />
            
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
            
            { (!this.state.title.valid && this.state.title.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Submit </Button> :
                <Button btnType='Success'> Submit </Button>    
            }
        </form>

        if (this.props.editCollectionLoading) {
            editForm =
            <div className={classes.Form}><Spinner /></div>
        }

        if (!this.props.editCollectionLoading && this.props.editCollectionSuccessInfo) {
            editForm =
            <div className={classes.Form}><div className={classes.AddFeedbackInfo}>{this.props.editCollectionSuccessInfo}</div></div>
        } else if (!this.props.editCollectionLoading && this.props.editCollectionError) {
            editForm =
            <div className={classes.Form}><div className={classes.ErrorFeedbackInfo}>{this.props.editCollectionError}</div></div>
        }


        return (
            <Modal show={this.props.showDialogue} closeModal={this.props.closeModal}>
                <div>
                    <div className={classes.DialogueTitleHead}>
                        <div className={classes.DialogueTitleColumn}>
                            <h5>Edit Collection</h5>
                        </div>
                        <div onClick={this.props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                    </div>
                    <div className={classes.DialogueMessage}>
                       {editForm} 
                    </div>
                </div>
            </Modal>
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    editCollectionSuccessInfo: state.collection.editCollectionSuccessInfo,
    editCollectionError: state.collection.editCollectionError,
    editCollectionLoading: state.collection.editCollectionLoading,
    clickedCollectionAttributes: state.collection.clickedCollectionAttributes,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onEditCollection: (title, description, collectionId) => dispatch( actions.editCollection(title, description, collectionId) ),
        onClearEditCollectionMessages: () => dispatch(actions.clearEditCollectionMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCollection);