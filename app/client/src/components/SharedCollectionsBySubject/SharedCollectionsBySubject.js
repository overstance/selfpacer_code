import React, { Component } from 'react';
import classes from './SharedCollectionsBySubject.css';
import {connect} from 'react-redux';
import SharedCollectionContainer from '../SharedCollections/sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
import Input from '../UserInterface/Input/Input';
import Form from '../../components/UserInterface/Form/Form';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';

class SharedCollectionsBySubject extends Component {

    state = {
        subject: {
            value: '',
            label: "Select Subject", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        }
    }

    collectionClickedHandler = (title, lastUpdated, id, description, published, featured) => {
        const dateToString = new Date(lastUpdated).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, lastUpdated: dateToString, id: id, description: description, public: published, featured: featured} );
    }

    subjectChangedHandler = (event) => {

        const subjectUpdatedpdated = {
            ...this.state.subject,
            value: event.target.value
        }

        this.setState({ subject: subjectUpdatedpdated}, () => {
            this.props.onFetchSharedCollectionsBySpec(this.state.subject.value);
        });
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

        let subjectSelect =
        <Form>
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

        let sharedCollectionsBySpec = <Spinner isComponent/>;

        if (!this.props.sharedCollectionsLoading) {

            if (/* this.state.subject.value === 'select subject' */  this.state.subject.value === '') {
                sharedCollectionsBySpec = 
                <PostActionInfo isSuccess>
                    {'Please select a subject above.'}
                </PostActionInfo>
            } else if (this.props.sharedCollections.length === 0 ) {

                // let subject = this.props.userSpec;

                sharedCollectionsBySpec = 
                <PostActionInfo isSuccess>
                    {'No shared collections for "' + this.state.subject.value + '" yet. Please check back later.'}
                </PostActionInfo>
            } else if (this.props.sharedCollectionsFetchErrors) {

                sharedCollectionsBySpec =
                <PostActionInfo>
                    {this.props.sharedCollectionsFetchErrors}
                </PostActionInfo>
            } else {
                sharedCollectionsBySpec = this.props.sharedCollections.map( (collection, i) => (
                <SharedCollectionContainer
                key={i}
                id={collection._id} 
                title={collection.title}
                itemCount={collection.resources.length}
                lastUpdated={new Date(collection.lastUpdated).toLocaleDateString()}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public, collection.featured)}
                description={collection.description}
                />
                ));                   
            }
        }

        return (
            <div>
                <div className={classes.SubjectWrapper}>
                    {subjectSelect}
                </div>
                <div>
                    <div className={classes.CollectionWrapper}>               
                        {sharedCollectionsBySpec}
                    </div>
                </div>
            </div>            
        )
    }
}

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    sharedCollectionsFetchErrors: state.collection.sharedCollectionsFetchErrors,
    sharedCollectionsLoading: state.collection.sharedCollectionsLoading,
    sharedCollections: state.collection.sharedCollections,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSharedCollectionsBySpec: (userSpec) => dispatch(actions.fetchSharedCollectionsBySpec(userSpec)),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedCollectionsBySubject);