import React, { Component } from 'react';
import classes from './SharedCollections.module.css';
import {connect} from 'react-redux';
import SharedCollectionContainer from './sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';

class SharedCollections extends Component {

    componentDidMount() {
        this.props.onFetchSharedCollectionsBySpec(this.props.userSpec);
    }

    collectionClickedHandler = (title, lastUpdated, id, description, published, featured, curator) => {
        const dateToString = new Date(lastUpdated).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, lastUpdated: dateToString, id: id, description: description, public: published, featured: featured, curator: curator} );
    }

    render () {

        let sharedCollectionsBySpec = <Spinner isComponent/>;

        if (!this.props.sharedCollectionsLoading) {
            if (this.props.sharedCollections.length === 0 ) {

                let userSpec = this.props.userSpec;

                sharedCollectionsBySpec = 
                <PostActionInfo isSuccess>
                    {'No shared collections for "' + userSpec + '" yet. Please check back later.'}
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
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public, collection.featured, collection.curator)}
                description={collection.description}
                curator={collection.curator}
                />
                ));                   
            }
        }

        return (
            <div>
                { this.props.sharedCollections.length === 0 ? null :
                     <div className={classes.Description}>
                        {'Shared category: "' + this.props.userSpec + '"'}
                     </div>
                }
                <div className={classes.CollectionWrapper}>               
                    {sharedCollectionsBySpec}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sharedCollectionsFetchErrors: state.collection.sharedCollectionsFetchErrors,
    sharedCollectionsLoading: state.collection.sharedCollectionsLoading,
    user: state.auth.user,
    userSpec: state.auth.user.specialization,
    sharedCollections: state.collection.sharedCollections,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSharedCollectionsBySpec: (userSpec) => dispatch(actions.fetchSharedCollectionsBySpec(userSpec)),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes )),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedCollections);