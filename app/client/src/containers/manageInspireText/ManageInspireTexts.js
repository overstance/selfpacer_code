import React, { Component } from 'react';
import classes from './manageInspireTexts.module.css';
import {connect} from 'react-redux';
import InspireItem from './InspireItem';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Input from '../../components/UserInterface/Input/Input';
import Form from '../../components/UserInterface/Form/Form';
import Button from '../../components/UserInterface/Button/Button';
import FormFeedback from '../../components/UserInterface/Form/FormFeedback/FormFeedback';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import GridlessPageHeader from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper';


class ManageInspireTexts extends Component {

    state = {
        inspireText: {
            value: '',
            label: "enter new inspire text", 
            name: "inspireText",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        fillError: null
    }

    componentDidMount() {
        if ( this.props.useTypeContext === '4' ||
             this.props.useTypeContext === '5') {
            window.scroll(0, 0);
            this.props.onFetchInspireTexts();
        } else {
            this.props.history.push('/');       
        }       
    }

    componentDidUpdate(prevProps) {
        if( !this.props.addNewInspireTextError && this.props.newInspireTextId !== prevProps.newInspireTextId) {
            let inspireTextReset = {
                ...this.state.inspireText,
                value: '',
                touched: false
            }
            this.setState({inspireText: inspireTextReset });
        }
    }

    componentWillUnmount() {
        this.props.onClearInspireTextState()
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

    inspireTextChangedHandler = (event) => {
        event.preventDefault();

        if (event.target.value === '' && this.state.inspireText.touched) {
            let stateUpdated = {
                ...this.state.inspireText,
                value: '',
                valid: false,
                touched: true
            }

            this.setState({ inspireText: stateUpdated, fillError: 'please enter new inspire text'});
        } else {
            let stateUpdated = {
                ...this.state.inspireText,
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.inspireText.validation),
                touched: true
            }

            this.setState({ inspireText: stateUpdated, fillError: null });
        }
    }

    addNewInspireText = (event) => {
        event.preventDefault();

        let textValue = this.state.inspireText.value;
        let inspireTexts = this.props.inspireTexts;

        if (textValue === '') {
            let stateUpdated = {
                ...this.state.inspireText,
                value: '',
                valid: false,
                touched: true
            }

            this.setState({ inspireText: stateUpdated, fillError: 'please enter new inspire text'});
        } else {
            this.props.onAddNewInspireText(textValue, inspireTexts);
        }
    }

    deleteInspireTextHandler = (textId) => {
        this.props.onDeleteInspireText(textId, this.props.inspireTexts);
    }

    render () {
        let addNewButtonText = 'add';

        if(this.props.addNewInspireTextLoading) {
            addNewButtonText = <Spinner isButton/>
        }

        let textInput =
        <Form submitForm={this.addNewInspireText}>
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
            { this.props.addNewInspireTextError ?
                <FormFeedback isFailed>
                    {this.props.addNewInspireTextError}
                </FormFeedback>
                : null
            }
            { this.props.addNewInspireTextSuccessMessage ?
                <FormFeedback isSuccess>
                    {this.props.addNewInspireTextSuccessMessage}
                </FormFeedback>
                : null
            }
            <Input 
            label={this.state.inspireText.label} 
            name={this.state.inspireText.name}
            value={this.state.inspireText.value}
            elementType='textarea'
            invalid={!this.state.inspireText.valid}
            shouldValidate={this.state.inspireText.validation}
            touched={this.state.inspireText.touched}
            changed={(event) => this.inspireTextChangedHandler(event)}
            />
            { this.state.fillError || this.props.addNewInspireTextLoading ||
                (!this.state.inspireText.valid && this.state.inspireText.touched) ?
                <Button btnType ="Danger" disabled>{addNewButtonText}</Button>
                :
                <Button btnType ="Success">{addNewButtonText}</Button>
            }
        </Form>

        let inspireTexts = <Spinner isComponent/>;

        if (!this.props.fetchInspireTextsLoading) {

            if (this.props.inspireTexts.length === 0) {
                inspireTexts = 
                <PostActionInfo isSuccess>
                    {'No inspire text found.'}
                </PostActionInfo>
            } else {
                
                inspireTexts = this.props.inspireTexts.map( (inspireText, i) => (
                <InspireItem
                key={i}
                id={inspireText._id} 
                inspireText={inspireText.inspireText}
                deleteText={() => this.deleteInspireTextHandler(inspireText._id)}
                // collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public, collection.featured, collection.curator)}
                />
                ));
            }
        } else if (this.props.fetchInspireTextsError) {

            inspireTexts =
            <PostActionInfo>
                {this.props.fetchInspireTextsError}
            </PostActionInfo>
        }

        return (
            <GridlessPageHeader pageTitle="manage inspire texts">
                <div className={classes.formWrapper}>
                    <div className={classes.inputWrapper}>    
                        {textInput}    
                    </div>
                </div>
                <div className={classes.inspireTextsWrapper}>
                    <div className={classes.inspireTexts}>
                        {inspireTexts}
                    </div>
                </div>
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} />
            </GridlessPageHeader>            
        )
    }
}

const mapStateToProps = state => ({
    fetchInspireTextsError: state.admin1.fetchInspireTextsError,
    fetchInspireTextsLoading: state.admin1.fetchInspireTextsLoading,
    inspireTexts: state.admin1.inspireTexts,
    useTypeContext: state.auth.useTypeContext,

    addNewInspireTextLoading: state.admin1.addNewInspireTextLoading,
    addNewInspireTextError: state.admin1.addNewInspireTextError,
    addNewInspireTextSuccessMessage: state.admin1.addNewInspireTextSuccessMessage,
    newInspireTextId: state.admin1.newInspireTextId
});

const mapDispatchToProps = dispatch => {
    return {
        onAddNewInspireText: (textValue, inspireTexts) => dispatch(actions.addNewInspireText(textValue, inspireTexts)),
        onFetchInspireTexts: () => dispatch(actions.fetchInspireTexts()),
        onClearInspireTextState: () => dispatch(actions.clearInspireTextState()),
        onDeleteInspireText: (textId, inspireTexts) => dispatch(actions.deleteInspireText(textId, inspireTexts)),
        // onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageInspireTexts);