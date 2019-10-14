import React from 'react';
import classes from './nonBlogSearch.module.css';

const searchFilter = (props) => {
    return (
        <fieldset className={classes.filterField}>
            <legend>Filter search</legend>
            <div className={classes.checkboxGroup}>
                <div>
                    <input type="checkbox" value="skill" onChange={props.filterChanged}/>
                    <label>Skill</label>
                </div>
                <div>
                    <input type="checkbox" value="book" onChange={props.filterChanged}/>
                    <label>Book</label>
                </div>
                <div>
                    <input type="checkbox" value="course" onChange={props.filterChanged}/>
                    <label>Course</label>
                </div>
                <div>
                    <input type="checkbox" value="youtube" onChange={props.filterChanged}/>
                    <label>Youtube</label>
                </div>
                <div>
                    <input type="checkbox" value="collection" onChange={props.filterChanged}/>
                    <label>Collection</label>
                </div>
            </div>
        </fieldset>
    )
}

export default searchFilter;