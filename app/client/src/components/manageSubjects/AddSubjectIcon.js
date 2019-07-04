import React, { Component } from 'react';
import classes from './ManageSubject.css';
import Button from '../UserInterface/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import Spinner from '../UserInterface/Spinner/Spinner';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';

class UploadSubjectIcon extends Component {

    componentWillUnmount() {
        this.props.onResetAddIconState();
    }

    state = {
        Icon: null,
        fillError: null,
    }

    handleUpload = (e) => {
        // console.log(e.target.files[0]);
        this.setState({ Icon: e.target.files[0], fillError: null });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.Icon) {
            this.setState({ fillError: 'No file added!'})
        } else {
            this.props.onAddSubjectIcon(this.state.Icon); 
            this.setState({ fillError: null, /* Icon: null */});
        }             
    }

    render() {
        let formButtonText = 'Add';
        if(this.props.addSubjectIconLoading) {
            formButtonText = <Spinner isButton/>;
        }

        return(
            <div className={classes.IconContainerItem}>
                <FormTitle isAdmin>Add Subject Icon</FormTitle>
                <Form
                submitForm={this.submitHandler}
                encType="multipart/form-data"
                >
                    <FormFeedback isFillError>
                        {this.state.fillError}
                    </FormFeedback>
                    <input 
                    id='Icon'
                    type='file'
                    name='Icon'
                    onChange={this.handleUpload}
                    />
                    {this.state.fillError ?
                        <Button btnType='Danger'  disabled> {formButtonText} </Button> :
                        <Button btnType='Success'> {formButtonText} </Button>
                    }
                    { this.props.addSubjectIconError ? 
                        <FormFeedback isFailed>
                            {this.props.addSubjectIconError}
                        </FormFeedback>
                        :
                        <FormFeedback isSuccess>
                            {this.props.addSubjectIconSuccessInfo}
                        </FormFeedback>
                    }
                </Form>
            </div>           
        )
    }
}

const mapStateToProps = state => ({
    addSubjectIconLoading: state.admin1.addSubjectIconLoading,
    addSubjectIconError: state.admin1.addSubjectIconError,
    addSubjectIconSuccessInfo: state.admin1.addSubjectIconSuccessInfo
});

const mapDispatchToProps = dispatch => {
    return {
        onAddSubjectIcon: ( file ) => dispatch( actions.addSubjectIcon( file )),
        onResetAddIconState: () => dispatch( actions.resetAddSubjectIconState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSubjectIcon);