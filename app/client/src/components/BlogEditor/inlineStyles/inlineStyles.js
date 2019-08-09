import React from "react";
// import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import classes from '../BlogEditor.module.css';
import StyleButton from "../styleButton/styleButton";

/* const highlightLabel = () => {
  return <i className="material-icons">border_color</i>
} */


export const INLINE_HEADINGS = [
  { label: "U", style: "UNDERLINE"},
  { label: "I", style: "ITALIC" },
  { label: "B", style: "BOLD" },
  { label: "</>", style: "CODE" },
  { label: "HL", style: "HIGHLIGHT" }
]

export const InlineStyles = props => {
    const { editorState, /* onToggle, contentState */ } = props;
    // const key = editorState.getSelection().getStartKey();
    const sty = editorState.getCurrentInlineStyle()
    // let newState = RichUtils.toggleInlineStyle(editorState, sty)

	return (
		<div className={classes.inlineStyles}>
      <div id="link_url" onClick={props.addLinkClicked} className={classes.styleButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
        </svg>
      </div>
      <div onClick={props.addImageClicked} className={classes.styleButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/>
        </svg>
      </div>
			{INLINE_HEADINGS.map(type => (
				<StyleButton
                key={type.label}
                active={sty.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                // className="inline styleButton"
                className={classes.StyleButton}
                id={type.style.toLowerCase()}
                />
            ))}

            {/* <StyleButton */}
            {/* key = "highlight"
            active={sty.has("HIGHLIGHT")}
            label={highlightLabel()}
            onToggle={props.onToggle}
            style="HIGHLIGHT"
            className="inline styleButton"
            id="highlight" */}
            {/* /> */}
		</div>
	);
};