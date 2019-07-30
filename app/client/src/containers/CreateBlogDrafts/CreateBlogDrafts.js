import React, { Component } from 'react';
import RichEditor from '../../components/RichEditor/RichEditor';
import DraftLists from '../../components/blogDraftLists/ListsContainer';
import { connect } from 'react-redux';
import classes from './CreateBlogDrafts.module.css';
// import * as actions from '../../store/actions/index';

class CreateBlogDrafts extends Component {
    constructor(props) {
		super(props)

		this.state = {
			displayedNote: "new",
		}
    }
    /* state = {
        displayedNote: "new"
    } */

	componentDidMount() {
		this.setState({
			displayedNote: "new"
		})
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevProps.drafts.length !== this.props.drafts.length) {
			this.setState({
				displayedNote: "new"
			})
		}
	}

	selectDraft = (event) => {

		let target_id = event.target.id
		let selected = ""
		if (target_id !== "new") {
			selected =  this.props.drafts.find(draft => draft._id === target_id);
		} else {
			selected = "new"
		}
		this.setState({
			displayedNote: selected
		})

	}

  render() {
    return (
      <div>
        <div className={classes.headline}>
          <h1>Draft.js Demo</h1>
        </div>

        <div className={classes.pageComponents}>
            <DraftLists selectDraft={this.selectDraft}/>
            <RichEditor displayedNote={this.state.displayedNote}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        drafts: state.blog.allDrafts,
		// displayedNote: state.drafts.displayedNote
    }
}

/* const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Actions, dispatch);
    return {
        onLoadAllBlogDrafts: () => dispatch(actions.loadAllBlogDrafts()) 
    }
} */

export default connect(mapStateToProps, /* mapDispatchToProps */)(CreateBlogDrafts)