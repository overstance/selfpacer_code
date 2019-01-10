import React, { Component } from 'react';
import classes from './AllSharedCollections.css';
import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
import SharedCollectionContainer from '../userCollections/sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Input from '../../components/UserInterface/Input/Input';

class AllSharedCollections extends Component {

    state = {
        subject: {
            value: 'Accounting',
            label: "select category", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        }
    }

    collectionClickedHandler = (title, date, id, description, published) => {
        const dateToString = new Date(date).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, date: dateToString, id: id, description: description, public: published} );
    }

    subjectChangedHandler = (event) => {

        const subjectUpdatedpdated = {
            ...this.state.subject,
            value: event.target.value
        }

        this.setState({ subject: subjectUpdatedpdated});
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

        // temp.unshift({ value: '', displayValue: ''});

        elementConfig.options = temp;

        return elementConfig;
    }

    render () {

        let userSpec1Content =
        <div className={classes.PostAddInfo}>
            <div>{'Sorry! No shared collections for ' + this.props.userSpec1 + ' yet.'}</div>
        </div>

        if ( this.props.userSpec1 !== 'N/A' ) {
            let bySpec1 = this.props.sharedCollections.filter( collection => collection.description === this.props.userSpec1);

            if(bySpec1.length > 0) {
                userSpec1Content = bySpec1.map( (collection, i) => (
                    <SharedCollectionContainer
                    key={i}
                    id={collection._id} 
                    title={collection.title}
                    itemCount={collection.resources.length}
                    date={new Date(collection.date).toLocaleDateString()}
                    collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description, collection.public)}
                    description={collection.description}
                    />
                ));
            }

        }

        let userSpec2Content =
        <div className={classes.PostAddInfo}>
            <div>{'Sorry! No shared collections for ' + this.props.userSpec2 + ' yet.'}</div>
        </div>

        if ( this.props.userSpec2 !== '' ) {
            let bySpec2 = this.props.sharedCollections.filter( collection => collection.description === this.props.userSpec2);

            if(bySpec2.length > 0) {
                userSpec2Content = bySpec2.map( (collection, i) => (
                    <SharedCollectionContainer
                    key={i}
                    id={collection._id} 
                    title={collection.title}
                    itemCount={collection.resources.length}
                    date={new Date(collection.date).toLocaleDateString()}
                    collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description, collection.public)}
                    description={collection.description}
                    />
                ));
            }

        }

        let recentlyViewedContent = null;

        if ( this.props.userSpec1 === 'N/A' && this.props.userSpec2 === '' && this.props.recentlyViewed.length > 0 ) {
            let recentlyViewedCategory = this.props.recentlyViewed[this.props.recentlyViewed.length - 1].category;
            console.log(recentlyViewedCategory);
            let byRecentlyViewed = this.props.sharedCollections.filter( collection => collection.description === recentlyViewedCategory );

            if (byRecentlyViewed.length > 0) {
                let recentlyViewed = byRecentlyViewed.map( (collection, i) => (
                    <SharedCollectionContainer
                    key={i}
                    id={collection._id} 
                    title={collection.title}
                    itemCount={collection.resources.length}
                    date={new Date(collection.date).toLocaleDateString()}
                    collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description, collection.public)}
                    description={collection.description}
                    />
                ));
                
                recentlyViewedContent =
                <div>
                    <div className={classes.YourCollection}>{'SHARED COLLECTIONS IN: ' + recentlyViewedCategory}</div>
                    <div className={classes.CollectionWrapper}>
                        {recentlyViewed}
                    </div>
                </div>
            }
        }

        let category =
        <div 
        className={classes.Form}
        onSubmit={this.submitpathHandler}
        >
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
        </div>

        let noSpecOrRecentContent =
        <div className={classes.PostAddInfo}>
            <div>{'Sorry! No shared collections for ' + this.state.subject.value + ' yet.'}</div>
        </div>

        let byNoSpecNoRecent = this.props.sharedCollections.filter(collection => collection.description === this.state.subject.value);

        if (byNoSpecNoRecent.length > 0) {
            noSpecOrRecentContent = byNoSpecNoRecent.map( (collection, i) => (
                <SharedCollectionContainer
                key={i}
                id={collection._id} 
                title={collection.title}
                itemCount={collection.resources.length}
                date={new Date(collection.date).toLocaleDateString()}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description, collection.public)}
                description={collection.description}
                />
            ));
        }

        let noSpecOrRecentContainer =
        <div>
            <div className={classes.YourCollection}>SHARED COLLECTIONS BY CATEGORY</div>
            {category}
            <div className={classes.CollectionWrapper}>
                {noSpecOrRecentContent}
            </div>
        </div>

        return (
            <Grid>
                { this.props.userSpec1 !== 'N/A' ? 
                    <div>
                        <div className={classes.YourCollection}>{'SHARED COLLECTIONS IN: ' + this.props.userSpec1}</div>
                        <div className={classes.CollectionWrapper}>
                            {userSpec1Content}
                        </div>
                    </div>
                    :
                    null
                }
                { this.props.userSpec2 !== '' ? 
                    <div>
                        <div className={classes.YourCollection}>{'SHARED COLLECTIONS IN: ' + this.props.userSpec2}</div>
                        <div className={classes.CollectionWrapper}>
                            {userSpec2Content}
                        </div>
                    </div>
                    :
                    null
                }
                { this.props.userSpec1 === 'N/A' && this.props.userSpec2 === '' && this.props.recentlyViewed.length > 0 ? 
                    <div>
                        {recentlyViewedContent}
                    </div>
                    :
                    null
                }
                { this.props.userSpec1 === 'N/A' && this.props.userSpec2 === '' ? 
                    <div>
                        {noSpecOrRecentContainer}
                    </div>
                    :
                    null
                }
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    /* collections: state.collection.userCollections,
    loading: state.collection.loading,
    userCollectionsFetchErrors: state.collection.userCollectionsFetchErrors,
    sharedCollectionsFetchErrors: state.collection.sharedCollectionsFetchErrors,
    sharedCollectionsLoading: state.collection.sharedCollectionsLoading, */
    subjects: state.explore.subjects,
    sharedCollections: state.collection.sharedCollections,
    userSpec1: state.auth.user.specialization,
    userSpec2: state.auth.user.specialization_alt,
    recentlyViewed: state.resource.recentlyViewedResources
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchUserCollections: (userId) => dispatch( actions.fetchUserCollections(userId)),
        // onFetchSharedCollections: () => dispatch(actions.fetchSharedCollections()),
        // onFetchRecentlyViewedResources: (userId) => dispatch(actions.fetchRecentlyViewedResources(userId)),
        // onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSharedCollections);