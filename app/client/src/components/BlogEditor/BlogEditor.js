import React, { Component } from 'react';
import classes from './BlogEditor.module.css';
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
import TagButton from './tagButton/tagButton';

const highlightPlugin = createHighlightPlugin();

class PageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      showUploadModal: false,
      noteTitle: '',
      description: '',
      slug: '',
      blogHeroImage: {
        url: '',
        publicId: '',
        source: '',
        caption: '',
        id: ''
      },
      category: '',
      tags: [],
      author: '',
      fillError: null,
      tagDuplicateError: null,
      uploadingHeroImage: false
    };

    this.plugins = [
        highlightPlugin,
        basicTextStylePlugin,
        addLinkPlugin
    ];
  }

  componentDidMount() {
    this.props.onFetchBlogCategories();
    this.props.onFetchBlogTags();
    this.props.onFetchAuthors();
    let displayedNote = this.props.displayedNote
    if (typeof displayedNote == "object") {
      // let rawContentFromFile = displayedNote
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.displayedNote.content)), this.decorator()),
        noteTitle: displayedNote.title,
        blogHeroImage: displayedNote.featuredImage,
        description: displayedNote.description,
        slug: displayedNote.slug,
        category: displayedNote.category,
        tags: displayedNote.tags,
        author: displayedNote.author
      })
    } else {
      this.setState({
        noteTitle: "",
        blogHeroImage: {
          url: '',
          publicId: '',
          source: '',
          caption: '',
          id: ''
        },
        description: '',
        slug: '',
        category: '',
        tags: [],
        author: '',
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
        let persistedSlug = displayedNote.slug;
        let persistedCategory = displayedNote.category;
        let persistedTags = displayedNote.tags;
        let persistedAuthor = displayedNote.author;

        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.displayedNote.content))),
          noteTitle: persistedTitle,
          blogHeroImage: persistedHeroImage,
          description: persistedDescription,
          slug: persistedSlug,
          category: persistedCategory,
          tags: persistedTags,
          author: persistedAuthor
        })
      } else {
        this.setState({
          noteTitle: "",
          blogHeroImage: {
            url: '',
            publicId: '',
            source: '',
            caption: '',
            id: ''
          },
          slug: '',
          description: '',
          category: '',
          tags: [],
          author: '',
          editorState: EditorState.createEmpty()
        })

      }
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
      fillError: null
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
    // console.log(this.state.uploadingHeroImage);
    if (this.state.uploadingHeroImage) {
      this.setState({
        blogHeroImage: {
          url: this.props.uploadedBlogImage.meta.secure_url,
          publicId: this.props.uploadedBlogImage.meta.public_id,
          source: this.props.uploadedBlogImage.source,
          caption: this.props.uploadedBlogImage.caption,
          id: this.props.uploadedBlogImage._id
        },
        showUploadModal: false,
        uploadingHeroImage: false
      });
    } else {
      const editorState = this.state.editorState;
      const urlValue = this.props.uploadedBlogImage.meta.secure_url;
      const publicIdValue = this.props.uploadedBlogImage.meta.public_id;
      const sourceValue = this.props.uploadedBlogImage.source;
      const captionValue = this.props.uploadedBlogImage.caption;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {src: urlValue, source: sourceValue, publicId: publicIdValue, caption: captionValue});
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

  embedYoutubeVideo = (e) => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const videoId = window.prompt('Enter Video Id -');

    if(!videoId) {
      return 'handled';
    } else {    
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity('youtube', 'IMMUTABLE', {youtubeVideoId: videoId});
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity}, 'create-entity');
      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
      }, () => {
        setTimeout(() => this.focus(), 0);
      });
    }
  }

  focus = () => this.refs.editor.focus();

  uploadImageHandler = () => {
    this.setState({ showUploadModal: true, uploadingHeroImage: false});
  }

  uploadHeroImage = () => {
    this.setState({ showUploadModal: true, uploadingHeroImage: true});
  }

  uploadModalCloseHandler = () => {
      this.setState({ showUploadModal: false });
  }

  captureTitle = (event) => {
    event.preventDefault()
    let value = event.target.value
    this.setState({
      noteTitle: value,
      fillError: null
    })
  }

  captureDescription = (event) => {
    event.preventDefault()
    let value = event.target.value
    this.setState({
      description: value,
      fillError: null
    })
  }

  captureSlug = (event) => {
    event.preventDefault();
    let value = event.target.value
    this.setState({
      slug: value,
      fillError: null
    })
  }

  captureCategory = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      category: value,
      fillError: null
    })
  }

  captureTags = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let blogTagsArray = this.state.tags;

    let checkSelected = blogTagsArray.find( tag => tag === value);

    if (checkSelected) {
      this.setState({ tagDuplicateError: 'tag already selected'});
    } else if ( value === '' ) {
      this.setState({ tagDuplicateError: 'please select tag'});
    } else {
      blogTagsArray.push(value);
      this.setState({ tags: blogTagsArray, tagDuplicateError: null });
    }
  }

  captureAuthor = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      author: value,
      fillError: null
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
              return `<figure><img src="${src}"/><div>${caption}</div></figure>`;
            } else {
              return `<figure><img src="${src}"/><figcaption>${source}</figcaption><div>${caption}</div></figure>`;
            }
          }

          if (type === 'youtube') {
            const videoId = data.youtubeVideoId;
            return `<div class='youtubeVideoEmbed' id=${videoId}></div>`
          }
        },
      },
    };
    let htmlContent = stateToHTML(contentState, options);
    let note = {
      title: this.state.noteTitle,
      heroImage: this.state.blogHeroImage,
      description: this.state.description, 
      slug: this.state.slug,
      category: this.state.category,
      tags: this.state.tags,
      author: this.state.author,
      content: convertToRaw(contentState)
    }
    if(
        this.state.noteTitle === "" || 
        this.state.description === '' || 
        this.state.slug === '' ||
        this.state.category === '' ||
        this.state.author === '' || 
        (note.content.blocks.length <= 1 && note.content.blocks[0].depth === 0 && note.content.blocks[0].text === "")
      ) {
      this.setState({fillError: 'please fill all asterisked fields and draft body'});
    } else {
      note["content"] = JSON.stringify(note.content);
      let authors = this.props.authors;
      let author = authors.find( author => author._id === note.author);
      let authorName = author.name;

      if ( displayedNote === 'new') {
        this.props.onCreateBlogDraft(note.title, note.heroImage, note.slug, note.category, note.tags, note.author, authorName, note.description, note.content, htmlContent, this.props.user._id, this.props.user.name, this.props.drafts);
        this.setState({
          noteTitle: "",
          blogHeroImage: {
            url: '',
            publicId: '',
            source: '',
            caption: '',
            id: ''
          },
          slug: '',
          description: '',
          category: '',
          tags: [],
          author: '',
          editorState: EditorState.createEmpty()
        })
      } else {
        this.props.onUpdateBlogDraft(displayedNote._id, note.title, note.heroImage, note.slug, note.category, note.tags, note.author, authorName, note.description, note.content, htmlContent, this.props.drafts);
      }
    }
  }

  deleteHeroImage = () => {
    // console.log(this.state.blogHeroImage);
    this.props.onDeleteHeroImage(this.state.blogHeroImage.publicId, this.state.blogHeroImage.id);
    this.setState({
      blogHeroImage: {
        url: '',
        publicId: '',
        source: '',
        caption: '',
        id: ''
      }
    });
  }

  removeTag = (tag) => {
    let blogTagsArray = this.state.tags
    let updatedTags = blogTagsArray.filter( filter => filter !== tag);
    this.setState({ tags: updatedTags}, () => { console.log(this.state.tags)})
  }

  deleteDraft = () => {
    let draftId = this.props.displayedNote._id;
    this.props.onDeleteBlogDraft(draftId, this.props.drafts);

    this.setState({
      noteTitle: "",
      blogHeroImage: {
        url: '',
        publicId: '',
        source: '',
        caption: '',
        id: ''
      },
      slug: '',
      description: '',
      category: '',
      tags: [],
      author: '',
      editorState: EditorState.createEmpty()
    })
  }

  publishDraft = () => {
    let draftId = this.props.displayedNote._id;
    let publishedOn = this.props.displayedNote.publishedOn;
    this.props.onPublishBlogDraft(draftId, publishedOn, this.props.drafts);

    this.setState({
      noteTitle: "",
      blogHeroImage: {
        url: '',
        publicId: '',
        source: '',
        caption: '',
        id: ''
      },
      slug: '',
      description: '',
      category: '',
      tags: [],
      author: '',
      editorState: EditorState.createEmpty()
    })
  }

  render() {
    if (!this.props.displayedNote) {
      return <div>Loading...</div>
    }

    let saveButtonText = 'Save';
    if(this.props.createBlogDraftLoading || this.props.updateBlogDraftLoading) {
        saveButtonText = 'Saving...';
    }

    let deleteButtonText = 'Delete';
    if(this.props.deleteBlogDraftLoading) {
        deleteButtonText = 'Deleting...';
    }

    let publishButtonText = 'Publish';
    if(this.props.publishBlogDraftLoading) {
        publishButtonText = 'Publishing...';
    }

    let blogTagsArray = this.state.tags;
    let blogTags;

    if ( blogTagsArray.length === 0) {
      blogTags = null;
    } else {
      blogTags = blogTagsArray.map( (tag, i) => (
        <TagButton
        tagLabel={tag}
        key={i}
        removeTagClicked={() => this.removeTag(tag)}
        />
      ))
    }

    return (
      <div className={classes.editorContainer}>
        <div className={classes.editorControls}>
          <div className={classes.saveButton}>
            <button onClick={this.submitEditor}> {saveButtonText} </button>
          </div>
          { this.props.user.isEditor && 
            ( this.props.user.accountType === 'Senior Administrator' || 
              this.props.user.accountType === 'Head Administrator'
            ) && this.props.displayedNote !== 'new' ?
            <div className={classes.publishButton}>
              <button onClick={this.publishDraft}> {publishButtonText} </button>
            </div>
            : null
          }
          { this.props.user.isEditor && 
            (this.props.user.accountType === 'Administrator' ||
             this.props.user.accountType === 'Senior Administrator' || 
             this.props.user.accountType === 'Head Administrator'
            ) && this.props.displayedNote !== 'new' ?
            <div className={classes.deleteButton}>
              <button onClick={this.deleteDraft}> {deleteButtonText} </button>
            </div>
            : null
          }
        </div>
        { this.state.fillError ? <div className={classes.fillError}>{this.state.fillError}</div> : null}
        { this.props.createBlogDraftError ? <div className={classes.fillError}>{this.props.createBlogDraftError}</div> : null}
        { this.props.publishBlogDraftError ? <div className={classes.fillError}>{this.props.publishBlogDraftError}</div> : null}
        { this.props.deleteBlogDraftError ? <div className={classes.fillError}>{this.props.deleteBlogDraftError}</div> : null}
        { this.props.updateBlogDraftError ? <div className={classes.fillError}>{this.props.updateBlogDraftError}</div> : null}
        <div className={classes.editorHeader}>
          { this.props.displayedNote !== 'new' ? <label>{'last updated: ' + new Date(this.props.displayedNote.updatedOn).toLocaleDateString()}</label> : null}
          { this.props.displayedNote !== 'new' && this.state.blogHeroImage.url !== '' ?
            <div>
              <label>title*:</label>
              <div className={classes.draftInputWrapper}>
                <input 
                type="text" 
                placeholder="title" 
                name="noteTitle" 
                className={classes.draftInput} 
                value={this.state.noteTitle} 
                onChange={this.captureTitle}
                />
              </div>
            </div> :
            <div>
              <label>title*:</label>
              <div className={classes.draftInputWrapper}>
                  <div className={classes.titleFieldWrapper}> 
                    <input 
                    type="text" 
                    placeholder="title" 
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
            </div>
          }
          { this.state.blogHeroImage.url !== '' ?
            <div className={classes.heroImageWrapper}>
              <label>Featured Image</label>
              <figure>
                <img src={this.state.blogHeroImage.url} alt='featured' className={classes.heroImage}/>
                {this.state.blogHeroImage.source && this.state.blogHeroImage.source !== '' ? 
                  <figcaption>{this.state.blogHeroImage.source}</figcaption> : null
                }
                {this.state.blogHeroImage.caption && this.state.blogHeroImage.caption !== '' ? 
                  <p>{this.state.blogHeroImage.caption}</p> : null
                }
                <div className={classes.deleteHeroImage}>
                  <button onClick={this.deleteHeroImage}>Delete</button>
                </div>  
              </figure>
            </div>
            : null
          }
          <div>
            <label>description*:</label>
            <div className={classes.draftInputWrapper}> 
              <textarea 
              placeholder="description" 
              name="description" 
              className={classes.draftInput}
              value={this.state.description} 
              onChange={this.captureDescription}
              />
            </div>
          </div>
          <div>
            <label>title-slug*:</label>
            <div className={classes.draftInputWrapper}>
              <input 
              placeholder="title-slug" 
              name="slug" 
              className={classes.draftInput}
              value={this.state.slug} 
              onChange={this.captureSlug}
              />
            </div>
          </div>
          <div>
            <label>category*:</label>  
            <div className={classes.draftInputWrapper}>
              <select className={classes.draftInput} value={this.state.category} onChange={this.captureCategory}>
                <option value=''>select category</option>
                {this.props.blogCategoriesArray.map((category, index) => {
                  return <option key={index} value={category}>{category}</option>
                })}
              </select>
            </div>
          </div>
          <div>
            <label>tags:</label>
            <div className={classes.draftTagInputWrapper}>
              { this.state.tagDuplicateError ? <div className={classes.fillError}>{this.state.tagDuplicateError}</div> : null}
              <div className={classes.tagsContainer}>{blogTags}</div>
              <select className={classes.draftTagInput} /* value={this.state.tags} */ onChange={this.captureTags}>
                <option value=''>select tags</option>
                {this.props.blogTagsArray.map((tags, index) => {
                  return <option key={index} value={tags}>{tags}</option>
                })}
              </select>
            </div>
          </div>
          <div>
            <label>author*:</label>
            <div className={classes.draftInputWrapper}>
              <select className={classes.draftInput} value={this.state.author} onChange={this.captureAuthor}>
                <option value=''>select author</option>
                {this.props.authors.map((author, index) => {
                  return <option key={index} value={author._id}>{author._id + ":" + author.name}</option>
                })}
              </select>
            </div>
          </div>
          {this.props.displayedNote !== 'new' ?
            <div className={classes.draftInputWrapper}>
              <div className={classes.draftInput}>
                {'Editor: ' + this.props.displayedNote.editorInChargeName}
              </div>
            </div>
            : null
          }
        </div>
        <div className={classes.toolbar}>
          <InlineStyles 
          addLinkClicked={this.isAddingOrUpdatingLink}
          editorState={this.state.editorState} 
          onToggle={this.toggleInlineStyle}
          />
          <BlockStyleControls
          addImageClicked={this.uploadImageHandler}
          addYoutubeClicked={this.embedYoutubeVideo}
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
          isHeroImage={this.state.uploadingHeroImage}
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
  deleteBlogDraftError: state.blog.deleteBlogDraftError,
  deleteBlogDraftLoading: state.blog.deleteBlogDraftLoading,
  publishBlogDraftError: state.blog.publishBlogDraftError,
  publishBlogDraftLoading: state.blog.publishBlogDraftLoading,
  blogCategoriesArray: state.blog.blogCategoriesArray,
  blogTagsArray: state.blog.blogTagsArray,
  authors: state.blog.authors,
  user: state.auth.user
  // blogHeroImageUrl: state.blog.blogHeroImageUrl
});

const mapDispatchToProps = (dispatch) => {
  //   return bindActionCreators(Actions, dispatch);
      return {
          onFetchBlogCategories: () => dispatch(actions.fetchBlogCategories()),
          onFetchBlogTags: () => dispatch(actions.fetchBlogTags()),
          onFetchAuthors: () => dispatch(actions.fetchAuthors()),
          onCreateBlogDraft: ( title, heroImage, slug, category, tags, author, authorName, description, content, htmlContent, editorInChargeId, editorInChargeName, allDrafts ) => dispatch(actions.createBlogDraft( title, heroImage, slug, category, tags, author, authorName, description, content, htmlContent, editorInChargeId, editorInChargeName, allDrafts )),
          onUpdateBlogDraft: ( draftId, title, heroImage, slug, category, tags, author, authorName, description, content, htmlContent, allDrafts ) => dispatch(actions.updateBlogDraft( draftId, title, heroImage, slug, category, tags, author, authorName, description, content, htmlContent, allDrafts )), 
          onDeleteHeroImage: (imagePublicId, imageId) => dispatch(actions.deleteHeroImage(imagePublicId, imageId)),
          onDeleteBlogDraft: (draftId, drafts) => dispatch(actions.deleteBlogDraft(draftId, drafts)),
          onPublishBlogDraft: (draftId, publishedOn, drafts) => dispatch(actions.publishBlogDraft(draftId, publishedOn, drafts))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);