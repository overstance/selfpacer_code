import React, { Component } from 'react';
import RichEditor from '../../components/BlogEditor/BlogEditor';
import DraftLists from '../../components/blogDraftLists/ListsContainer';
import { connect } from 'react-redux';
import classes from './ManageBlogDrafts.module.css';
import Container from '../../components/UserInterface/Container/Container';
// import * as actions from '../../store/actions/index';

class ManageBlogDrafts extends Component {
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
		if ( this.props.useTypeContext === '0' ||
			 this.props.useTypeContext === '1'||
			 this.props.useTypeContext === '3.1'||
			 this.props.useTypeContext === '3.2') {
			this.props.history.push('/');
		}

		window.addEventListener('scroll', this.handleScroll, false);
		window.scroll(0, 0);
			
		this.setState({
			displayedNote: "new"
		})
	}

	componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

	/* componentDidUpdate(prevProps, prevState) {

		if (prevProps.drafts.length !== this.props.drafts.length) {
			this.setState({
				displayedNote: "new"
			})
		}
	} */

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
      <Container>
        <div className={classes.headline}>
          <h1>Blog Drafts</h1>
        </div>
        <div className={classes.pageComponents}>
            <DraftLists selectDraft={this.selectDraft}/>
            <RichEditor displayedNote={this.state.displayedNote}/>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
    return {
		drafts: state.blog.allDrafts,
		useTypeContext: state.auth.useTypeContext,
		// displayedNote: state.drafts.displayedNote
    }
}

/* const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Actions, dispatch);
    return {
        onLoadAllBlogDrafts: () => dispatch(actions.loadAllBlogDrafts()) 
    }
} */

export default connect(mapStateToProps, /* mapDispatchToProps */)(ManageBlogDrafts)