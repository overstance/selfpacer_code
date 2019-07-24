import React, { Component } from 'react';
import classes from './RichEditor.module.css';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import { connect } from 'react-redux';
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from './plugins/highlightPlugin';
import basicTextStylePlugin from './plugins/basicTextStylePlugin';
import addLinkPlugin from './plugins/addLinkPlugin';
import { mediaBlockRenderer } from './entities/mediaBlockRenderer'
import {InlineStyles} from './inlineStyles/inlineStyles';
import { styleMap, getBlockStyle, /* BLOCK_TYPES, */ BlockStyleControls } from './blockStyles/blockStyles';

import BlogImageUploadOption from '../UploadBlogImage/UploadOption';

const highlightPlugin = createHighlightPlugin();

class PageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      showUploadModal: false,
    };

    this.plugins = [
        highlightPlugin,
        basicTextStylePlugin,
        addLinkPlugin
    ];
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  toggleInlineStyle = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  isAddingOrUpdatingLink = () => {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    let url = '';
    if (linkKey != null) {
      const linkInstance = contentState.getEntity(linkKey);
      url = linkInstance.getData().url;
      const updatedLink = window.prompt('Update link-', url)
      // const selection = editorState.getSelection();

      if (updatedLink == null) {
        return;
      } else if (url !== updatedLink)  {
        const contentWithEntity = contentState.replaceEntityData(linkKey, { url: updatedLink });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity')
        this.onChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), linkKey))
      }
    } else {
      this.onAddLink()
    }
  }

  onAddLink = () => {
    // const command = "add-link"
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -')
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();

    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');

    const entityKey = contentWithEntity.getLastCreatedEntityKey();

    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }

  onAddImage = (e) => {
    e.preventDefault();
    const editorState = this.state.editorState;
    // const urlValue = window.prompt('Paste Image Link');
    const urlValue = this.props.uploadedBlogImage.meta.secure_url;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {src: urlValue});
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity}, 'create-entity');
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
      showUploadModal: false
    }, () => {
      setTimeout(() => this.focus(), 0);
    });
  }

  focus = () => this.refs.editor.focus();

  uploadImageHandler = () => {
    this.setState({ showUploadModal: true});
  }

  uploadModalCloseHandler = () => {
      this.setState({ showUploadModal: false });
  }


  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <div className={classes.editorContainer}>
        <div className={classes.toolbar}>
            <button id="link_url" onClick = {this.isAddingOrUpdatingLink} className={classes.styleButton}>
              {/* <i className="material-icons">attach_file</i> */}
              Li
            </button>
            <button /* onClick={this.onAddImage} */ onClick={this.uploadImageHandler} className={classes.styleButton}>
              {/* <i className="material-icons">photo</i> */}
              Im
          </button>
            <InlineStyles 
            editorState={this.state.editorState} 
            onToggle={this.toggleInlineStyle}
            />
            <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
            />
        </div>  
        <div className={classes.editors}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={this.plugins}
            blockStyleFn={getBlockStyle}
            blockRendererFn={mediaBlockRenderer}
            customStyleMap={styleMap}
            ref="editor"
          />
        </div>
        {this.state.showUploadModal ? 
          <BlogImageUploadOption
          embedClicked={this.onAddImage} 
          showDialogue={this.state.showUploadModal}
          closeDialogue={this.uploadModalCloseHandler}
          closeModal={this.uploadModalCloseHandler}
          />: null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  uploadedBlogImage: state.blog.uploadedBlogImage
});

export default connect(mapStateToProps/* , mapDispatchToProps */)(PageContainer);