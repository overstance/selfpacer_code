import React, { Component } from 'react';
import classes from './Profile.css';
import Container from '../../components/UserInterface/Container/Container';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
/* import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button'; */
import Admin1 from '../admin1page/Admin1';

class Profile extends Component {

    componentDidMount() {
        this.props.onFetchUser();
    }

    state = {
        showAdmin1: false,
        showAdmin: false,
        showAssets: false,
        showCollections: false,
        showProfile: true
    };

    admin1Handler = () => {
        this.setState({
            showAdmin1: true,
            showAdmin: false,
            showAssets: false,
            showCollections: false,
            showProfile: false        
        })
    };

    profileHandler = () => {
        this.setState({
            showAdmin1: false,
            showAdmin: false,
            showAssets: false,
            showCollections: false,
            showProfile: true        
        })
    };

    render() {

        let content = null;
        
        if (this.state.showAdmin1) {
            content = <Admin1 /> 
        }

        if (this.state.showProfile) {
            content = 
            <div>
                User Profile
            </div>
        }



        return (
        <Container>
            <div>
                <div className={classes.TopBoard}>
                    <div>DASHBOARD</div>
                </div>
                <div className={classes.Main}>
                    <div>
                    <div className={classes.Menu}>
                        <div className={classes.MenuItem} onClick={this.profileHandler}>PROFILE</div>
                        { this.props.user === "5be0649f2e483510a87bbef9" || this.props.user === "5be62e05f8931400135450c3" ? <div className={classes.MenuItem} onClick={this.admin1Handler}>ADMIN1</div> : null}
                        { this.props.isAdmin === true ? <div className={classes.MenuItem} onClick={this.adminHandler}>ADMIN2</div> : null}
                        <div className={classes.MenuItem}>COLLECTIONS</div>
                        <div className={classes.MenuItem}>ASSETS</div>
                    </div>
                    </div>
                    <div className={classes.Content}>{content}</div>
                </div>
            </div>
        </Container>                      
        )
    }
};

const mapStateToProps = state => ({
    user: state.auth.user._id,
    isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);