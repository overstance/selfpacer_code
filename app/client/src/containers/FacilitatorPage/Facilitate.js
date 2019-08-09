import React, { Component } from 'react';
import classes from './Facilitate.module.css';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import AddResource from '../../components/addResource/addResource';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 
import { connect } from 'react-redux';
import NonFacilitator from '../../components/NonFacilitator/NonFacilitator';
import * as actions from '../../store/actions/index';

class Facilitator extends Component {

    componentDidMount() {
        this.props.onFetchUser();
    }

    state = {
        showAddResource: false,
        addResourceToggle: false,
    }

    addResourceToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showAddResource: !prevState.showAddResource,
                addResourceToggle: !prevState.addResourceToggle
            };
        });
    }

    render() {
        let nonfacilitatorPage = 
        <NonFacilitator />

        let facilitatorTools = 
        <GridlessPageWrapper pageTitle='Facilitate'>
            <div className={classes.Wrapper} >
                <div className={classes.Subheader}>
                    <Toggler 
                        subheadTitle="manage assets"
                        isLink
                        link='/manage_assets'
                    />
                </div>
                { this.props.user.accountType === 'Editor' && this.props.user.isEditor ?
                    <div className={classes.Subheader}>
                        <Toggler 
                            subheadTitle="manage blog drafts"
                            isLink
                            link='/blog_drafts'
                        />
                    </div>
                    : null
                }
                <div className={classes.Subheader}>
                    <Toggler 
                        toggle={this.state.addResourceToggle} 
                        toggleHandler={this.addResourceToggleHandler}
                        subheadTitle="add resource"
                    />
                    { this.state.showAddResource ? 
                        <div className={classes.BlockContentItems}>
                            <AddResource />
                        </div>
                    : null }
                </div>
            </div>
        </GridlessPageWrapper>;

        let pageContent;

        if (this.props.useTypeContext === '5' || this.props.useTypeContext === '4' || this.props.useTypeContext === '3' || this.props.useTypeContext === '2' || this.props.useTypeContext === '1') {
            pageContent = facilitatorTools;
        } else {
            pageContent = nonfacilitatorPage
        }
        
        return(pageContent);
    }
}

const mapStateToProps = state => {
    return {
        useTypeContext: state.auth.useTypeContext,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facilitator);