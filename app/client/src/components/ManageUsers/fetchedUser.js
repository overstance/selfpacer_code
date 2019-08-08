import React from 'react';
import classes from './ManageUsers.module.css'

const fetchedUser = (props) => (
    <div className={classes.fetchedUser}>
        <span>{ 'id: ' + props.id + ';'}</span>
        <span>{ 'name: ' + props.name + ';'}</span>
        <span>{ 'email: ' + props.email + ';'}</span>
        <span>{ 'specialization: ' + props.specialization + ';'}</span>
        <span>{ 'accountType: ' + props.accountType + ';'}</span>
        <span>{ 'isAuthor: ' + props.isAuthor + ';'}</span> 
        <span>{ 'isEditor: ' + props.isEditor + ';'}</span>  
    </div>   
)

export default fetchedUser;