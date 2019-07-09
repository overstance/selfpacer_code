import React, { Component } from 'react';
import classes from './Facilitate.css';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import AddResource from '../../components/addResource/addResource';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 
import { connect } from 'react-redux';
import NonFacilitator from '../../components/NonFacilitator/NonFacilitator';

class Facilitator extends Component {

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

        if (this.props.useTypeContext === '3' || this.props.useTypeContext === '2' || this.props.useTypeContext === '1') {
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
    };
};

export default connect(mapStateToProps)(Facilitator);