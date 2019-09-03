import React from "react";
// import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import StyleButton from "../styleButton/styleButton";
import HeadingStyleDropDown from './HeadingStyleDropDown';
import classes from '../BlogEditor.module.css';


export const styleMap = {
	CODE: {
		fontFamily: '"Andale Mono", "Menlo", "Consolas", monospace',
		fontSize: 14,
		padding: 2,
		color: '#ff595a'
	},
};



export function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "richEditor-blockquote";

		case "code-block":
            return "richEditor-code-block";
		default:
			return null;
	}
}

export const BLOCK_TYPES = [
	{ label: " “ ” ", style: "blockquote" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
	{ label: "{ }", style: "code-block" }
];

export const BLOCK_TYPE_HEADINGS = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" }
]

export const BlockStyleControls = props => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className={classes.blockStyles}>
			<HeadingStyleDropDown 
			blockTypeHeadings={BLOCK_TYPE_HEADINGS} 
			active={blockType} 
			onToggle={props.onToggle} 
			/>
			<div onClick={props.addYoutubeClicked} className={classes.styleButton}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/>
				</svg>
			</div>
			{BLOCK_TYPES.map(type => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};