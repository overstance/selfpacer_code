import React, { Component } from 'react';
import classes from './reportAbuse.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';
import Spinner from '../UserInterface/Spinner/Spinner';

class ReportAbuse extends Component {

    state = {  
        fillError: null,
        abuse: {
            value: '',
            label: 'Enter Abuse',
            name: 'abuse',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        }
    };

    componentDidUpdate(prevProps) {
        if(!this.props.reportAbuseError && this.props.latestAbuseReportId !== prevProps.latestAbuseReportId) {
            const stateReset = {
                ...this.state.abuse,
                value: '',
                touched: false
            }

            this.setState({ abuse: stateReset });
        }
    }

    componentWillUnmount() {
        this.props.onClearReportAbuseMessage()
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

    submitUserHandler = (event) => {
        event.preventDefault();

        if (!this.state.abuse.touched || this.state.abuse.value === '') {
            const updated = {
                ...this.state.abuse,
                touched: true,
                valid: false
            }
        this.setState({ abuse: updated});

        this.setState({ fillError: 'Please enter abuse' });
        } else if (!this.props.reportAbuseLoading) {
            this.props.onReportAbuse(this.state.abuse.value, this.props.reporterId, this.props.reporter);
        }       
    };

    
    inputChangedHandler = (event) => {
        const updated = {
            ...this.state.abuse,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.abuse.validation),
            touched: true
        }
        this.setState({ abuse: updated, fillError: null });   
    }

    render() {

        let formButtonText = 'Report';
        if(this.props.reportAbuseLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return (
            <div className={classes.ContainerItem}>
                <FormTitle isAdmin>Report Abuse</FormTitle>
                <Form 
                submitForm={this.submitUserHandler}
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    <Input 
                    label={this.state.abuse.label} 
                    name={this.state.abuse.name}
                    elementType={'textarea'}
                    value={this.state.abuse.value}
                    invalid={!this.state.abuse.valid}
                    shouldValidate={this.state.abuse.validation}
                    touched={this.state.abuse.touched}
                    changed={(event) => this.inputChangedHandler(event)}
                    />
                    { !this.state.abuse.valid && this.state.abuse.touched ? 
                        <Button btnType='Danger' disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>    
                    }
                    { this.props.reportAbuseError ? 
                        <FormFeedback isFailed>
                            {this.props.reportAbuseError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.reportAbuseSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div>                      
        )
    }
};

const mapStateToProps = state => ({
    reportAbuseLoading: state.admin1.reportAbuseLoading,
    reportAbuseSuccessInfo: state.admin1.reportAbuseSuccessInfo,
    reportAbuseError: state.admin1.reportAbuseError,
    latestAbuseReportId: state.admin1.latestAbuseReportId,
    reporterId: state.auth.user._id,
    reporter: state.auth.user.name
});

const mapDispatchToProps = dispatch => {
    return {
        onReportAbuse: (report, reporterId, reporter) => dispatch( actions.reportAbuse(report, reporterId, reporter)),
        onClearReportAbuseMessage: () => dispatch(actions.clearReportAbuseMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportAbuse);