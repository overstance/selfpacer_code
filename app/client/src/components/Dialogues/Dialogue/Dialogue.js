/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classes from './Dialogue.module.css';
import Modal from '../../UserInterface/Modal/Modal';
import { Link } from 'react-router-dom';

const dialogue = (props) => (
    <Modal show={props.showDialogue} closeModal={props.closeDialogue}>
        { props.isFeature ? 
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                    <h5>Feature Collection</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>
             </div> : null
        }
        { props.isDeleteAccount ? 
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                    <h5>Delete Account</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>
             </div> : null
        }
        { props.isUnfeature ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Unfeature Collection</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>       
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                             
            </div> : null
        }
        {   props.isAuthenticate ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Authentication Required</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    <div className={classes.DialogueMessage}>
                        <div>Please </div>
                        <div><Link to='/login'>log-in</Link> or <Link to='/register'>sign-up</Link></div>
                        <div>to collect Resource.</div>
                    </div> 
                </div>                                     
            </div> : null
        }
        {   props.isCollectionEmpty ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Collection Empty</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    <div className={classes.DialogueMessage}>
                        <div>
                            Can't share empty collection. Please Add resources to this collection to publish it.
                        </div>
                    </div>
                </div>                                      
            </div> : null
        }
        {   props.isDeleteAsset ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Delete Asset</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                    
            </div> : null
        }
        {   props.isDeleteCollection ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Confirm Delete</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    <div className={classes.DialogueMessage}>
                        <div>Delete:</div>
                        <h4>{props.collectionTitle}</h4>
                        <div>
                            <span onClick={props.cancelDelete} className={classes.Confirm}>cancel</span>
                            <span onClick={props.confirmDelete} className={classes.Cancel}>delete</span>
                        </div>
                    </div>  
                </div>                               
            </div> : null
        }
        {   props.isDeleteCollectionItem ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Confirm Delete</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    <div className={classes.DialogueMessage}>
                        <div>Delete:</div>
                        <h4>{props.itemTitle}</h4> 
                        <div>
                            <span onClick={props.cancelDelete} className={classes.Confirm}>cancel</span>
                            <span onClick={props.confirmDelete} className={classes.Cancel}>delete</span>
                        </div>
                    </div>
                </div>                                      
            </div> : null
        }
        {   props.isPinCollection ?
             <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Pin Collection</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                
            </div> : null
        }
        {   props.isUnpinCollection ? 
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Unpin Collection</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                               
            </div> : null
        }
        { props.isPostSubmitDialogue ? 
            <div className={classes.BodyWrapper}>
                <div className={classes.DialogueMessage}>
                    <div>{props.children}</div>
                    { props.withGoBackButton ? <span className={classes.Confirm} onClick={props.handleBack}>Go back</span> : null}
                    {props.withLink ? <Link to={props.to}>{props.buttonText}</Link> : null }
                </div>
            </div> : null
        }
        { props.isFetchError ? 
            <div className={classes.BodyWrapper}>
                <div className={classes.DialogueMessage}>
                    <span className={classes.fetchError}>{props.children}</span>
                    <span className={classes.Confirm} onClick={props.handleBack}>Go back</span>
                </div>
            </div> : null
        }
        { props.isUpdateAsset ? 
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Update Asset</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                        
            </div> : null
        }
        { props.isStartConversation ? 
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Start New Conversation</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                        
            </div> : null
        }
        { props.isPublishCollection ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Publish Collection</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                  
            </div> : null
        }
        { props.isEditCollection ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Edit Collection</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                
            </div> : null
        }
        { props.isUploadBlogImage ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Upload Blog Image</h5>
                    </div>
                    { props.uploadSuccessful ?
                        null:
                        <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                    }
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                
            </div> : null
        }
        { props.isPostLinkOpinion ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Post Link</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                
            </div> : null
        }
        { props.isPostImageOpinion ?
            <div>
                <div className={classes.DialogueTitleHead}>
                    <div className={classes.DialogueTitleColumn}>
                        <h5>Post Image</h5>
                    </div>
                    <div onClick={props.closeDialogue} className={classes.DialogueCloseIcon}></div>
                </div>
                <div className={classes.BodyWrapper}>
                    {props.children}
                </div>                                
            </div> : null
        }
    </Modal>
);

export default dialogue;