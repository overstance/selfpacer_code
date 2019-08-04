import React from "react";
import classes from '../BlogEditor.module.css';
/* import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import {
  styleMap,
  getBlockStyle,
  BLOCK_TYPES,
  BLOCK_TYPE_HEADINGS,
  BlockStyleControls
} from "./BlockStyles"; */

class StyleButton extends React.Component {

  onToggle = (e) => {
    e.preventDefault()

    this.props.onToggle(this.props.style)
  }

  render() {
    /* console.log(this.props)
    let className = "RichEditor-styleButton inline styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    } */

    let backgroundClasses = [classes.styleButton];

    if ( this.props.id === 'bold') {
      backgroundClasses.push(classes.bold)
    }

    if ( this.props.id === 'italic') {
      backgroundClasses.push(classes.italic)
    }

    if ( this.props.id === 'underline') {
      backgroundClasses.push(classes.underline)
    }

    if (this.props.active) {
        backgroundClasses = [classes.styleButton, classes.styleButtonActive];
    }

    return (
        <span className={backgroundClasses.join(' ')} id={this.props.id || ""} onMouseDown={this.onToggle}>
          {/* <span> */}{this.props.label}{/* </span> */}
        </span>
    );
  }
}

export default StyleButton;