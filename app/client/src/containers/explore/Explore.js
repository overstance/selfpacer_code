import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classes from './Explore.module.css';
import * as actions from '../../store/actions/index';
// import Grid from './grid/grid';
import TopSection from './sections/TopSection';
import MiddleSection from './sections/MiddleSection';
import BottomSection from './sections/BottomSection';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import Container from '../../components/UserInterface/Container/Container';
import VisitorSkillSelect from '../../components/visitorSkillSelect/skillSelect';

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

class Explore extends Component {

    visitorSelectSkillModal = React.createRef();
    changeButton = React.createRef();

    state = {
        showVisitorSkillSelect: false,
        currentUserSpec: null
    }

    componentDidMount () {
        if (this.props.userSpec === '' || !this.props.userSpec) {
            this.showVisitorSkillSelect();
        } else {
            this.setState({ currentUserSpec: this.props.userSpec });
        }
        window.scroll(0,0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.userSpec !== prevProps.userSpec && this.props.userSpec !== '' && this.state.showVisitorSkillSelect) {
            this.setState({ showVisitorSkillSelect: false, currentUserSpec: this.props.userSpec });
        }
    }

    componentWillUnmount() {
        this.props.onResetExploreState()
    }

    showVisitorSkillSelect = () => {
        this.setState({ showVisitorSkillSelect: true }, () => {
          this.visitorSelectSkillModal.current.focus();
        });
    }
    
    closeVisitorSkillSelectOnClick = () => {

        if (this.props.userSpec === '' || !this.props.userSpec) {
            this.chooseSkillRandomlyOnNoSkillSelect();
        }

        this.setState({ showVisitorSkillSelect: false }, () => {
            this.changeButton.current.focus();
        });
    }
    
    closeVisitorSkillSelectOnKey = (event) => {
        if (event.key === 'Tab' || event.key === 'Enter') {
        
            if (this.props.userSpec === '' || !this.props.userSpec) {
                this.chooseSkillRandomlyOnNoSkillSelect();
            }

            this.setState({ showVisitorSkillSelect: false }, () => {
                this.changeButton.current.focus();
            });
        }
    }

    chooseSkillRandomlyOnNoSkillSelect = () => {
        const skills = this.props.subjects.map( subject => subject.title );

        let skillsShuffled = shuffleArray(skills);
        let skillSelect = skillsShuffled[0];

        this.setState({ currentUserSpec: skillSelect });
    }

    render() {

        return (
            <Container>
                <section className={classes.sectionWrapper}>
                    <div className={classes.userSpec}>
                        <h1>
                            <span className={classes.descriptor}>
                                area of interest: 
                            </span>
                            {this.props.isAuthenticated ?
                                <span className={classes.description}>
                                    {this.state.currentUserSpec}
                                    <Link to="/profile">change?</Link>
                                </span>
                                :
                                <span className={classes.description}>
                                    {this.state.currentUserSpec}
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
                    <TopSection />
                    <MiddleSection />
                    <BottomSection />
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
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} />
            </Container>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        inspireTexts: state.admin1.inspireTexts,
        userSpec: state.auth.userSpecialization,
        subjects: state.explore.subjects,
    };
};

const mapDispatchToProps = dispatch => {
    return {  
        onResetExploreState: () => dispatch(actions.resetExploreState())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Explore );
