import React, { Component } from 'react';
import classes from './AddSubject.css';
import Button from '../UserInterface/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';

class UploadSubjectimage extends Component {

    state = {
        Icon: null
    }

    handleUpload = (e) => {
        console.log(e.target.files[0]);
        this.setState({ Icon: e.target.files[0] });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAddSubjectIcon(this.state.Icon);           
    }

    render() {
        return(
            <div className={classes.IconContainerItem}>
                <FormTitle isAdmin>Add Subject Icon</FormTitle>
                <Form
                submitForm={this.submitHandler}
                encType="multipart/form-data"
                >
                    <input 
                    id='Icon'
                    type='file'
                    name='Icon'
                    onChange={this.handleUpload}
                    />
                    <Button btnType='Success'> Add </Button>
                </Form>
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddSubjectIcon: ( file ) => dispatch( actions.onAddSubjectIcon( file )),
    };
};

export default connect(null, mapDispatchToProps)(UploadSubjectimage);