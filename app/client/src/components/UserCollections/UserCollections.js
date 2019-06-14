import React, { Component } from 'react';
import classes from './UserCollections.css';
// import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
import UserCollectionContainer from './userCollectionContainer/userCollectionContainer';
// import SharedCollectionContainer from './sharedCollectionContainer/sharedCollectionContainer';
import * as actions from '../../store/actions/index';
import Spinner from '../UserInterface/Spinner/Spinner';
// import ReactDOM from 'react-dom';
// import SubHeader from '../../components/UserInterface/Subheader/SubHeader';

class UserCollections extends Component {

    /* constructor(props) {
        super(props);
        this.carousel = React.createRef();
    } */

    componentDidMount() {
        this.props.onFetchUserCollections(this.props.user._id);
        // this.props.onFetchSharedCollections();

        // console.log( this.props.user.specialization, this.props.user.specialization_alt, this.props.user.recentlyViewed.length );
        /* if ( this.props.user.specialization === 'N/A' && this.props.user.specialization_alt === '' && this.props.user.recentlyViewed.length !== 0) {
            this.props.onFetchRecentlyViewedResources(this.props.user._id);
        } */
        
    }

    componentWillUnmount() {
        this.props.onClearMessages();
    }

    collectionClickedHandler = (title, lastUpdated, id, description, published) => {
        const dateToString = new Date(lastUpdated).toLocaleDateString();
        this.props.onSetClickedCollectionAttributes( {title: title, lastUpdated: dateToString, id: id, description: description, public: published} );
    }

    /* previousSharedCollectionHandler = () => {

        const Carousel = ReactDOM.findDOMNode(this.carousel.current);

        let width = 190; // image width
        let count = 1; // visible images count

        let list = Carousel.querySelector('ul');
        // let listElems = Carousel.querySelectorAll('a');

        let position = parseInt(list.style.marginLeft, 10); // ribbon scroll position

        // shift left
        position += width * count;
        // can't move to the left too much, end of images
        position = Math.min(position, 0);
        // console.log(width, count, position);
        list.style.marginLeft = position + 'px';
    }

    nextSharedCollectionHandler = () => {

        const Carousel = ReactDOM.findDOMNode(this.carousel.current);

        let width = 190; // image width
        let count = 1; // visible images count

        let list = Carousel.querySelector('ul');
        let listElems = Carousel.querySelectorAll('a');

        let init = list.style.marginLeft;

        // let initPos = list.style.marginLeft;
        // console.log({init: init, num: 2});

        if ( init === '') {
            let position = 0;

            position -= width * count;
            // can only shift the ribbbon for (total ribbon length - visible count) images
            position = Math.max(position, -width * (listElems.length - count));

            // console.log(width, count, position, listElems.length);
            list.style.marginLeft = position + 'px';

            init = position
        } else {
            let position = parseInt(list.style.marginLeft, 10);

            position -= width * count;
            // can only shift the ribbbon for (total ribbon length - visible count) images
            position = Math.max(position, -width * (listElems.length - count));

            // console.log(width, count, position, listElems.length);
            list.style.marginLeft = position + 'px';

            init = position
        }
    } */

    
    render() {

    /*     let sharedCollectionsContent = <div style={{ 'paddingTop': '2rem', 'paddingBottom': '2rem'}}><Spinner /></div>;

        if (!this.props.sharedCollectionsLoading) {

            let allSharedArray = this.props.sharedCollections;
            let byRecentlyViewed = [];
            let bySpec1 = [];
            let bySpec1and2 = [];

            let spec1 = this.props.user.specialization;
            let spec2 = this.props.user.specialization_alt;

            let recentlyViewed = this.props.recentlyViewed;

            let recentlyViewedCategory = '';

            if ( recentlyViewed.length > 0) {
                recentlyViewedCategory = recentlyViewed[recentlyViewed.length - 1].category;
            }
            

        if (this.props.sharedCollectionsFetchErrors) {
            // console.log('1.case fetcherror');
            sharedCollectionsContent =
            <div className={classes.AllWrapper}> 
                <div className={classes.PostAddInfo}>
                    <div>{this.props.sharedCollectionsFetchErrors}</div>
                </div>
            </div>
        } else if ( allSharedArray.length === 0) {
            // console.log('2.case no Shared');
            sharedCollectionsContent = 
            <div className={classes.AllWrapper}>
                <div className={classes.PostAddInfo}>
                    <div>No shared collections!</div>
                </div>
            </div>    
        } else if (spec1 === 'N/A' && spec2 === '' && recentlyViewed.length === 0) {
                // console.log('3.case no specs and no recently viewed');

                if ( allSharedArray.length > 20) {
                    allSharedArray = allSharedArray.slice(0, 20);
                }

                let sharedCollections = allSharedArray.map( (collection, i) => (
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
            
            sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.ViewAllWrapper}>
                        <Link to='/pinned_collections' className={classes.ViewPinned}>view pinned</Link>
                        <Link to='/all_shared_collections' className={classes.ViewAll}>view all</Link>
                    </div>
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
        } else if (spec1 === 'N/A' && spec2 === '' && recentlyViewed.length > 0) {
            // console.log('4.case no specs but recently viewed');
            byRecentlyViewed = allSharedArray.filter(collection => collection.description === recentlyViewedCategory); 

            if(byRecentlyViewed.length > 0) {
                // console.log('4a.case no specs but recently viewed and recently viewed category in all shared');
                if ( byRecentlyViewed.length > 20) {
                    byRecentlyViewed = byRecentlyViewed.slice(0, 20);
                }
                let sharedCollections = byRecentlyViewed.map( (collection, i) => (
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
                
                sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.ViewAllWrapper}>
                        <Link to='/pinned_collections' className={classes.ViewPinned}>view pinned</Link>
                        <Link to='/all_shared_collections' className={classes.ViewAll}>view all</Link>
                    </div>
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
            } else {
                // console.log('4b.case no specs but recently viewed and recently viewed category not in all shared');

                if (allSharedArray.length > 20) {
                    allSharedArray = allSharedArray.slice(0, 20);
                }

                let sharedCollections = allSharedArray.map( (collection, i) => (
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
                
                sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.ViewAllWrapper}>
                        <Link to='/pinned_collections' className={classes.ViewPinned}>view pinned</Link>
                        <Link to='/all_shared_collections' className={classes.ViewAll}>view all</Link>
                    </div>
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
            }

        } else if (spec1 !== 'N/A' && spec2 === '') {
            // console.log('5.case specs1 only');
            bySpec1 = allSharedArray.filter(collection => collection.description === spec1);
            
            if(bySpec1.length > 0) {
                // console.log('5b.case specs1 only and spec1 in all shared ');

                // console.log(bySpec1, 'case5.original byspec1');
                if ( bySpec1.length > 20) {
                    bySpec1 = bySpec1.slice(0, 20);
                }

                // console.log(bySpec1, 'case5.sliced byspec1');
                let sharedCollections = bySpec1.map( (collection, i) => (
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
                
                sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.ViewAllWrapper}>
                        <Link to='/pinned_collections' className={classes.ViewPinned}>view pinned</Link>
                        <Link to='/all_shared_collections' className={classes.ViewAll}>view all</Link>
                    </div>
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
            } else {
                // console.log('5b.case specs1 only and spec1 in not in all shared ');
                sharedCollectionsContent = 
                <div className={classes.AllWrapper}>
                    <div className={classes.PostAddInfo}>
                        <div>{'Sorry! No shared collections for ' + spec1 + ' yet.'}</div>
                    </div>
                </div>
            }

        } else if (spec1 !== 'N/A' && spec2 !== '') {
            // console.log('6.case specs1 and spec2 ');
            bySpec1and2 = allSharedArray.filter(collection => collection.description === spec1 || collection.description === spec2 ); 

            // console.log(bySpec1and2);

            if (bySpec1and2.length > 0) {

                if ( bySpec1and2.length > 20) {
                    bySpec1and2 = bySpec1and2.slice(0, 20);
                }
                // console.log('6a.case specs1 and spec2 and spec1 or spec2 in all shared ');
                let sharedCollections = bySpec1and2.map( (collection, i) => (
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
                
                sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.ViewAllWrapper}>
                        <Link to='/pinned_collections' className={classes.ViewPinned}>view pinned</Link>
                        <Link to='/all_shared_collections' className={classes.ViewAll}>view all</Link>
                    </div>
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
                    
            } else {
                // console.log('6b.case specs1 and spec2 and spec1 or spec2 not in all shared ');
                sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.PostAddInfo}>
                        <div>{'No shared collections for ' + spec1 + ' or ' + spec2 + ' yet.'}</div>
                    </div>
                </div>            
            }

        } else {
            // console.log('7.last case all shared');
            if ( allSharedArray.length > 20) {
                allSharedArray = allSharedArray.slice(0, 20);
            }
            let sharedCollections = allSharedArray.map( (collection, i) => (
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
            
            sharedCollectionsContent =
                <div className={classes.AllWrapper}>
                    <div className={classes.ViewAllWrapper}>
                        <Link to='/pinned_collections' className={classes.ViewPinned}>view pinned</Link>
                        <Link to='/all_shared_collections' className={classes.ViewAll}>view all</Link>
                    </div>
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
            }
        } */     

        let userCollections = <div style={{ 'paddingTop': '2rem'}}><Spinner /></div>;

        if (!this.props.loading) {
            if ( this.props.collections.length === 0) {
                userCollections = 
                 <div className={classes.PostAddInfo}>
                     <div>You have no collections.</div>
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
                lastUpdated={new Date(collection.lastUpdated).toLocaleDateString()}
                description={collection.description}
                collectionClicked={() => this.collectionClickedHandler(collection.title, collection.lastUpdated, collection._id, collection.description, collection.public)}
                />
            ));
            }
        }     

        return (
            // <Grid>
                // <div>
                    // <div className={classes.YourCollection}>SHARED COLLECTIONS</div>
                    // <div className={classes.SharedCollectionOuterWrapper}>{sharedCollectionsContent}</div>    
                // </div>
                // <div>
                    /* <div className={classes.YourCollection}>YOUR COLLECTIONS</div> */
                    <div className={classes.CollectionWrapper}>
                        {userCollections}
                    </div>
                // </div>    
            // </Grid>
        );
    }
};

const mapStateToProps = state => ({
    collections: state.collection.userCollections,
    loading: state.collection.loading,
    userCollectionsFetchErrors: state.collection.userCollectionsFetchErrors,
    // sharedCollections: state.collection.sharedCollections,
    // sharedCollectionsFetchErrors: state.collection.sharedCollectionsFetchErrors,
    // sharedCollectionsLoading: state.collection.sharedCollectionsLoading,
    user: state.auth.user,
    recentlyViewed: state.resource.recentlyViewedResources
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserCollections: (userId) => dispatch( actions.fetchUserCollections(userId)),
        // onFetchSharedCollections: () => dispatch(actions.fetchSharedCollections()),
        onFetchRecentlyViewedResources: (userId) => dispatch(actions.fetchRecentlyViewedResources(userId)),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages()),
        onSetClickedCollectionAttributes: ( attributes ) => dispatch(actions.setClickedCollectionAttributes( attributes ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCollections);