import React, { Component } from 'react';
import classes from './UploadBlogImage.module.css';
import UploadBlogImage from './UploadBlogImage';
import UploadWebBlogImage from './UploadWebBlogImage';
import Dialogue from '../Dialogues/Dialogue/Dialogue';
// import Button from '../UserInterface/Button/Button';
// import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class UploadOption extends Component {

    state = {
        fileActive: true,
        webActive: false
    }

    fileClicked = () => {
        this.setState({ fileActive: true, webActive: false});
    }

    webClicked = () => {
        this.setState({ fileActive: false, webActive: true})
    }

    render() {
        let option; 
    
        const fileClasses = [classes.File];
        const webClasses = [classes.Web];
        
        if (this.state.fileActive) {
            fileClasses.push(classes.Active);
            option = 
            <UploadBlogImage />
        }
    
        if (this.state.webActive) {
            webClasses.push(classes.Active);
            option =
            <UploadWebBlogImage />
        }

        return(
            <Dialogue
            isUploadBlogImage
            closeDialogue={this.props.closeDialogue}
            showDialogue={this.props.showDialogue}
            >
                <div className={classes.DialogueMessage}>
                    {   
                        this.props.uploadBlogImageSuccessInfo || 
                        this.props.uploadBlogImageError  ?
                        null :
                        <ul className={classes.navigation}>
                            <li className={fileClasses.join(' ')} onClick={this.fileClicked}>file</li>
                            <li className={webClasses.join(' ')} onClick={this.webClicked}>web</li>
                        </ul> 
                    }
                    <div>
                        {option}
                    </div>
                    { 
                        this.props.uploadBlogImageSuccessInfo ? 
                        <div className={classes.embedButton} onClick={this.props.embedClicked}> embed in editor </div>
                        : null
                    }
                </div>
            </Dialogue>   
        );
    }
}

const mapStateToProps = state => ({
    uploadBlogImageError: state.blog.uploadBlogImageError,
    uploadBlogImageSuccessInfo: state.blog.uploadBlogImageSuccessInfo,
});

/* const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onEditCollection: (title, description, collectionId) => dispatch( actions.editCollection(title, description, collectionId) ),
        onClearEditCollectionMessages: () => dispatch(actions.clearEditCollectionMessages())
    };
}; */

export default connect(mapStateToProps)(UploadOption);