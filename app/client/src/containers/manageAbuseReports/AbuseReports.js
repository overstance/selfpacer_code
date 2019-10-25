import React, { Component } from 'react';
import classes from './abuseReport.module.css';
import {connect} from 'react-redux';
import ReportItem from './ReportItem';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import ScrollButton from '../../components/UserInterface/ScrollToTop/ScrollButton';
import GridlessPageHeader from '../../components/UserInterface/GridlessPageWrapper/GridlessPageWrapper';


class AbuseReports extends Component {

    /* state = {
        abuseReport: {
            value: '',
            label: "enter new inspire text", 
            name: "abuseReport",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        fillError: null
    } */

    componentDidMount() {
        if ( this.props.useTypeContext === '4' ||
             this.props.useTypeContext === '5') {
            window.scroll(0, 0);
            this.props.onFetchAbuseReports();
        } else {
            this.props.history.push('/');       
        }       
    }

    componentWillUnmount() {
        this.props.onClearReportAbuseMessage();
    }

    deleteAbuseReportHandler = (reportId) => {
        this.props.onDeleteAbuseReport(reportId, this.props.abuseReports);
    }

    render () {
       
        let abuseReports = <Spinner isComponent/>;

        if (!this.props.fetchAbuseReportsLoading) {

            if (this.props.abuseReports.length === 0) {
                abuseReports = 
                <PostActionInfo isSuccess>
                    {'No abuse reported.'}
                </PostActionInfo>
            } else {
                
                abuseReports = this.props.abuseReports.map( (abuseReport, i) => (
                <ReportItem
                key={i}
                id={abuseReport._id} 
                abuseReport={abuseReport.report}
                abuseReporter={abuseReport.reporter}
                reportDate={abuseReport.reportDate}
                deleteReport={() => this.deleteAbuseReportHandler(abuseReport._id)}
                />
                ));
            }
        } else if (this.props.fetchAbuseReportsError) {

            abuseReports =
            <PostActionInfo>
                {this.props.fetchAbuseReportsError}
            </PostActionInfo>
        }

        return (
            <GridlessPageHeader pageTitle="manage abuse reports">
                <div className={classes.abuseReportsWrapper}>
                    <div className={classes.abuseReports}>
                        {abuseReports}
                    </div>
                </div>
                <ScrollButton scrollStepInPx="100" delayInMs="16.66" showUnder={160} />
            </GridlessPageHeader>            
        )
    }
}

const mapStateToProps = state => ({
    fetchAbuseReportsError: state.admin1.fetchAbuseReportsError,
    fetchAbuseReportsLoading: state.admin1.fetchAbuseReportsLoading,
    abuseReports: state.admin1.abuseReports,
    useTypeContext: state.auth.useTypeContext
});

const mapDispatchToProps = dispatch => {
    return {
        onClearReportAbuseMessage: () => dispatch(actions.clearReportAbuseMessage()),
        onFetchAbuseReports: () => dispatch(actions.fetchAbuseReports()),
        onDeleteAbuseReport: (reportId, abuseReports) => dispatch(actions.deleteAbuseReport(reportId, abuseReports))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AbuseReports);