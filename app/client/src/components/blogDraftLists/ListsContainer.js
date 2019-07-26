import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as Actions from '../../actions';
import * as actions from '../../store/actions/index';
import ListItem from './listItem';
import classes from './blogDraftLists.module.css';

class DraftListContainer extends Component {

    componentDidMount() {
        this.props.onLoadAllBlogDrafts()
    }

    /* componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
        this.props.onLoadAllBlogDrafts()
        }

    } */

    listAllDrafts = () => {
        return this.props.drafts.sort((a,b) => parseInt(a.id) - parseInt(b.id)).map((draft, i) => {
        //   if (draft.id !== 2 && draft.id !=="1" && draft.id !=="6" && draft.id !=="4" && draft.id !== "5" && draft.id !== "3")
        return <ListItem selectDraft={this.props.selectDraft} id={draft._id} key={i} draft={draft} title={draft.title}/>
        })
    }

    render() {
        if (this.props.drafts.length > 0) {
            return(
                <div className={classes.draftListContainer}>
                    <span className={classes.listsHeader}>
                        All Drafts <button onClick={this.props.selectDraft} id="new"> + </button>
                    </span>

                    <div className={classes.draftList}>
                        {/* <ListItem selectdraft={this.props.selectdraft} id="2" draft={this.props.drafts.find((n) => n.id === "2")}/>
                        <ListItem selectdraft={this.props.selectdraft} id="2" draft={this.props.drafts.find((n) => n.id === "1")}/>
                        <ListItem selectdraft={this.props.selectdraft} id="2" draft={this.props.drafts.find((n) => n.id === "6")}/>
                        <ListItem selectdraft={this.props.selectdraft} id="2" draft={this.props.drafts.find((n) => n.id === "4")}/>
                        <ListItem selectdraft={this.props.selectdraft} id="2" draft={this.props.drafts.find((n) => n.id === "5")}/>
                        <ListItem selectdraft={this.props.selectdraft} id="2" draft={this.props.drafts.find((n) => n.id === "3")}/> */}
                        {this.listAllDrafts()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>No drafts Saved Yet</div>
            )
        }}
    }


const mapStateToProps = state => {
    return {
        drafts: state.blog.allDrafts
    }
}

const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Actions, dispatch);
    return {
        onLoadAllBlogDrafts: () => dispatch(actions.loadAllBlogDrafts()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftListContainer)