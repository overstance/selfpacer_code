import React, { Component } from 'react';
import classes from './FeaturedCollections.css';
import {connect} from 'react-redux';
import SharedCollectionContainer from '../SharedCollections/sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
import PostActionInfo from '../PostActionInfo/PostActionInfo';

class FeaturedCollections extends Component {

    componentDidMount() {
        this.props.onFetchFeaturedCollectionsBySpec(this.props.userSpec);
    }

    collectionClickedHandler = (title, lastUpdated, id, description, published, featured) => {
        const dateToString = new Date(lastUpdated).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, lastUpdated: dateToString, id: id, description: description, public: published, featured: featured} );
    }

    render () {

        let featuredCollectionsBySpec = <div style={{ 'paddingTop': '2rem'}}><Spinner /></div>;

        if (!this.props.featuredCollectionsLoading) {
            if (this.props.featuredCollections.length === 0 ) {

                let userSpec = this.props.userSpec;

                featuredCollectionsBySpec = 
                <PostActionInfo isSuccess>
                    {'No featured collections for "' + userSpec + '" yet. Please check back later.'}
                </PostActionInfo>
            } else if (this.props.featuredCollectionsFetchErrors) {

                featuredCollectionsBySpec =
                <PostActionInfo>
                    {this.props.featuredCollectionsFetchErrors}
                </PostActionInfo>
            } else {
                featuredCollectionsBySpec = this.props.featuredCollections.map( (collection, i) => (
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
                { this.props.featuredCollections.length === 0 ? null :
                     <div className={classes.Description}>
                        {'Featured category: "' + this.props.userSpec + '"'}
                     </div>
                }
                <div className={classes.CollectionWrapper}>               
                    {featuredCollectionsBySpec}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    featuredCollectionsFetchErrors: state.collection.featuredCollectionsFetchErrors,
    featuredCollectionsLoading: state.collection.featuredCollectionsLoading,
    user: state.auth.user,
    userSpec: state.auth.user.specialization,
    featuredCollections: state.collection.featuredCollections,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchFeaturedCollectionsBySpec: (userSpec) => dispatch(actions.fetchFeaturedCollectionsBySpec(userSpec)),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes )),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedCollections);