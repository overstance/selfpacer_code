import React, { Component } from 'react';
import classes from './PinnedCollections.css';
import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
import SharedCollectionContainer from '../userCollections/sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';

class PinnedCollections extends Component {

    componentDidMount() {
        this.props.onFetchUserPinnedCollections(this.props.userId);
    }

    componentWillUnmount() {
        this.props.onClearMessages();
    }

    collectionClickedHandler = (title, date, id, description, published) => {
        const dateToString = new Date(date).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, date: dateToString, id: id, description: description, public: published} );
    }

    render () {

        let userPinnedCollections = <div style={{ 'paddingTop': '2rem'}}><Spinner /></div>;
        // let sharedCollections = <div style={{ 'paddingTop': '5rem'}}><Spinner /></div>;

        if (!this.props.loading) {
            if ( this.props.collections.length === 0) {
                userPinnedCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>You have no pinned collections.</div>
                 </div>    
            } else if (this.props.error) {
                userPinnedCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>{this.props.error}</div>
                 </div>
            } else {
            userPinnedCollections = this.props.collections.map( (collection, i) => (
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
        return (
            <Grid>
                <div>
                    <div className={classes.YourCollection}>YOUR PINNED COLLECTIONS</div>
                    <div className={classes.CollectionWrapper}>
                        {userPinnedCollections}
                    </div>
                </div>    
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user._id,
    loading: state.collection.fetchUserPinnedCollectionsLoading,
    error: state.collection.fetchUserPinnedCollectionsError,
    collections: state.collection.userPinnedCollections
});

const mapDispatchToProps = dispatch => {
    return {
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes )),
        onFetchUserPinnedCollections: (userId) => dispatch(actions.fetchUserPinnedCollections(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedCollections);