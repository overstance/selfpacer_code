import React, { Component } from 'react';
import classes from './UserCollections.css';
import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
import UserCollectionContainer from './userCollectionContainer/userCollectionContainer';
import SharedCollectionContainer from './sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import ReactDOM from 'react-dom';
// import SubHeader from '../../components/UserInterface/Subheader/SubHeader';

class UserCollections extends Component {

    constructor(props) {
        super(props);
        this.carousel = React.createRef();
    }

    componentDidMount() {
        this.props.onFetchUserCollections(this.props.user._id);
        this.props.onFetchSharedCollections();
    }

    /* componentWillUnmount() {
        this.props.onClearMessages();
    } */

    collectionClickedHandler = (title, date, id, description, published) => {
        const dateToString = new Date(date).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, date: dateToString, id: id, description: description, public: published} );
    }

    previousSharedCollectionHandler = () => {

        const Carousel = ReactDOM.findDOMNode(this.carousel.current);

        let width = 170; // image width
        let count = 3; // visible images count

        let list = Carousel.querySelector('ul');
        // let listElems = Carousel.querySelectorAll('a');

        let position = parseInt(list.style.marginLeft, 10); // ribbon scroll position

        // shift left
        position += width * count;
        // can't move to the left too much, end of images
        position = Math.min(position, 0);
        console.log(width, count, position);
        list.style.marginLeft = position + 'px';
    }

    nextSharedCollectionHandler = () => {

        const Carousel = ReactDOM.findDOMNode(this.carousel.current);

        let width = 170; // image width
        let count = 3; // visible images count

        let list = Carousel.querySelector('ul');
        let listElems = Carousel.querySelectorAll('a');

        let init = list.style.marginLeft;

        // let initPos = list.style.marginLeft;
        console.log({init: init, num: 2});

        if ( init === '') {
            let position = 0;

            position -= width * count;
            // can only shift the ribbbon for (total ribbon length - visible count) images
            position = Math.max(position, -width * (listElems.length - count));

            console.log(width, count, position, listElems.length);
            list.style.marginLeft = position + 'px';

            init = position
        } else {
            let position = parseInt(list.style.marginLeft, 10);

            position -= width * count;
            // can only shift the ribbbon for (total ribbon length - visible count) images
            position = Math.max(position, -width * (listElems.length - count));

            console.log(width, count, position, listElems.length);
            list.style.marginLeft = position + 'px';

            init = position
        }

        let position = parseInt(init, 10); // ribbon scroll position
        console.log(position);

        

    }

    
    render() {

        let sharedCollections = <div style={{ 'paddingTop': '2rem', 'paddingBottom': '2rem'}}><Spinner /></div>;
        // let sharedCollections = <div style={{ 'paddingTop': '5rem'}}><Spinner /></div>;

        if (!this.props.sharedCollectionsLoading) {
            if ( this.props.sharedCollections.length === 0) {
                sharedCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>No shared collections!</div>
                 </div>    
            } else if (this.props.sharedCollectionsFetchErrors) {
                sharedCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>{this.props.sharedCollectionsFetchErrors}</div>
                 </div>
            } else {
            sharedCollections = this.props.sharedCollections.map( (collection, i) => (
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

        let userCollections = <div style={{ 'paddingTop': '2rem'}}><Spinner /></div>;
        // let sharedCollections = <div style={{ 'paddingTop': '5rem'}}><Spinner /></div>;

        if (!this.props.loading) {
            if ( this.props.collections.length === 0) {
                userCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>You have no collections!</div>
                 </div>    
            } else if (this.props.userCollectionsFetchErrors) {
                userCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>{this.props.userCollectionsFetchErrors}</div>
                 </div>
            } else {
            userCollections = this.props.collections.map( (collection, i) => (
                <UserCollectionContainer
                key={i}
                id={collection._id} 
                title={collection.title}
                itemCount={collection.resources.length}
                date={new Date(collection.date).toLocaleDateString()}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.date, collection._id, collection.description, collection.public)}
                />
            ));
            }
        }     

        return (
            <Grid>
                <div>
                    <div className={classes.YourCollection}>SHARED COLLECTIONS</div>
                    <div ref={this.carousel} className={classes.Carousel}>
                        <div className={classes.Previous} onClick={this.previousSharedCollectionHandler}></div>
                        <div className={classes.VisibleCollections}>
                            <ul className={classes.SharedCollectionWrapper}>
                                {sharedCollections}
                            </ul>
                        </div>
                        <div className={classes.Next} onClick={this.nextSharedCollectionHandler}></div>
                    </div>  
                </div>
                <div>
                    <div className={classes.YourCollection}>YOUR COLLECTIONS</div>
                    <div className={classes.CollectionWrapper}>
                        {userCollections}
                    </div>
                </div>    
            </Grid>
        );
    }
};

const mapStateToProps = state => ({
    collections: state.collection.userCollections,
    loading: state.collection.loading,
    userCollectionsFetchErrors: state.collection.userCollectionsFetchErrors,
    sharedCollections: state.collection.sharedCollections,
    sharedCollectionsFetchErrors: state.collection.sharedCollectionsFetchErrors,
    sharedCollectionsLoading: state.collection.sharedCollectionsLoading,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        /* onAddResourceToCollection: (collectionId, collectionResources, resourceToAdd) => dispatch(actions.addResourceToCollection(collectionId, collectionResources, resourceToAdd)),
        onResourceAlreadyAdded: (collectionTitle) => dispatch( actions.resourceAlreadyAdded(collectionTitle)), */
        onFetchUserCollections: (userId) => dispatch( actions.fetchUserCollections(userId)),
        onFetchSharedCollections: () => dispatch(actions.fetchSharedCollections()),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);