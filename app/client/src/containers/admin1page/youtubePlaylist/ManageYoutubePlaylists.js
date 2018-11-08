import React, { Component } from 'react';
import classes from './ManageYoutubePlaylists.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class ManageYoutubePlaylists extends Component {

    componentDidMount() {
        this.props.onFetchSubjects();
    }

    state = {
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

        if ((!this.state.youtubePlaylist.touched || this.state.youtubePlaylist.value === '') && (!this.state.youtubePlaylist.touched || this.state.youtubePlaylist.value === '')) {
            const youtubeUpdated = {
                ...this.state.youtubePlaylist,
                touched: true,
                valid: false
            }
            this.setState({ youtubePlaylist: youtubeUpdated});

            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated});
        } else {
            this.props.onAddYoutubePlaylist(this.state.youtubePlaylist.value, this.state.subject.value);
            console.log(this.state.youtubePlaylist.value, this.state.subject.value);
            const youtubeReset = {
                    ...this.state.youtubePlaylist,
                    value: ''
                }
            const subjectReset = {
                ...this.state.subject,
                value: ''
            }

            this.setState({ youtubePlaylist: youtubeReset, subject: subjectReset});
        }
        
    }  

    youtubePlaylistInputChangedHandler = (event) => {
        const updated = {
            ...this.state.youtubePlaylist,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.youtubePlaylist.validation),
            touched: true,   
        }
        this.setState({ youtubePlaylist: updated});

        console.log(this.state.youtubePlylist);   
    }  

    subjectChangedHandler = (event) => {
        const updated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }
        this.setState({ subject: updated});

        console.log(this.state.subject.value);
    }

    elementConfig = () => {
        let elementConfig = {};

       const temp = this.props.subjects.map( subject => {
            return {
                value: subject.title,
                displayValue: subject.title
            }
        })

        elementConfig.options = temp;
        elementConfig.options[0] = { value: '', displayValue: ''};
        return elementConfig;
    } 

    render() {
        return (
            <div>                    
                <div className={classes.ContainerItem}>
                    <div className={classes.AdminAction}>ADD YOUTUBE PLAYLIST</div>
                    <form 
                    className={classes.Form}
                    onSubmit={this.submitYoutubePlaylistHandler}
                    >
                        <Input 
                        label={this.state.youtubePlaylist.label} 
                        name={this.state.youtubePlaylist.name}
                        value={this.state.youtubePlaylist.value}
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
                        { (!this.state.youtubePlaylist.valid && this.state.youtubePlaylist.touched) || (!this.state.subject.valid && this.state.subject.touched) ? 
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
            </div>                      
        )
    }
};

const mapStateToProps = state => ({   
    youtubePlaylistAddedFeedback: state.profile.youtubePlaylistAddedFeedback,
    youtubePlaylistAddError: state.profile.addYoutubePlaylistError,
    subjects: state.explore.subjects,
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onAddYoutubePlaylist: (playlistId, subject) => dispatch( actions.addYoutubePlaylist(playlistId, subject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ManageYoutubePlaylists);