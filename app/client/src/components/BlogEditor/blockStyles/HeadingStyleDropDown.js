import React, { Component } from "react";
import classes from '../BlogEditor.module.css';

class HeadingStyleDropdown extends Component {

  onToggle = (event) => {
    let value = event.target.value
    this.props.onToggle(value)
  }

  render() {
    let backgroundClasses = [classes.blockSelect];

    if (this.props.active === 'header-one' || 
        this.props.active === 'header-two' || 
        this.props.active === 'header-three' ||
        this.props.active === 'header-four' ||
        this.props.active === 'header-five' ) {
        backgroundClasses = [classes.blockSelect, classes.blockSelectActive];
    }
    
    return (
      <div className={classes.blockTypeHeadings}>
        <select className={backgroundClasses.join(' ')} value={this.props.active} onChange={this.onToggle}>
          <option value=''>Heading Levels</option>
          {this.props.blockTypeHeadings.map((heading, index) => {
            return <option key={index} /* className={backgroundClasses.join(' ')} */ value={heading.style}>{heading.label}</option>
          })}
        </select>
    </div>
    )
  }
}

export default HeadingStyleDropdown