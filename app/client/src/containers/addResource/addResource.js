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

    componentWillUnmount() {
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
                    label: "book title",
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

        if (this.state.type.value === 'youtube video') {
            if ( this.props.youtubeVideoAddedFeedback && !this.state.youtubeVideo.touched) {
                const youtubeUpdated = {
                    ...this.state.youtubeVideo,
                    touched: true,
                    valid: false
                }
                this.setState({ youtubeVideo: youtubeUpdated, fillError: 'Add new'});
    
            } else if (!this.state.youtubeVideo.touched || this.state.youtubeVideo.value === '') {
                const youtubeUpdated = {
                    ...this.state.youtubeVideo,
                    touched: true,
                    valid: false
                }
                this.setState({ youtubeVideo: youtubeUpdated, fillError: 'Please fill all fields'});
    
            } else if (this.state.subject.value === '') {
                const subjectUpdated = {
                    ...this.state.subject,
                    touched: true,
                    valid: false
                }
                this.setState({ subject: subjectUpdated, fillError: 'Please fill all fields'});
    
            } else {
                this.props.onAddYoutubeVideo(this.state.youtubeVideo.value, this.state.subject.value, this.props.user._id);
                
                const youtubeReset = {
                        ...this.state.youtubeVideo,
                        value: '',
                        touched: false
                    }
                
                this.setState({ youtubeVideo: youtubeReset});
            }
        }

        if (this.state.type.value === 'mooc') {

            if ( this.props.addMoocSucessInfo && !this.state.mooc_controls.title.touched ) {

                const updated = {
                    ...this.state.mooc_controls,
                    title: {
                        ...this.state.mooc_controls.title,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated, fillError: 'Add new resource' });
    
            } else if (!this.state.mooc_controls.title.touched && this.state.mooc_controls.title.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    title: {
                        ...this.state.mooc_controls.title,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated, fillError: 'Please fill all asterisked fields' });

            } else if (!this.state.mooc_controls.url.touched && this.state.mooc_controls.url.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    url: {
                        ...this.state.mooc_controls.url,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.mooc_controls.source.touched && this.state.mooc_controls.source.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    source: {
                        ...this.state.mooc_controls.source,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.mooc_controls.videoCount.touched && this.state.mooc_controls.videoCount.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    videoCount: {
                        ...this.state.mooc_controls.videoCount,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.mooc_controls.tutor.touched && this.state.mooc_controls.tutor.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    tutor: {
                        ...this.state.mooc_controls.tutor,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.mooc_controls.enrollees.touched && this.state.mooc_controls.enrollees.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    enrollees: {
                        ...this.state.mooc_controls.enrollees,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.mooc_controls.duration.touched && this.state.mooc_controls.duration.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    duration: {
                        ...this.state.mooc_controls.duration,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.mooc_controls.level.touched && this.state.mooc_controls.level.value === '' ) {
                const updated = {
                    ...this.state.mooc_controls,
                    level: {
                        ...this.state.mooc_controls.level,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ mooc_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else {
    
                // this.props.onClearAddMoocFeedbacks();
    
                this.props.onAddMooc(this.state.subject.value, this.state.mooc_controls.title.value, this.state.mooc_controls.url.value,
                    this.state.mooc_controls.imageUrl.value, this.state.mooc_controls.source.value, this.state.mooc_controls.videoCount.value,
                    this.state.mooc_controls.tutor.value, this.state.mooc_controls.enrollees.value, this.state.mooc_controls.duration.value,
                    this.state.mooc_controls.level.value, this.state.mooc_controls.lastUpdated.value, this.state.mooc_controls.avgRating.value,
                    this.props.user._id 
                );
    
                const updated = {
                    ...this.state.mooc_controls,
                    title: {
                        ...this.state.mooc_controls.title,
                        touched: false,
                        value: ''
                    },
                    url: {
                        ...this.state.mooc_controls.url,
                        touched: false,
                        value: ''
                    },
                    imageUrl: {
                        ...this.state.mooc_controls.imageUrl,
                        touched: false,
                        value: ''
                    },
                    source: {
                        ...this.state.mooc_controls.source,
                        touched: false,
                        value: ''
                    },
                    videoCount: {
                        ...this.state.mooc_controls.videoCount,
                        touched: false,
                        value: ''
                    },
                    tutor: {
                        ...this.state.mooc_controls.tutor,
                        touched: false,
                        value: ''
                    },
                    enrollees: {
                        ...this.state.mooc_controls.enrollees,
                        touched: false,
                        value: ''
                    },
                    duration: {
                        ...this.state.mooc_controls.duration,
                        touched: false,
                        value: ''
                    },
                    level: {
                        ...this.state.mooc_controls.level,
                        touched: false,
                        value: ''
                    },
                    lastUpdated: {
                        ...this.state.mooc_controls.lastUpdated,
                        touched: false,
                        value: ''
                    },
                    avgRating: {
                        ...this.state.mooc_controls.avgRating,
                        touched: false,
                        value: ''
                    }
                };
                this.setState({ mooc_controls: updated, fillError: null });
                
            }
     
        }

        if (this.state.type.value === 'book') {

            if ( this.props.addBooksSucessInfo && !this.state.book_controls.title.touched ) {

                const updated = {
                    ...this.state.book_controls,
                    title: {
                        ...this.state.book_controls.title,
                        touched: true,
                        valid: false
                    }
                };
                
                this.setState({ book_controls: updated, fillError:'Add new resource' });
    
            } else if (!this.state.book_controls.title.touched && this.state.book_controls.title.value === '' ) {
                const updated = {
                    ...this.state.book_controls,
                    title: {
                        ...this.state.book_controls.title,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ book_controls: updated, fillError: 'Please fill all asterisked fields' });

            } else if (!this.state.book_controls.url.touched && this.state.book_controls.url.value === '' ) {
                const updated = {
                    ...this.state.book_controls,
                    url: {
                        ...this.state.book_controls.url,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ book_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.book_controls.source.touched && this.state.book_controls.source.value === '' ) {
                const updated = {
                    ...this.state.book_controls,
                    source: {
                        ...this.state.book_controls.source,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ book_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else if (!this.state.book_controls.author.touched && this.state.book_controls.author.value === '' ) {
                const updated = {
                    ...this.state.book_controls,
                    author: {
                        ...this.state.book_controls.author,
                        touched: true,
                        valid: false
                    }
                };
                this.setState({ book_controls: updated });
    
                this.setState({ fillError: 'Please fill all asterisked fields' });
            } else {
    
                this.props.onAddBooks(
                    this.state.subject.value, this.state.book_controls.title.value, this.state.book_controls.url.value,
                    this.state.book_controls.imageUrl.value, this.state.book_controls.source.value, this.state.book_controls.author.value,
                    this.state.book_controls.level.value, this.state.book_controls.avgRating.value, this.props.user._id 
                );
    
                const updated = {
                    ...this.state.book_controls,
                    title: {
                        ...this.state.book_controls.title,
                        touched: false,
                        value: ''
                    },
                    url: {
                        ...this.state.book_controls.url,
                        touched: false,
                        value: ''
                    },
                    imageUrl: {
                        ...this.state.book_controls.imageUrl,
                        touched: false,
                        value: ''
                    },
                    source: {
                        ...this.state.book_controls.source,
                        touched: false,
                        value: ''
                    },
                    author: {
                        ...this.state.book_controls.author,
                        touched: false,
                        value: ''
                    },
                    level: {
                        ...this.state.book_controls.level,
                        touched: false,
                        value: ''
                    },
                    avgRating: {
                        ...this.state.book_controls.avgRating,
                        touched: false,
                        value: ''
                    }
                };
                this.setState({ book_controls: updated, fillError: null });    
            }
        }
        
    }

    subjectChangedHandler = (event) => {

        const updated = {
            ...this.state.subject,
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.subject.validation),
            touched: true
        }

        this.setState({ subject: updated}, () => {
            if (this.state.subject.value === '') {
                this.setState({fillError: 'please select category'});
            } else {   
                this.setState({ subject: updated, fillError: null});
                this.props.onClearAddMessages();
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
            this.props.onClearAddMessages();
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
        
        let youtubePlaylistButtonText = 'submit';
        if(this.props.youtubePlaylistLoading) {
            youtubePlaylistButtonText = <ButtonSpinner />;
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
                <Button btnType='Danger' disabled>{youtubePlaylistButtonText} </Button> :
                <Button btnType='Success'>{youtubePlaylistButtonText} </Button>    
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

        let youtubeVideoButtonText = 'submit';

        if(this.props.youtubeVideoLoading) {
            youtubeVideoButtonText = <ButtonSpinner />;
        }

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
                <Button btnType='Danger' disabled> {youtubeVideoButtonText} </Button> :
                <Button btnType='Success'> {youtubeVideoButtonText} </Button>    
            }
            { this.props.youtubeVideoAddError ? 
                <div>
                    <div className={classes.ErrorFeedbackInfo}>
                        {this.props.youtubeVideoAddError}
                    </div>
                </div> 
                :
                <div>
                    <div className={classes.AddFeedbackInfo}>
                        {this.props.youtubeVideoAddedFeedback}
                    </div>
                </div> 
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

        let addMoocButtonText = 'submit';
        if(this.props.addMoocLoading) {
            addMoocButtonText = <ButtonSpinner />;
        }

        let moocForm =
        <form 
        className={classes.Form}
        onSubmit={this.submitResourceHandler}
        >
            {/* <div className={classes.FillError}>{this.state.fillError}</div> */}
            {moocInputs}
            { (!this.state.mooc_controls.title.valid && this.state.mooc_controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.mooc_controls.url.valid && this.state.mooc_controls.url.touched)  || (!this.state.mooc_controls.source.valid && this.state.mooc_controls.source.touched) || (!this.state.mooc_controls.videoCount.valid && this.state.mooc_controls.videoCount.touched) || (!this.state.mooc_controls.tutor.valid && this.state.mooc_controls.tutor.touched) || (!this.state.mooc_controls.enrollees.valid && this.state.mooc_controls.enrollees.touched) || (!this.state.mooc_controls.duration.valid && this.state.mooc_controls.duration.touched) || (!this.state.mooc_controls.level.valid && this.state.mooc_controls.level.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> {addMoocButtonText} </Button> :
                <Button btnType='Success'> {addMoocButtonText} </Button>    
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

        let addBooksButtonText = 'submit';
        if(this.props.addBooksLoading) {
            addBooksButtonText = <ButtonSpinner />;
        }

        let bookForm =
        <form 
        className={classes.Form}
        onSubmit={this.submitResourceHandler}
        >
            {bookInputs}
            { (!this.state.book_controls.title.valid && this.state.book_controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.book_controls.url.valid && this.state.book_controls.url.touched)  || (!this.state.book_controls.source.valid && this.state.book_controls.source.touched) || (!this.state.book_controls.author.valid && this.state.book_controls.author.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> {addBooksButtonText} </Button> :
                <Button btnType='Success'> {addBooksButtonText} </Button>    
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

    youtubeVideoLoading: state.admin1.youtubeVideoLoading,
    youtubeVideoAddedFeedback: state.admin1.youtubeVideoAddedFeedback,
    youtubeVideoAddError: state.admin1.addYoutubeVideoError,

    addMoocSucessInfo: state.admin1.addMoocSucessInfo,
    addMoocError: state.admin1.addMoocError,
    addMoocLoading: state.admin1.addMoocLoading,

    addBooksSucessInfo: state.admin1.addBooksSucessInfo,
    addBooksError: state.admin1.addBooksError,
    addBooksLoading: state.admin1.addBooksLoading,
});

const mapDispatchToProps = dispatch => {
    return {
        onAddYoutubePlaylist: (playlistId, subject, user) => dispatch( actions.addYoutubePlaylist(playlistId, subject, user)),
        onAddYoutubeVideo: (videoId, subject, user) => dispatch( actions.addYoutubeVideo(videoId, subject, user) ),
        onAddMooc: (subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, agent) => dispatch( actions.addMooc(subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, agent) ),
        onAddBooks: (subject, title, url, imageUrl, source, author, level, avgRating, agent) => dispatch( actions.addBooks(subject, title, url, imageUrl, source, author, level, avgRating, agent) ),

        onClearAddMessages: () => dispatch(actions.clearAddMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddResources);