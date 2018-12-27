import React, { Component } from 'react';
import classes from './AddSubjectIcon.css';
import Button from '../../../components/UserInterface/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'

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
                <div className={classes.AdminAction}>ADD SUBJECT ICON</div>
                <form
                className={classes.IconForm}
                onSubmit={this.submitHandler}
                encType="multipart/form-data">
                    <input 
                    id='Icon'
                    type='file'
                    name='Icon'
                    onChange={this.handleUpload}
                    />
                    <Button btnType='Success'> Add </Button>
                </form>
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