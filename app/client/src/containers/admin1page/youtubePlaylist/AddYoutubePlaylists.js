import React, { Component } from 'react';
import classes from './AddYoutubePlaylists.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class AddYoutubePlaylists extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();
    } */

    state = {
        fillError: null,
        subject: {
            value: '',
            label: "Select Subject", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        youtubePlaylist: {
            value: '',
            label: "Enter Playlist Id(s)", 
            name: "youtubePlaylist",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
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

    

    submitYoutubePlaylistHandler = (event) => {
        event.preventDefault();

        if ( this.props.youtubePlaylistAddedFeedback && !this.state.youtubePlaylist.touched) {
            const youtubeUpdated = {
                ...this.state.youtubePlaylist,
                touched: true,
                valid: false
            }
            this.setState({ youtubePlaylist: youtubeUpdated, fillError: 'Add new'})

        } else if (!this.state.youtubePlaylist.touched || this.state.youtubePlaylist.value === '') {
            const youtubeUpdated = {
                ...this.state.youtubePlaylist,
                touched: true,
                valid: false
            }
            this.setState({ youtubePlaylist: youtubeUpdated, fillError: 'Please fill all fields'});

        } else if (!this.state.subject.touched || this.state.subject.value === '') {
            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated, fillError: 'Please fill all fields'});

        } else {
            this.props.onAddYoutubePlaylist(this.state.youtubePlaylist.value, this.state.subject.value, this.props.user._id);
            const youtubeReset = {
                    ...this.state.youtubePlaylist,
                    value: '',
                    touched: false
                }

            this.setState({ youtubePlaylist: youtubeReset });
        }
        
    }  

    youtubePlaylistInputChangedHandler = (event) => {
        const updated = {
            ...this.state.youtubePlaylist,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.youtubePlaylist.validation),
            touched: true,   
        }
        this.setState({ youtubePlaylist: updated, fillError: null});   
    }  

    subjectChangedHandler = (event) => {
        const updated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }
        this.setState({ subject: updated, fillError: null});
    }

    elementConfig = () => {
        let elementConfig = {};
        
        const subjects = this.props.subjects.map( subject => subject.title );

        const subjectSort = subjects.sort();

        const temp = subjectSort.map( subject => {
            return {
                value: subject,
                displayValue: subject
            }
        })

        temp.unshift({ value: '', displayValue: ''});

        elementConfig.options = temp;

        return elementConfig;
    } 

    render() {
        return (                   
            <div className={classes.ContainerItem}>
                <div className={classes.AdminAction}>ADD YOUTUBE PLAYLIST</div>
                <form 
                className={classes.Form}
                onSubmit={this.submitYoutubePlaylistHandler}
                >
                    <div className={classes.FillError}>{this.state.fillError}</div>
                    <Input 
                    label={this.state.youtubePlaylist.label} 
                    name={this.state.youtubePlaylist.name}
                    value={this.state.youtubePlaylist.value}
                    elementType='textarea'
                    invalid={!this.state.youtubePlaylist.valid}
                    shouldValidate={this.state.youtubePlaylist.validation}
                    touched={this.state.youtubePlaylist.touched}
                    changed={(event) => this.youtubePlaylistInputChangedHandler(event)}
                    />
                    <Input 
                    label={this.state.subject.label} 
                    name={this.state.subject.name}
                    value={this.state.subject.value}
                    elementType='select'
                    invalid={!this.state.subject.valid}
                    shouldValidate={this.state.subject.validation}
                    touched={this.state.subject.touched}
                    elementConfig={this.elementConfig()}
                    changed={(event) => this.subjectChangedHandler(event)}
                    />
                    { (!this.state.youtubePlaylist.valid && this.state.youtubePlaylist.touched) || (!this.state.subject.valid && this.state.subject.touched) || this.state.fillError ? 
                        <Button btnType='Danger' disabled> Add </Button> :
                        <Button btnType='Success'> Add </Button>    
                    }
                    { this.props.youtubePlaylistAddError ? 
                        <div>
                            <div className={classes.ErrorFeedbackInfo}>
                                {this.props.youtubePlaylistAddError}
                            </div>
                        </div> 
                        :
                        <div>
                            <div className={classes.AddFeedbackInfo}>
                                {this.props.youtubePlaylistAddedFeedback}
                            </div>
                        </div> 
                    }
                </form>
            </div>                                                      
        )
    }
};

const mapStateToProps = state => ({   
    youtubePlaylistAddedFeedback: state.admin1.youtubePlaylistAddedFeedback,
    youtubePlaylistAddError: state.admin1.addYoutubePlaylistError,
    subjects: state.explore.subjects,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onAddYoutubePlaylist: (playlistId, subject, user) => dispatch( actions.addYoutubePlaylist(playlistId, subject, user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddYoutubePlaylists);