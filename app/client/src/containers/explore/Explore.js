import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classes from './Explore.module.css';
// import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import VisitorSkillSelect from '../../components/visitorSkillSelect/skillSelect';


class Explore extends Component {

    constructor(props) {
        super(props);
        this.visitorSelectSkillModal = React.createRef();
        this.changeButton = React.createRef();
    }

    state = {
        showVisitorSkillSelect: false
    }

    componentDidMount () {
        window.scroll(0,0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.userSpec !== prevProps.userSpec && this.props.userSpec !== '' && this.state.showVisitorSkillSelect) {
            this.setState({ showVisitorSkillSelect: false });
        }
    }

    showVisitorSkillSelect = () => {
        this.setState({ showVisitorSkillSelect: true }, () => {
          this.visitorSelectSkillModal.current.focus();
        });
    }
    
      closeVisitorSkillSelectOnClick = () => {
        this.setState({ showVisitorSkillSelect: false }, () => {
          this.changeButton.current.focus();
        });
    }
    
      closeVisitorSkillSelectOnKey = (event) => {
        if (event.key === 'Tab' || event.key === 'Enter') {
          this.setState({ showVisitorSkillSelect: false }, () => {
            this.changeButton.current.focus();
          });
        }
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
                                <button
                                    ref={this.changeButton}
                                    onClick={this.showVisitorSkillSelect}
                                >
                                    change?
                                </button>
                            </span>
                        }
                    </h1> 
                </div>    
                { this.state.showVisitorSkillSelect ?
                    <VisitorSkillSelect 
                        closeSkillSelectOnClick={this.closeVisitorSkillSelectOnClick}
                        closeSkillSelectOnKey={this.closeVisitorSkillSelectOnKey}
                        show={this.state.showVisitorSkillSelect}
                        skillSelectModal={this.visitorSelectSkillModal}
                    />
                    :
                    null
                }
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
