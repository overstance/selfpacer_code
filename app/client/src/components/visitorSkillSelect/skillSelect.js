import React, { Component } from 'react';
import classes from './skillSelect.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../UserInterface/Form/Form';
// import Spinner from '../UserInterface/Spinner/Spinner';
import Input from '../UserInterface/Input/Input';
import { withRouter } from 'react-router-dom';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';

class SkillSelect extends Component {

    /* constructor(props) {
        super(props);
        this.selectHeading = React.createRef();
    } */

    /* componentDidMount() {
        this.selectHeading.current.focus();
    } */

    componentDidUpdate(prevProps) {
        console.log(this.props.location.pathname);
        if (this.props.userSpec !== prevProps.userSpec && this.props.userSpec !== '' && this.props.location.pathname === '/') {
            this.props.history.push('/explore');
        }
    }
    
    state = {
        fillError: null,
        subject: {
            value: '',
            label: "select skill", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
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

        return isValid;
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

    subjectChangedHandler = (event) => {

        const subjectUpdatedpdated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        this.setState({ subject: subjectUpdatedpdated}, () => {
            if (this.state.subject.value === '') {
                this.setState({ subject: subjectUpdatedpdated, fillError: null})
            } else {
                this.props.onSetVisitorSpecialization( this.state.subject.value);
            }
        });
    }

    submitFormHandler = (event) => {
        event.preventDefault();

       /*  if ( this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Please select interest'});

        } else {
            this.props.onSetVisitorSpecialization( this.state.subject.value);
        } */
        
    }

    render() {

    let skillSelectForm =
    <Form
    submitForm={this.submitFormHandler}
    >
        <FormFeedback isFillError>
            {this.state.fillError}
        </FormFeedback>
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
    </Form>

        return(
            <div>
                <div 
                    ref={this.props.skillSelectModal}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                    className={classes.modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    <div className={classes.container}>  
                        <h3>
                            Please choose a skill below that represents or is closest to your area of interest.
                        </h3>
                        {skillSelectForm}
                    </div>
                </div>
                <div 
                    role="button"
                    aria-label="back to home"
                    onClick={this.props.closeSkillSelectOnClick}
                    onKeyUp={this.props.closeSkillSelectOnKey}
                    className={classes.backdrop}
                    tabIndex="0"/* 
                    show={this.props.show} */
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    userSpec: state.auth.userSpecialization
});

const mapDispatchToProps = dispatch => ({
    onSetVisitorSpecialization: (skill) => dispatch(actions.setVisitorSpecialization(skill))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkillSelect));