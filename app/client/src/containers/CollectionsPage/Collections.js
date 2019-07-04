import React, { Component } from 'react';
import classes from './Collections.css';
import CollectionsNav from './CollectionsNav/CollectionsNav';
import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import UserCollections from '../../components/UserCollections/UserCollections';
import SharedCollections from '../../components/SharedCollections/SharedCollections';
import PinnedCollections from '../../components/PinnedCollections/PinnedCollections';
import FeaturedCollections from '../../components/FeaturedCollections/FeaturedCollections';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import CreateCollection from '../../components/createCollection/createCollection';
import SharedCollectionsBySubject from '../../components/SharedCollectionsBySubject/SharedCollectionsBySubject';

class Collections extends Component {

    componentDidMount () {

        if (!this.props.user._id || this.props.user.specialization === 'N/A') {
            this.setState ({ isUnspecified: true, mineActive: false});
        }

        if (this.props.activeMenu === 'featured') {
            this.setState({ 
                mineActive: false,
                sharedActive: false,
                pinnedActive: false,
                createActive: false,
                featuredActive: true,
                
            });
        }

        if (this.props.activeMenu === 'shared') {
            this.setState({ 
                mineActive: false,
                sharedActive: true,
                pinnedActive: false,
                createActive: false,
                featuredActive: false,
    
            });
        }

        if (this.props.activeMenu === 'pinned') {
            this.setState({ 
                mineActive: false,
                sharedActive: false,
                pinnedActive: true,
                createActive: false,
                featuredActive: false,
    
            });
        }

        if (this.props.activeMenu === 'create') {
            this.setState({ 
                mineActive: false,
                sharedActive: false,
                pinnedActive: false,
                createActive: true,
                featuredActive: false,
    
            });
        }
    }

    state = {
        /* showFilter: false,
        toggle: false, */
        pageTitle: 'Collections',
        isUnspecified: false,
        mineActive: true,
        sharedActive: false,
        pinnedActive: false,
        createActive: false,
        featuredActive: false,
    }

    mineHandler = () => {
        this.setState({ 
            mineActive: true,
            sharedActive: false,
            pinnedActive: false,
            createActive: false,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('mine');
    }

    featuredhandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: false,
            pinnedActive: false,
            createActive: false,
            featuredActive: true,

        });

        this.props.onSetSelectedMenu('featured');
    }

    sharedHandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: true,
            pinnedActive: false,
            createActive: false,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('shared'); 
    }

    pinnedHandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: false,
            pinnedActive: true,
            createActive: false,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('pinned');
    }

    createHandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: false,
            pinnedActive: false,
            createActive: true,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('create');
    }

    render() {

        let userPageContent = <UserCollections />

        if (this.props.activeMenu === 'featured') {
            userPageContent = <FeaturedCollections />
        }

        if (this.props.activeMenu === 'shared') {
            userPageContent = <SharedCollections />
        }

        if (this.props.activeMenu === 'pinned') {
            userPageContent = <PinnedCollections />
        }

        if (this.props.activeMenu === 'create') {
            userPageContent = <CreateCollection />
        }

        return (
            <Grid>
                <div>
                    { this.state.isUnspecified ?
                        <div className={classes.CollectionsContainer}>
                            <SharedCollectionsBySubject />
                        </div>
                        : 
                        <div>                        
                            <div>
                                <CollectionsNav
                                    // show={this.state.showFilter}
                                    // createActive='/create_collection'
                                    createActived={this.state.createActive}
                                    mineActived={this.state.mineActive}
                                    featuredActived={this.state.featuredActive}
                                    sharedActived={this.state.sharedActive}
                                    pinnedActived={this.state.pinnedActive}
                                    mineClicked={this.mineHandler}
                                    createClicked={this.createHandler}
                                    featuredClicked={this.featuredhandler}
                                    sharedClicked={this.sharedHandler}
                                    pinnedClicked={this.pinnedHandler}
                                />
                            </div>
                            <div className={classes.CollectionsContainer}>
                                {userPageContent}
                            </div>
                        </div>
                    }
                </div>
                <ScrollButton scrollStepInPx="50" delayInMs="16.66" showUnder={160} />    
            </Grid>
        );
    }
};

const mapStateToProps = state => ({
    user: state.auth.user,
    activeMenu: state.collection.activeMenu
});

const mapDispatchToProps = dispatch => {
    return {
        onSetSelectedMenu: ( menu ) => dispatch( actions.setSelectedMenu( menu )),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);