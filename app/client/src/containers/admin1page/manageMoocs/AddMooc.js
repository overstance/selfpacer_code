import React, { Component } from 'react';
import classes from './AddMooc.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class AddMooc extends Component {

    componentDidMount() {
        this.props.onFetchSubjects();       
    }

    componentWillUnmount() {
        this.props.onClearAddMoocFeedbacks();
    }

    state = {
        fillError: null,
        subject: {
            value: '',
            elementType: 'select',
            elementConfig: {
                label: "select category",
                labelspan: '*'
            }, 
            validation: {
                required: true
            },
            valid: false,
            touched: false   
        },
        controls: {
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
                    labelspan: '*'
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
                    label: "image url"
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
                    labelspan: '*'
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
                    labelspan: '*'
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
                    labelspan: '*'
                },
                value: '', 
                validation: {
                    required: true,
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
                },
                value: '', 
                validation: {},
                valid: false,
                touched: false,
            },
            agent: {
                elementType: 'input',
                elementConfig: {
                    label: "agent",
                    labelspan: '*'
                },
                value: '', 
                validation: {
                    required: true
                },
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ controls: updatedControls, fillError: null });

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

    submitHandler = (event) => {
        event.preventDefault();

        if ( this.props.addMoocSucessInfo && (!this.state.controls.title.touched || !this.state.controls.url.touched)  ) {

            const updateControls = {
                ...this.state.controls,
                title: {
                    ...this.state.controls.title,
                    touched: true,
                    valid: false
                },
                url: {
                    ...this.state.controls.url,
                    touched: true,
                    valid: false
                }

            };
            this.setState({ controls: updateControls, fillError:'Add new resource' });

        } else if ( !this.state.subject.touched && this.state.subject.value === '' ) {

            const subjectUpdated = {
                ...this.state.subject,
                touched: true,
                valid: false
            }
            this.setState({ subject: subjectUpdated});

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.title.touched && this.state.controls.title.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                title: {
                    ...this.state.controls.title,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.url.touched && this.state.controls.url.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                url: {
                    ...this.state.controls.url,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.source.touched && this.state.controls.source.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                source: {
                    ...this.state.controls.source,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.videoCount.touched && this.state.controls.videoCount.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                videoCount: {
                    ...this.state.controls.videoCount,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.tutor.touched && this.state.controls.tutor.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                tutor: {
                    ...this.state.controls.tutor,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.enrollees.touched && this.state.controls.enrollees.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                enrollees: {
                    ...this.state.controls.enrollees,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.duration.touched && this.state.controls.duration.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                duration: {
                    ...this.state.controls.duration,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.level.touched && this.state.controls.level.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                level: {
                    ...this.state.controls.level,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else if (!this.state.controls.agent.touched && this.state.controls.agent.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                agent: {
                    ...this.state.controls.agent,
                    touched: true,
                    valid: false
                }
            };
            this.setState({ controls: updatedControls });

            this.setState({ fillError: 'Please fill all asterisked fields' });
        } else {

            // this.props.onClearAddMoocFeedbacks();

            this.props.onAddMooc(this.state.subject.value, this.state.controls.title.value, this.state.controls.url.value,
                this.state.controls.imageUrl.value, this.state.controls.source.value, this.state.controls.videoCount.value,
                this.state.controls.tutor.value, this.state.controls.enrollees.value, this.state.controls.duration.value,
                this.state.controls.level.value, this.state.controls.lastUpdated.value, this.state.controls.avgRating.value,
                this.state.controls.agent.value 
            );

            const updateControls = {
                ...this.state.controls,
                title: {
                    ...this.state.controls.title,
                    touched: false
                },
                url: {
                    ...this.state.controls.url,
                    touched: false
                }

            };
            this.setState({ controls: updateControls, fillError: null });
            
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

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        // let formAll = null;
        let registerInput = formElementsArray.map(formElement => (
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                // errorMessage={this.onValidationError(formElement.id)}
            />
        ));

        return (
            <div className={classes.ContainerItem}>
                <div className={classes.AdminAction}>ADD MOOC</div>
                <form 
                className={classes.Form}
                onSubmit={this.submitHandler}
                >
                    <div className={classes.FillError}>{this.state.fillError}</div>
                    <Input 
                    label={this.state.subject.elementConfig.label}
                    labelspan={this.state.subject.elementConfig.labelspan} 
                    value={this.state.subject.value}
                    elementType={this.state.subject.elementType}
                    invalid={!this.state.subject.valid}
                    shouldValidate={this.state.subject.validation}
                    touched={this.state.subject.touched}
                    elementConfig={this.elementConfig()}
                    changed={(event) => this.subjectChangedHandler(event)}
                    />
                    {registerInput}
                    { (!this.state.controls.title.valid && this.state.controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.controls.url.valid && this.state.controls.url.touched)  || (!this.state.controls.source.valid && this.state.controls.source.touched) || (!this.state.controls.videoCount.valid && this.state.controls.videoCount.touched) || (!this.state.controls.tutor.valid && this.state.controls.tutor.touched) || (!this.state.controls.enrollees.valid && this.state.controls.enrollees.touched) || (!this.state.controls.duration.valid && this.state.controls.duration.touched) || (!this.state.controls.level.valid && this.state.controls.level.touched) || (!this.state.controls.agent.valid && this.state.controls.agent.touched) || this.state.fillError ? 
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
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    addMoocSucessInfo: state.admin1.addMoocSucessInfo,
    addMoocError: state.admin1.addMoocError,
    // user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onClearAddMoocFeedbacks: () => dispatch( actions.clearAddMoocFeedbacks()),
        onAddMooc: (subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, agent) => dispatch( actions.addMooc(subject, title, url, imageUrl, source, videoCount, tutor, enrollees, duration, level, lastUpdated, avgRating, agent) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddMooc);