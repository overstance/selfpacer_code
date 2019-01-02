import React, { Component } from 'react';
import classes from './UserCollections.css';
import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
import UserCollectionContainer from './userCollectionContainer/userCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
// import SubHeader from '../../components/UserInterface/Subheader/SubHeader';

class UserCollections extends Component {

    componentDidMount() {
        this.props.onFetchUserCollections(this.props.user._id);
    }

    /* componentWillUnmount() {
        this.props.onClearMessages();
    } */

    collectionClickedHandler = (title, date, id, description) => {
        const dateToString = new Date(date).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, date: dateToString, id: id, description: description} );
    }

    
    render() {

        let content = <div style={{ 'paddingTop': '5rem'}}><Spinner /></div>;

        const collections = this.props.collections.map( (collection, i) => (
            <UserCollectionContainer
            key={i}
            id={collection._id} 
            title={collection.title}
            itemCount={collection.resources.length}
            date={new Date(collection.date).toLocaleDateString()}
            collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description)}
            />
        ));

        if (!this.props.loading) {
            content = collections
        }

        return (
            <Grid>
                <div className={classes.ContentContainer}>
                    <div className={classes.YourCollection}>YOUR COLLECTIONS</div>
                    <div className={classes.CollectionWrapper}>
                        {content}
                    </div>
                </div>    
            </Grid>
        );
    }
};

const mapStateToProps = state => ({
    collections: state.collection.userCollections,
    loading: state.collection.loading,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        /* onAddResourceToCollection: (collectionId, collectionResources, resourceToAdd) => dispatch(actions.addResourceToCollection(collectionId, collectionResources, resourceToAdd)),
        onResourceAlreadyAdded: (collectionTitle) => dispatch( actions.resourceAlreadyAdded(collectionTitle)), */
        onFetchUserCollections: (userId) => dispatch( actions.fetchUserCollections(userId)),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);