import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as Actions from '../../actions';
import * as actions from '../../store/actions/index';
import ListItem from './listItem';
import classes from './blogDraftLists.module.css';

class DraftListContainer extends Component {

    componentDidMount() {
        this.props.onLoadAllBlogDrafts()
    }

    listAllDrafts = () => {
        return this.props.drafts.sort((a,b) => new Date(b.updatedOn) - new Date(a.updatedOn)).map((draft, i) => {
        return <ListItem selectDraft={this.props.selectDraft} id={draft._id} key={i} draft={draft} title={draft.title}/>
        })
    }

    render() {
        if (this.props.drafts.length > 0) {
            return(
                <div className={classes.draftListContainer}>
                    <div className={classes.listsHeader}>
                        <div>
                            <span>All Drafts</span>
                            <span className={classes.addNewButton} onClick={this.props.selectDraft} id="new"/>
                        </div>    
                    </div>

                    <div className={classes.draftList}>
                        {this.listAllDrafts()}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.draftListContainer}>
                    <div className={classes.listsHeader}>
                        <div>No drafts Saved Yet</div>    
                    </div>
                </div>    
            )
        }}
    }


const mapStateToProps = state => {
    return {
        drafts: state.blog.allDrafts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAllBlogDrafts: () => dispatch(actions.loadAllBlogDrafts()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftListContainer)