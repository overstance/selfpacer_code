import React, { Component } from 'react';
import classes from './Facilitate.module.css';
import Toggler from '../../components/UserInterface/Toggler/Toggler';
import AddResource from '../../components/addResource/addResource';
import GridlessPageWrapper from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper'; 
import { connect } from 'react-redux';
import NonFacilitator from '../../components/NonFacilitator/NonFacilitator';
import * as actions from '../../store/actions/index';
import Conversations from '../../components/conversations/Conversations';

class Facilitator extends Component {

    componentDidMount() {
        this.props.onFetchUser();
        window.scroll(0, 0);
    }

    state = {
        showAddResource: false,
        addResourceToggle: false,
        showReportMisuse: false,
        reportMisuseToggle: false,
    }

    addResourceToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showAddResource: !prevState.showAddResource,
                addResourceToggle: !prevState.addResourceToggle
            };
        });
    }

    reportMisuseToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showReportMisuse: !prevState.showReportMisuse,
                reportMisuseToggle: !prevState.reportMisuseToggle
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
                <div className={classes.Subheader}>
                    <Toggler 
                        toggle={this.state.reportMisuseToggle} 
                        toggleHandler={this.reportMisuseToggleHandler}
                        subheadTitle="report misuse"
                    />
                    { this.state.showReportMisuse ? 
                        <div className={classes.BlockContentItems}>
                            <AddResource />
                        </div>
                    : null }
                </div>
                <Conversations />
            </div>
        </GridlessPageWrapper>;

        let pageContent;

    if (this.props.useTypeContext !== '0') {
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