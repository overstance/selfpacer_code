import React, { Component } from 'react';
import classes from './RichEditor.module.css';
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from './plugins/highlightPlugin';
import basicTextStylePlugin from './plugins/basicTextStylePlugin';
import addLinkPlugin from './plugins/addLinkPlugin';
import { mediaBlockRenderer } from './entities/mediaBlockRenderer'
import {InlineStyles} from './inlineStyles/inlineStyles';
import { styleMap, getBlockStyle, /* BLOCK_TYPES, */ BlockStyleControls } from './blockStyles/blockStyles';
import {stateToHTML} from 'draft-js-export-html';
import BlogImageUploadOption from '../UploadBlogImage/UploadOption';
// import Button from '../UserInterface/Button/Button';
// import Spinner from '../UserInterface/Spinner/Spinner';
// import Input from '../UserInterface/Input/Input';

const highlightPlugin = createHighlightPlugin();

class PageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      showUploadModal: false,
      noteTitle: '',
      description: '',
      blogHeroImage: {
        url: '',
        source: '',
        caption: ''
      },
      uploadingHeroImage: false
    };

    this.plugins = [
        highlightPlugin,
        basicTextStylePlugin,
        addLinkPlugin
    ];
  }

  componentDidMount() {
    let displayedNote = this.props.displayedNote
    if (typeof displayedNote == "object") {
      // let rawContentFromFile = displayedNote
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.displayedNote.content)), this.decorator()),
        noteTitle: displayedNote.title,
        blogHeroImage: displayedNote.featuredImage,
        description: displayedNote.description
      })
    } else {
      this.setState({
        noteTitle: "",
        blogHeroImage: {
          url: '',
          source: '',
          caption: ''
        },
        description: '',
        editorState: EditorState.createEmpty(this.decorator())
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.displayedNote !== this.props.displayedNote) {
      let displayedNote = this.props.displayedNote
      if (typeof displayedNote == "object") {
        // let rawContentFromFile = displayedNote
        let persistedTitle = displayedNote.title;
        let persistedHeroImage = displayedNote.featuredImage;
        let persistedDescription = displayedNote.description;
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.displayedNote.content))),
          noteTitle: persistedTitle,
          blogHeroImage: persistedHeroImage,
          description: persistedDescription
        })
      } else {
        this.setState({
          noteTitle: "",
          blogHeroImage: {
            url: '',
            source: '',
            caption: ''
          },
          description: '',
          editorState: EditorState.createEmpty()
        })

      }
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleInlineStyle = (style) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  decorator = () => new CompositeDecorator([
    {
      strategy: this.linkStrategy,
      component: this.Link,
    },
  ]);

  linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  };


  Link = (props) => {
    const { contentState, entityKey } = props;
    const { url } = contentState.getEntity(entityKey).getData();
    return (
      <a
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        aria-label={url}
        href={url}
        >{props.children}</a>
    );
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
    console.log(this.state.uploadingHeroImage);
    if (this.state.uploadingHeroImage) {
      this.setState({
        blogHeroImage: {
          url: this.props.uploadedBlogImage.meta.secure_url,
          source: this.props.uploadedBlogImage.source,
          caption: this.props.uploadedBlogImage.caption,
        },
        showUploadModal: false,
        uploadingHeroImage: false
      });
    } else {
      const editorState = this.state.editorState;
      // const urlValue = window.prompt('Paste Image Link');
      const urlValue = this.props.uploadedBlogImage.meta.secure_url;
      const sourceValue = this.props.uploadedBlogImage.source;
      const captionValue = this.props.uploadedBlogImage.caption;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {src: urlValue, source: sourceValue, caption: captionValue});
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity}, 'create-entity');
      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
        showUploadModal: false
      }, () => {
        setTimeout(() => this.focus(), 0);
      });
    }
  }

  focus = () => this.refs.editor.focus();

  uploadImageHandler = () => {
    this.setState({ showUploadModal: true});
  }

  uploadHeroImage = () => {
    this.setState({ showUploadModal: true, uploadingHeroImage: true}, () => { console.log(this.state.uploadingHeroImage)});
  }

  uploadModalCloseHandler = () => {
      this.setState({ showUploadModal: false });
  }

  captureTitle = (event) => {
    event.preventDefault()
    let value = event.target.value
    this.setState({
      noteTitle: value
    })
  }

  /* captureblogHeroImage = (event) => {
    event.preventDefault()
    let value = event.target.value
    this.setState({
      blogHeroImage: value
    })
  } */

  captureDescription = (event) => {
    event.preventDefault()
    let value = event.target.value
    this.setState({
      description: value
    })
  }

  submitEditor = () => {
    let displayedNote = this.props.displayedNote;
    let contentState = this.state.editorState.getCurrentContent();
    let options = {
      blockRenderers: {
        atomic: (block) => {
          let data = contentState.getEntity(block.getEntityAt(0)).getData();
          let type = contentState.getEntity(block.getEntityAt(0)).getType();
          // console.log(type);
          if (type === 'image') {
            const src = data.src;
            const source = data.source;
            const caption = data.caption;

            if (!source && !caption) {
              return `<figure><img src="${src}"/></figure>`;
            } else if (source && !caption) {
              return `<figure><img src="${src}"/><figcaption>${source}</figcaption>`;
            } else if (!source && caption) {
              return `<figure><img src="${src}"/><figcaption>${caption}</figcaption></figure>`;
            } else {
              return `<figure><img src="${src}"/><figcaption>${source}</figcaption><figcaption>${caption}</figcaption></figure>`;
            }
          }
        },
      },
    };
    let htmlContent = stateToHTML(contentState, options);
    let note = {
      title: this.state.noteTitle,
      heroImage: this.state.blogHeroImage,
      description: this.state.description, 
      content: convertToRaw(contentState)
    }
    if (this.state.noteTitle === "" || (note.content.blocks.length <= 1 && note.content.blocks[0].depth === 0 && note.content.blocks[0].text === "")) {
      alert("Note cannot be saved if title or content is blank")
    } else {
      note["content"] = JSON.stringify(note.content);
      if ( displayedNote === 'new') {
        this.props.onCreateBlogDraft(note.title, note.heroImage, note.description, note.content, htmlContent, this.props.drafts);
      } else {
        this.props.onUpdateBlogDraft(displayedNote._id, note.title, note.heroImage, note.description, note.content, htmlContent, this.props.drafts);
      }
      /* this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      }, () => displayedNote === "new" ? this.props.onCreateBlogDraft(note.title, note.content, htmlContent, this.props.drafts) : this.props.onUpdateBlogDraft(displayedNote._id, note.title, note.content, htmlContent, this.props.drafts)) */
    }
  }

  render() {
    if (!this.props.displayedNote) {
      return <div>Loading...</div>
    }

    let saveButtonText = 'Save';
    if(this.props.createBlogDraftLoading || this.props.updateBlogDraftLoading) {
        saveButtonText = 'Saving...';
    }

    // let heroImageproperties = this.state.blogHeroImage;
    return (
      <div className={classes.editorContainer}>
        <div className={classes.editorControls}>
          <div className={classes.saveButton}>
            <button onClick={this.submitEditor}> {saveButtonText} </button>
          </div>
          <div className={classes.publishButton}>
            <button> Publish </button>
          </div>
          <div className={classes.deleteButton}>
            <button> Delete </button>
          </div>
        </div>
        <div className={classes.editorHeader}>
          { this.props.displayedNote !== 'new' && this.state.blogHeroImage.url !== '' ?
            <div className={classes.draftInputWrapper}>
              <input 
              type="text" 
              placeholder="Title" 
              name="noteTitle" 
              className={classes.draftInput} 
              value={this.state.noteTitle} 
              onChange={this.captureTitle}
              />
            </div> :
            <div className={classes.draftInputWrapper}>
                <div className={classes.titleFieldWrapper}>
                  <input 
                  type="text" 
                  placeholder="Title" 
                  name="noteTitle" 
                  className={classes.draftTitleInput} 
                  value={this.state.noteTitle} 
                  onChange={this.captureTitle}
                  />
                </div>
                <div className={classes.addFeaturedImageButton}>
                  <button onClick={this.uploadHeroImage}> Hero-Image </button>
                </div>
            </div> 
          }
          { this.state.blogHeroImage.url !== '' ?
            <div /* className={classes.draftInputWrapper} */>
              <img src={this.state.blogHeroImage.url} alt='featured' className={classes.heroImage}/>
            </div>
            : null
          }
          {/* { this.props.displayedNote !== 'new' && this.state.blogHeroImage.url !== '' ? */}
            {/* <div>there's featured image</div> : 
            <div className={classes.draftInputWrapper}>
              <div className={classes.draftInput}>{'Hero Image Url:' + this.state.blogHeroImage.url}</div>
            </div> */}
          {/* } */}
          <div className={classes.draftInputWrapper}>
            <textarea 
            placeholder="Description" 
            name="description" 
            className={classes.draftInput}
            value={this.state.description} 
            onChange={this.captureDescription}
            />
          </div>
        </div>
        <div className={classes.toolbar}>
            <button id="link_url" onClick = {this.isAddingOrUpdatingLink} className={classes.styleButton}>
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
  uploadedBlogImage: state.blog.uploadedBlogImage,
  drafts: state.blog.allDrafts,
  createBlogDraftError: state.blog.createBlogDraftError,
  createBlogDraftLoading: state.blog.createBlogDraftLoading,
  updateBlogDraftError: state.blog.updateBlogDraftError,
  updateBlogDraftLoading: state.blog.updateBlogDraftLoading,
  // blogHeroImageUrl: state.blog.blogHeroImageUrl
});

const mapDispatchToProps = (dispatch) => {
  //   return bindActionCreators(Actions, dispatch);
      return {
          onCreateBlogDraft: ( title, heroImage, description, content, htmlContent, allDrafts ) => dispatch(actions.createBlogDraft( title, heroImage, description, content, htmlContent, allDrafts )),
          onUpdateBlogDraft: ( draftId, title, heroImage, description, content, htmlContent, allDrafts ) => dispatch(actions.updateBlogDraft( draftId, title, heroImage, description, content, htmlContent, allDrafts )), 
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);