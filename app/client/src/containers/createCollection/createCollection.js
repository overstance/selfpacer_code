import React, { Component } from 'react';
import classes from './createCollection.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import Grid from '../../components/UserInterface/Grid/Grid';

class CreateCollection extends Component {

    /* componentDidMount() {
        this.props.onFetchtitles();

        console.log(this.props.activetitle);
        // this.props.onFetchUser();
    } */
   /*  static contextTypes = {
        router: () => true, // replace with PropTypes.object if you use them
      } */

      componentWillUnmount() {
          this.props.onResetCollectionMessages();
      }

      handleBack = () => {
        this.props.history.goBack()
      }
    
      handleForward = () => {
        // console.log(this.props.history)
        this.props.history.go(+1)
      }

    state = {
        fillError: null,
        title: {
            value: '',
            label: "Name your Collection", 
            name: "title",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitResourceHandler = (event) => {
        event.preventDefault();

        if ( this.state.title.value === '' || !this.state.title.touched ) {

            const titleUpdated = {
                ...this.state.title,
                touched: true,
                valid: false
            }
            this.setState({ title: titleUpdated});

            this.setState({ fillError: 'Please fill all fields' });

        } else {
            this.props.onCreateCollection(this.state.title.value, this.props.user, this.props.resourceToCollect);
            
            const titleReset = {
                ...this.state.title,
                value: this.state.title.value
            }

            this.setState({ title: titleReset, fillError: null});
        }
        
    }

    titleChangedHandler = (event) => {
        const updated = {
            ...this.state.title,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.title.validation),
            touched: true
        }
        this.setState({ title: updated});      
    };

    render() {

        const form = 
        <form 
        className={classes.Form}
        onSubmit={this.submitResourceHandler}
        >
            <div className={classes.FillError}>{this.state.fillError}</div>
            <Input 
            label={this.state.title.label} 
            name={this.state.title.name}
            value={this.state.title.value}
            invalid={!this.state.title.valid}
            shouldValidate={this.state.title.validation}
            touched={this.state.title.touched}
            changed={(event) => this.titleChangedHandler(event)}
            />
            <div className={classes.ResourceLabel}>Resource To Add: </div>
            <div className={classes.ResourceContainer}>
                <div className={classes.ResourceImgColumn}>
                    <img src={this.props.resourceToCollect.img} alt='resource' /> 
                </div>
                <div className={classes.ResourceTitleColumn}>
                    <div className={classes.ResourceTitle}>{this.props.resourceToCollect.title}</div>
                </div>
                
            </div>                           
            { (!this.state.title.valid && this.state.title.touched)  ? 
                <Button btnType='Danger' disabled> Create </Button> :
                <Button btnType='Success'> Create </Button>    
            }
            { this.props.error ? 
                <div>
                    <div className={classes.ErrorFeedbackInfo}>
                        {this.props.error}
                    </div>
                </div> 
                :
                <div>
                    <div className={classes.AddFeedbackInfo}>
                        {this.props.successMessage}
                    </div>
                </div> 
            }
        </form>

        const successDialogue = 
        <div className={classes.PostSubmitDailogue}>
            <div className={classes.PostSubmitMessage}>
                {this.props.successMessage}
            </div>
            <div className={classes.GoBackPrompt} onClick={this.handleBack}>Go back</div> 
        </div>

        let content = form;

        if ( this.props.successMessage) {
            content = successDialogue;
        }


        return (
            <Grid>
                <div className={classes.ContentItems}>
                    <div className={classes.ContainerItem}>
                        <div className={classes.AdminAction}>CREATE A COLLECTION</div>
                        {content}
                    </div >
                </div>            
            </Grid>                                 
        )
    }
};

const mapStateToProps = state => ({
    successMessage: state.collection.successMessage,
    error: state.collection.error,
    user: state.auth.user,
    resourceToCollect: state.collection.resourceToCollect
});

const mapDispatchToProps = dispatch => {
    return {
        onCreateCollection: (title, user, resource) => dispatch( actions.createCollection(title, user, resource) ),
        onResetCollectionMessages: () => dispatch(actions.resetCollectionMessages() )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (CreateCollection);