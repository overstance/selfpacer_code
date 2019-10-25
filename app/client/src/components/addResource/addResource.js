import React, { Component } from 'react';
import classes from './addResource.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../UserInterface/Input/Input';
import Button from '../UserInterface/Button/Button';
import Spinner from '../UserInterface/Spinner/Spinner';
// import Grid from '../UserInterface/Grid/Grid';
import Form from '../UserInterface/Form/Form';
import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
// import FormTitle from '../UserInterface/Form/FormTitle/FormTitle';
import FormFeedback from '../UserInterface/Form/FormFeedback/FormFeedback';

class AddResources extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();

        // console.log(this.props.activeSubject);
        // this.props.onFetchUser();
    } */

    componentWillUnmount() {
        this.props.onClearAddResourceMessages();
    }

    state = {
        fillError: null,
        subject: {
            value: this.props.activeSubjectTitle,
            label: "select category", 
            name: "subject",
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        type: {
            value: '',
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
                    label: "lecture count",
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
                    label: "enrollees/views",
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
                    label: "last Updated",
                    labelspan:'(mm/yyyy)'
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
                this.props.onAddYoutubePlaylist(this.state.youtubePlaylist.value, this.state.subject.value, this.props.user._id, this.props.user.accountType);
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
                this.props.onAddYoutubeVideo(this.state.youtubeVideo.value, this.state.subject.value, this.props.user._id, this.props.user.accountType);
                
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
                    this.props.user._id, this.props.user.accountType 
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
                    this.state.book_controls.level.value, this.state.book_controls.avgRating.value, this.props.user._id, this.props.user.accountType 
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
                this.props.onClearAddResourceMessages();
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
            this.props.onClearAddResourceMessages();
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

        if (!this.state.mooc_controls[controlName].validation.required && event.target.value === '') {
            // console.log('not required');
            const updated = {
                ...this.state.mooc_controls,
                [controlName]: {
                    ...this.state.mooc_controls[controlName],
                    value: event.target.value,
                    valid: true,
                    touched: true
                }
            };

            this.setState({ mooc_controls: updated, fillError: null });
        } else {
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
    }

    bookInputChangedHandler = (event, controlName) => {

        if (!this.state.book_controls[controlName].validation.required && event.target.value === '') {
            const updated = {
                ...this.state.book_controls,
                [controlName]: {
                    ...this.state.book_controls[controlName],
                    value: event.target.value,
                    valid: true,
                    touched: true
                }
            };
    
            this.setState({ book_controls: updated, fillError: null });
        } else {
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

        let platformSpecificForm = <div className={classes.Notype}>Please select resource type to continue.</div>
        
        let youtubePlaylistButtonText = 'submit';
        if(this.props.addYoutubePlaylistLoading) {
            youtubePlaylistButtonText = <Spinner isButton/>;
        }

        let youtubePlaylistForm = 
        <Form
        submitForm={this.submitResourceHandler}
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
                <FormFeedback isFailed>
                    {this.props.youtubePlaylistAddError}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.youtubePlaylistAddedFeedback}
                </FormFeedback> 
            }
        </Form>

        let youtubeVideoButtonText = 'submit';

        if(this.props.addYoutubeVideoLoading) {
            youtubeVideoButtonText = <Spinner isButton/>;
        }

        let youtubeVideoForm = 
        <Form
        submitForm={this.submitResourceHandler}
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
                <FormFeedback isFailed>
                    {this.props.youtubeVideoAddError}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.youtubeVideoAddedFeedback}
                </FormFeedback> 
            }
        </Form>

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
            addMoocButtonText = <Spinner isButton/>;
        }

        let moocForm =
        <Form
        submitForm={this.submitResourceHandler}
        >
            {moocInputs}
            { (!this.state.mooc_controls.title.valid && this.state.mooc_controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.mooc_controls.url.valid && this.state.mooc_controls.url.touched)  || (!this.state.mooc_controls.source.valid && this.state.mooc_controls.source.touched) || (!this.state.mooc_controls.videoCount.valid && this.state.mooc_controls.videoCount.touched) || (!this.state.mooc_controls.tutor.valid && this.state.mooc_controls.tutor.touched) || (!this.state.mooc_controls.enrollees.valid && this.state.mooc_controls.enrollees.touched) || (!this.state.mooc_controls.duration.valid && this.state.mooc_controls.duration.touched) || (!this.state.mooc_controls.level.valid && this.state.mooc_controls.level.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> {addMoocButtonText} </Button> :
                <Button btnType='Success'> {addMoocButtonText} </Button>    
            }
            { this.props.addMoocError ? 
                <FormFeedback isFailed>
                    {this.props.addMoocError}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.addMoocSucessInfo}
                </FormFeedback>
            }
        </Form>

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
            addBooksButtonText = <Spinner isButton/>;
        }

        let bookForm =
        <Form
        submitForm={this.submitResourceHandler}
        >
            {bookInputs}
            { (!this.state.book_controls.title.valid && this.state.book_controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.book_controls.url.valid && this.state.book_controls.url.touched)  || (!this.state.book_controls.source.valid && this.state.book_controls.source.touched) || (!this.state.book_controls.author.valid && this.state.book_controls.author.touched) || this.state.fillError ? 
                <Button btnType='Danger' disabled> {addBooksButtonText} </Button> :
                <Button btnType='Success'> {addBooksButtonText} </Button>    
            }
            { this.props.addBooksError ?
                <FormFeedback isFailed>
                    {this.props.addBooksError}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.addBooksSucessInfo}
                </FormFeedback>
            }
        </Form>


        

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
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
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
            <FormFeedback isFillError>
                {this.state.fillError}
            </FormFeedback>
            { this.props.error ? 
                <FormFeedback isFailed>
                    {this.props.error}
                </FormFeedback>
                :
                <FormFeedback isSuccess>
                    {this.props.successMessage}
                </FormFeedback>
            }
        </div>

        return (
            <div className={classes.ContentItems}>
                <div className={classes.ContainerItem}>
                    <FormTitle isAdmin>Add Resource</FormTitle>
                    {addForm}
                </div >
            </div>                                
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    user: state.auth.user,
    activeContentPage: state.explore.activeContentType,
    activeSubjectTitle: state.clickedSubject.clickedSubjectTitle,

    addYoutubePlaylistLoading: state.resource.addYoutubePlaylistLoading,
    youtubePlaylistAddedFeedback: state.resource.youtubePlaylistAddedFeedback,
    youtubePlaylistAddError: state.resource.addYoutubePlaylistError,

    addYoutubeVideoLoading: state.resource.addYoutubeVideoLoading,
    youtubeVideoAddedFeedback: state.resource.youtubeVideoAddedFeedback,
    youtubeVideoAddError: state.resource.addYoutubeVideoError,

    addMoocSucessInfo: state.resource.addMoocSucessInfo,
    addMoocError: state.resource.addMoocError,
    addMoocLoading: state.resource.addMoocLoading,

    addBooksSucessInfo: state.resource.addBooksSucessInfo,
    addBooksError: state.resource.addBooksError,
    addBooksLoading: state.resource.addBooksLoading,
});

const mapDispatchToProps = dispatch => {
    return {
        onAddYoutubePlaylist: (playlistId, subject, userId, userType) => dispatch( actions.addYoutubePlaylist(playlistId, subject, userId, userType)),
        onAddYoutubeVideo: (videoId, subject, userId, userType) => dispatch( actions.addYoutubeVideo(videoId, subject, userId, userType) ),
        onAddMooc: (subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, userId, userType) => dispatch( actions.addMooc(subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, userId, userType) ),
        onAddBooks: (subject, title, url, imageUrl, source, author, level, avgRating, userId, userType) => dispatch( actions.addBooks(subject, title, url, imageUrl, source, author, level, avgRating, userId, userType) ),

        onClearAddResourceMessages: () => dispatch(actions.clearAddResourceMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddResources);