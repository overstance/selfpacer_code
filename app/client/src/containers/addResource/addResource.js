import React, { Component } from 'react';
import classes from './addResource.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import ButtonSpinner from '../../components/UserInterface/ButtonSpinner/ButtonSpinner';
import Grid from '../../components/UserInterface/Grid/Grid';

class AddResources extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();

        // console.log(this.props.activeSubject);
        // this.props.onFetchUser();
    } */

    componentWillMount() {
        this.props.onClearAddMessages();
    }

    state = {
        fillError: null,
        subject: {
            value: this.props.activeSubject,
            label: "select category", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        type: {
            value: this.props.activeContentPage,
            label: "select type", 
            name: "Type",
            validation: {
                required: true
            },
            elementConfig: { 
                options: [ 
                    {
                        value: '',
                        displayValue: ''
                    },
                    {
                        value: 'youtube playlist',
                        displayValue: 'youtube playlist'
                    },
                    {
                        value: 'youtube video',
                        displayValue: 'youtube video'
                    },
                    {
                        value: 'mooc',
                        displayValue: 'mooc'
                    },
                    {
                        value: 'book',
                        displayValue: 'book'
                    }
                ]
            },
            valid: false,
            touched: false   
        },
        youtubePlaylist: {
            value: '',
            label: "enter Id",
            labelspan: '(valid youtube playlist id)*',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        youtubeVideo: {
            value: '',
            label: "enter Id",
            labelspan: '(valid youtube video id)*',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
        },
        mooc_controls: {
            title: {
                elementType: 'textarea',
                elementConfig: {
                    label: "course title",
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            url: {
                elementType: 'textarea',
                elementConfig: {
                    label: "course url",
                    labelspan: '(valid url only)*'
                },
                value: '', 
                validation: {
                    required: true,
                    isUrl: true
                },
                valid: false,
                touched: false,
            },
            imageUrl: {
                elementType: 'textarea',
                elementConfig: {
                    label: "image url",
                    labelspan: '(valid url only)'
                },
                value: '',
                validation: {
                    isUrl: true
                },
                valid: false,
                touched: false,
            },
            source: {
                elementType: 'input',
                elementConfig: {
                    label: "source",
                    labelspan: '(i.e udemy.com)*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            videoCount: {
                elementType: 'input',
                elementConfig: {
                    label: "video count",
                    labelspan: '(number with no commas)*'
                },
                value: '', 
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            tutor: {
                elementType: 'input',
                elementConfig: {
                    label: "tutor",
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            enrollees: {
                elementType: 'input',
                elementConfig: {
                    label: "enrollees",
                    labelspan: '(number with no commas)*'
                },
                value: '', 
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            duration: {
                elementType: 'input',
                elementConfig: {
                    label: "duration",
                    labelspan: '*'
                },
                value: '', 
                name: "duration",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            level: {
                elementType: 'select',
                elementConfig: { 
                    label: "level",
                    labelspan: '*',
                    options: [ 
                        {
                            value: '',
                            displayValue: ''
                        },
                        {
                            value: 'All',
                            displayValue: 'All'
                        },
                        {
                            value: 'Beginner',
                            displayValue: 'Beginner'
                        },
                        {
                            value: 'Intermediate',
                            displayValue: 'Intermediate'
                        },
                        {
                            value: 'Advanced',
                            displayValue: 'Advanced'
                        }
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            lastUpdated: {
                elementType: 'input',
                elementConfig: {
                    label: "last Updated"
                },
                value: '',
                validation: {},
                valid: false,
                touched: false,
            },
            avgRating: {
                elementType: 'input',
                elementConfig: {
                    label: "avg. Rating",
                    labelspan: '(of 5 stars)'
                },
                value: '', 
                validation: {},
                valid: false,
                touched: false,
            }
        },
        book_controls: {
            title: {
                elementType: 'textarea',
                elementConfig: {
                    label: "course title",
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            url: {
                elementType: 'textarea',
                elementConfig: {
                    label: "resource url",
                    labelspan: '(valid url only)*'
                },
                value: '', 
                validation: {
                    required: true,
                    isUrl: true
                },
                valid: false,
                touched: false,
            },
            imageUrl: {
                elementType: 'textarea',
                elementConfig: {
                    label: "image url",
                    labelspan: '(valid url only)'
                },
                value: '',
                validation: {
                    isUrl: true
                },
                valid: false,
                touched: false,
            },
            source: {
                elementType: 'input',
                elementConfig: {
                    label: "source",
                    labelspan: '(i.e amazon.com)*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            author: {
                elementType: 'input',
                elementConfig: {
                    label: "author",
                    labelspan: '*'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            level: {
                elementType: 'select',
                elementConfig: { 
                    label: "level",
                    options: [ 
                        {
                            value: '',
                            displayValue: ''
                        },
                        {
                            value: 'All',
                            displayValue: 'All'
                        },
                        {
                            value: 'Beginner',
                            displayValue: 'Beginner'
                        },
                        {
                            value: 'Intermediate',
                            displayValue: 'Intermediate'
                        },
                        {
                            value: 'Advanced',
                            displayValue: 'Advanced'
                        }
                    ]
                },
                value: '',
                validation: {},
                valid: false,
                touched: false,
            },
            avgRating: {
                elementType: 'input',
                elementConfig: {
                    label: "avg. Rating",
                    labelspan: '(of 5 stars)'
                },
                value: '', 
                validation: {},
                valid: false,
                touched: false,
            }
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

        if (rules.isUrl) {
            const pattern = /^(ftp|http|https):\/\/[^ "]+$/
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

        if (this.state.type.value === 'youtube playlist') {
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
    
            } else if (this.state.subject.value === '') {
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

        /* if ((this.state.subject.value === '' || this.state.type.value === '' || this.state.resource.value === '' ) && (!this.state.subject.touched || !this.state.resource.touched || !this.state.type.touched)) {
            const resourceUpdated = {
                ...this.state.resource,
                touched: true,
                valid: true
            }
            this.setState({ resource: resourceUpdated});

            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: true
            }
            this.setState({ subject: subjectUpdated});

            const typeUpdated = {
                ...this.state.type,
                touched: true,
                valid: true
            }
            this.setState({ type: typeUpdated});

            this.setState({ fillError: 'Please fill all fields' });

        } else {
            this.props.onAddResource(this.state.resource.value, this.state.subject.value, this.state.type.value, this.props.user, this.props.history);
            
            const youtubeReset = {
                    ...this.state.resource,
                    value: ''
                }
            const subjectReset = {
                ...this.state.subject,
                value: this.state.subject.value
            }

            const typeReset = {
                ...this.state.type,
                value: this.state.type.value
            }

            this.setState({ resource: youtubeReset, subject: subjectReset, type: typeReset, fillError: null});
        } */
        
    }

    subjectChangedHandler = (event) => {

        const updated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        this.setState({ subject: updated}, () => {
            if(this.state.subject.value === '') {
                this.setState({fillError: 'please select category'});
            } else {   
                this.setState({ subject: updated, fillError: null});
            }
        });
        
    }

    typeChangedHandler = (event) => {
        const updated = {
            ...this.state.type,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.type.validation),
            touched: true
        }
        this.setState({ type: updated, fillError: null}, () => {
            if(this.props.youtubePlaylistAddError || this.props.youtubePlaylistAddedFeedback) {
                this.props.onClearAddMessages();
            }
        });      
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

    youtubeVideoInputChangedHandler = (event) => {
        const updated = {
            ...this.state.youtubeVideo,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.youtubeVideo.validation),
            touched: true,   
        }
        this.setState({ youtubeVideo: updated, fillError: null});    
    }

    moocInputChangedHandler = (event, controlName) => {
        const updated = {
            ...this.state.mooc_controls,
            [controlName]: {
                ...this.state.mooc_controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.mooc_controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ mooc_controls: updated, fillError: null });
    }

    bookInputChangedHandler = (event, controlName) => {
        const updated = {
            ...this.state.book_controls,
            [controlName]: {
                ...this.state.book_controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.book_controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ book_controls: updated, fillError: null });

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

        let platformSpecificForm = <div className={classes.Notype}>Please select resource type to continue</div>
        let playlistButtonText = 'submit';

        if(this.props.youtubePlaylistLoading) {
            playlistButtonText = <ButtonSpinner />;
        }


        let youtubePlaylistForm = 
        <form 
        className={classes.Form}
        onSubmit={this.submitResourceHandler}
        >
            <Input 
            elementType='textarea'
            label={this.state.youtubePlaylist.label}
            labelspan={this.state.youtubePlaylist.labelspan}
            value={this.state.youtubePlaylist.value}
            invalid={!this.state.youtubePlaylist.valid}
            shouldValidate={this.state.youtubePlaylist.validation}
            touched={this.state.youtubePlaylist.touched}
            changed={(event) => this.youtubePlaylistInputChangedHandler(event)}
            />
            { (!this.state.youtubePlaylist.valid && this.state.youtubePlaylist.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled>{playlistButtonText} </Button> :
                <Button btnType='Success'>{playlistButtonText} </Button>    
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

        let youtubeVideoForm = 
        <form 
        className={classes.Form}
        onSubmit={this.submitResourceHandler}
        >
            <Input 
            elementType='textarea'
            label={this.state.youtubeVideo.label}
            labelspan={this.state.youtubeVideo.labelspan}
            value={this.state.youtubeVideo.value}
            invalid={!this.state.youtubeVideo.valid}
            shouldValidate={this.state.youtubeVideo.validation}
            touched={this.state.youtubeVideo.touched}
            changed={(event) => this.youtubeVideoInputChangedHandler(event)}
            />
            { (!this.state.youtubeVideo.valid && this.state.youtubeVideo.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Submit </Button> :
                <Button btnType='Success'> Submit </Button>    
            }
        </form>

        const moocElementsArray = [];
        for (let key in this.state.mooc_controls) {
            moocElementsArray.push({
                id: key,
                config: this.state.mooc_controls[key]
            });
        }

        let moocInputs = moocElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.elementConfig.label}
                labelspan={formElement.config.elementConfig.labelspan}
                changed={(event) => this.moocInputChangedHandler(event, formElement.id)}
                // errorMessage={this.onValidationError(formElement.id)}
            />
        ));

        let moocForm =
        <form 
        className={classes.Form}
        onSubmit={this.submitHandler}
        >
            {/* <div className={classes.FillError}>{this.state.fillError}</div> */}
            {moocInputs}
            { (!this.state.mooc_controls.title.valid && this.state.mooc_controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.mooc_controls.url.valid && this.state.mooc_controls.url.touched)  || (!this.state.mooc_controls.source.valid && this.state.mooc_controls.source.touched) || (!this.state.mooc_controls.videoCount.valid && this.state.mooc_controls.videoCount.touched) || (!this.state.mooc_controls.tutor.valid && this.state.mooc_controls.tutor.touched) || (!this.state.mooc_controls.enrollees.valid && this.state.mooc_controls.enrollees.touched) || (!this.state.mooc_controls.duration.valid && this.state.mooc_controls.duration.touched) || (!this.state.mooc_controls.level.valid && this.state.mooc_controls.level.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Add </Button> :
                <Button btnType='Success'> Add </Button>    
            }
            { this.props.addMoocError ? 
                <div>
                    <div className={classes.ErrorFeedbackInfo}>
                        {this.props.addMoocError}
                    </div>
                </div> 
                :
                <div>
                    <div className={classes.AddFeedbackInfo}>
                        {this.props.addMoocSucessInfo}
                    </div>
                </div> 
            }
        </form>

        const bookElementsArray = [];
        for (let key in this.state.book_controls) {
            bookElementsArray.push({
                id: key,
                config: this.state.book_controls[key]
            });
        }

        // let formAll = null;
        let bookInputs = bookElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.elementConfig.label}
                labelspan={formElement.config.elementConfig.labelspan}
                changed={(event) => this.bookInputChangedHandler(event, formElement.id)}
                // errorMessage={this.onValidationError(formElement.id)}
            />
        ));

        let bookForm =
        <form 
        className={classes.Form}
        onSubmit={this.submitHandler}
        >
            {/* <div className={classes.FillError}>{this.state.fillError}</div> */}
            {bookInputs}
            { (!this.state.book_controls.title.valid && this.state.book_controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.book_controls.url.valid && this.state.book_controls.url.touched)  || (!this.state.book_controls.source.valid && this.state.book_controls.source.touched) || (!this.state.book_controls.author.valid && this.state.book_controls.author.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> Add </Button> :
                <Button btnType='Success'> Add </Button>    
            }
            { this.props.addBooksError ? 
                <div>
                    <div className={classes.ErrorFeedbackInfo}>
                        {this.props.addBooksError}
                    </div>
                </div> 
                :
                <div>
                    <div className={classes.AddFeedbackInfo}>
                        {this.props.addBooksSucessInfo}
                    </div>
                </div> 
            }
        </form>


        

        if(this.state.type.value === 'youtube playlist') {
            platformSpecificForm = youtubePlaylistForm
        } else if (this.state.type.value === 'youtube video') {
            platformSpecificForm = youtubeVideoForm
        } else if (this.state.type.value === 'mooc') {
            platformSpecificForm = moocForm
        } else if (this.state.type.value === 'book') {
            platformSpecificForm = bookForm
        }


        let addForm = 
        <div className={classes.OuterContainer}>
            <div className={classes.FillError}>{this.state.fillError}</div>
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
            <Input 
            label={this.state.type.label} 
            name={this.state.type.name}
            value={this.state.type.value}
            elementType='select'
            invalid={!this.state.type.valid}
            shouldValidate={this.state.type.validation}
            touched={this.state.type.touched}
            elementConfig={this.state.type.elementConfig}
            changed={(event) => this.typeChangedHandler(event)}
            />
            {platformSpecificForm}
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
        </div>

        return (
            <Grid>
                <div className={classes.ContentItems}>
                    <div className={classes.ContainerItem}>
                        <div className={classes.AdminAction}>SUBMIT A RESOURCE</div>
                        {addForm}
                    </div >
                </div>            
            </Grid>                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    user: state.auth.user,
    activeContentPage: state.explore.activeContentType,
    activeSubject: state.clickedSubject.subject[0].title,

    youtubePlaylistLoading: state.admin1.youtubePlaylistLoading,
    youtubePlaylistAddedFeedback: state.admin1.youtubePlaylistAddedFeedback,
    youtubePlaylistAddError: state.admin1.addYoutubePlaylistError,

    /* successMessage: state.resource.successMessage,
    error: state.resource.error, */
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        // onAddResource: (link, subject, type, user, history) => dispatch( actions.addResource(link, subject, type, user, history) )
        onAddYoutubePlaylist: (playlistId, subject, user) => dispatch( actions.addYoutubePlaylist(playlistId, subject, user)),
        onClearAddMessages: () => dispatch(actions.clearAddMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddResources);