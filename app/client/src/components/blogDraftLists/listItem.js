import React from 'react';
import classes from './blogDraftLists.module.css';
/* import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions' */

const listItem = (props) => (
    <div className={classes.listItem} id={props.id} onClick={props.selectDraft}>
        {props.title}
    </div>
);

/* class NoteListItem extends React.Component {
  render() {
    return(
      <div id={this.props.note.id} key={this.props.note.id} className="note-list-item" onClick={this.props.selectNote}>
        {this.props.note.title}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
} */

export default listItem;