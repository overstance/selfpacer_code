import React, { Component } from "react";
import classes from '../RichEditor.module.css';

class HeadingStyleDropdown extends Component {

  onToggle = (event) => {
    let value = event.target.value
    this.props.onToggle(value)
  }

  render() {
    let backgroundClasses = [classes.styleButton];

    if (this.props.active) {
        backgroundClasses = [classes.styleButton, classes.styleButtonActive];
    }
    /* let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    } */
    return (
      <span>
      <select className={classes.select} value={this.props.active} onChange={this.onToggle}>
        <option value=''>Heading Levels</option>
        {this.props.blockTypeHeadings.map((heading, index) => {
          return <option key={index} className={backgroundClasses.join(' ')} value={heading.style}>{heading.label}</option>
        })}
      </select>
    </span>
    )
  }
}

export default HeadingStyleDropdown