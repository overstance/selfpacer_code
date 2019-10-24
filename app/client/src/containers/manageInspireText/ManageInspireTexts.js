import React, { Component } from 'react';
import classes from './manageInspireTexts.module.css';
import {connect} from 'react-redux';
import InspireItem from './InspireItem';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Input from '../../components/UserInterface/Input/Input';
import Form from '../../components/UserInterface/Form/Form';
// import FormFeedBack from '../../components/UserInterface/Form/FormFeedback/FormFeedback';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';

class SharedCollectionsBySubject extends Component {

    state = {
        subject: {
            value: '',
            label: "Enter Text", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        }
    }

    componentDidMount() {
        if ( this.props.useTypeContext === '4' ||
             this.props.useTypeContext === '5') {
            // window.addEventListener('scroll', this.handleScroll, false);
            // window.scroll(0, 0);
            // this.props.onFetchFacilitateApplicants(0);
        } else {
            this.props.history.push('/');       
        }       
    }

    render () {

        let textInput =
        <Form>
            <Input 
            label={this.state.subject.label} 
            name={this.state.subject.name}
            value={this.state.subject.value}
            elementType='textarea'
            invalid={!this.state.subject.valid}
            shouldValidate={this.state.subject.validation}
            touched={this.state.subject.touched}
            changed={(event) => this.subjectChangedHandler(event)}
            />
        </Form>

        let inspireTexts = <Spinner isComponent/>;

        if (!this.props.fetchInspireTextLoading) {

            if (this.props.inspireTexts.length === 0) {
                inspireTexts = 
                <PostActionInfo isSuccess>
                    {'No inspire text found.'}
                </PostActionInfo>
            } else {
                
                inspireTexts = this.props.inspireTexts.map( (collection, i) => (
                <InspireItem
                key={i}
                id={collection._id} 
                title={collection.title}
                itemCount={collection.resources.length}
                lastUpdated={new Date(collection.lastUpdated).toLocaleDateString()}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public, collection.featured, collection.curator)}
                description={collection.description}
                curator={collection.curator}
                />
                ));
            }
        } else if (this.props.fetchInspireTextError) {

            inspireTexts =
            <PostActionInfo>
                {this.props.fetchInspireTextError}
            </PostActionInfo>
        }

        return (
            <div>
                <div className={classes.SubjectWrapper}>
                    {textInput}
                </div>
                <div className={classes.CollectionWrapper}>
                    {inspireTexts}
                </div>
            </div>            
        )
    }
}

const mapStateToProps = state => ({
    fetchInspireTextError: state.admin1.fetchInspireTextError,
    fetchInspireTextLoading: state.admin1.fetchInspireTextLoading,
    inspireTexts: state.admin1.inspireTexts,
    useTypeContext: state.auth.useTypeContext,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSharedCollectionsBySpec: (userSpec) => dispatch(actions.fetchSharedCollectionsBySpec(userSpec)),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedCollectionsBySubject);