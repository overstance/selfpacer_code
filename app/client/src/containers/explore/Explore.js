import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classes from './Explore.module.css';
// import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


class Explore extends Component {

    componentDidMount () {
        window.scroll(0,0);
    }
    
    state = {
        
    }

    render() {

        return (
            <section className={classes.sectionWrapper}>
                <div className={classes.userSpec}>
                    <h1>
                        <span className={classes.descriptor}>
                            area of interest: 
                        </span>
                        {this.props.isAuthenticated ?
                            <span className={classes.description}>
                                {this.props.userSpec}
                                <Link to="/profile">change?</Link>
                            </span>
                            :
                            <span className={classes.description}>
                                {this.props.userSpec}
                                <button>change</button>
                            </span>
                        }
                    </h1> 
                </div>
            </section>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        inspireTexts: state.admin1.inspireTexts,
        userSpec: state.auth.userSpecialization
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Explore );
