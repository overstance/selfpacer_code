import React, { Component } from 'react';
// import classes from './Collections.css';
import CollectionsNav from './CollectionsNav/CollectionsNav';
import Grid from '../../components/UserInterface/Grid/Grid';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import UserCollections from '../../components/UserCollections/UserCollections';
import SharedCollections from '../../components/SharedCollections/SharedCollections';
import PinnedCollections from '../../components/PinnedCollections/PinnedCollections';

class Collections extends Component {

    componentDidMount () {

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
    }

    state = {
        /* showFilter: false,
        toggle: false, */
        pageTitle: 'Collections',
        mineActive: true,
        sharedActive: false,
        pinnedActive: false,
        featuredActive: false,
    }

    mineHandler = () => {
        this.setState({ 
            mineActive: true,
            sharedActive: false,
            pinnedActive: false,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('mine');
    }

    featuredhandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: false,
            pinnedActive: false,
            featuredActive: true,

        });

        this.props.onSetSelectedMenu('featured');
    }

    sharedHandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: true,
            pinnedActive: false,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('shared'); 
    }

    pinnedHandler = () => {

        this.setState({ 
            mineActive: false,
            sharedActive: false,
            pinnedActive: true,
            featuredActive: false,

        });

        this.props.onSetSelectedMenu('pinned');
    }

    render() {

        let pageContent = <UserCollections />

        if (this.props.activeMenu === 'featured') {
            pageContent = <div>featured</div>
        }

        if (this.props.activeMenu === 'shared') {
            pageContent = <SharedCollections />
        }

        if (this.props.activeMenu === 'pinned') {
            pageContent = <PinnedCollections />
        }

        return (
            <Grid>
                <div>
                    <CollectionsNav
                        // show={this.state.showFilter}
                        createRoute='/create_new_collection'
                        mineActived={this.state.mineActive}
                        featuredActived={this.state.featuredActive}
                        sharedActived={this.state.sharedActive}
                        pinnedActived={this.state.pinnedActive}
                        mineClicked={this.mineHandler}
                        featuredClicked={this.featuredhandler}
                        sharedClicked={this.sharedHandler}
                        pinnedClicked={this.pinnedHandler}
                    />
                </div>
                {pageContent}    
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