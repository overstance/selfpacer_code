import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UserInterface/Spinner/Spinner';
import classes from './UserCollection.css';
import Grid from '../../../components/UserInterface/Grid/Grid';
// import Button from '../../../components/UserInterface/Button/Button';

class Resourcepage extends Component {

    componentDidMount() {
        if (this.props.match.params.id) {
          this.props.onFetchCollectionById(this.props.match.params.id);
        }
    }

    /* componentWillUnmount() {
        this.props.onClearMessages();
    } */
    
      /* componentWillReceiveProps(nextProps) {
        if (nextProps.collectedResources === null && this.props.resource.loading) {
          this.props.history.push('/not-found');
        }
      } */

    render() {

        let content = 
            <div className={classes.Container}>
                <div className={classes.Spinner}><Spinner /></div>
            </div>

        return (
            <Grid>
               {content}
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.collection.loading,
        collectedResources: state.collection.collectedResources,
        fetchcollectedResourceError: state.collection.fetchcollectedResourceError,
        clickedCollectionAttributes: state.collection.clickedCollectionAttributes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCollectionById: ( id ) => dispatch( actions.fetchCollectionById( id ) ),
        onClearMessages: () => dispatch( actions.clearAddToCollectionMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resourcepage);