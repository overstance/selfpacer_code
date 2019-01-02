import React, { Component } from 'react';
import classes from './AddBooks.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Input from '../../../components/UserInterface/Input/Input';
import Button from '../../../components/UserInterface/Button/Button';

class AddBooks extends Component {

    /* componentDidMount() {
        this.props.onFetchSubjects();       
    } */

    componentWillUnmount() {
        this.props.onClearAddBooksFeedbacks();
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
                    label: "resource url",
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

        if ( this.props.addBooksSucessInfo && !this.state.subject.touched ) {

            const updatedSubject = {
                ...this.state.subject,
                touched: true,
                valid: false
            };
            
            this.setState({ subject: updatedSubject, fillError:'Add new resource' });

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
        } else if (!this.state.controls.author.touched && this.state.controls.author.value === '' ) {
            const updatedControls = {
                ...this.state.controls,
                author: {
                    ...this.state.controls.author,
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

            // this.props.onClearAddBooksFeedbacks();

            this.props.onAddBooks(
                this.state.subject.value, this.state.controls.title.value, this.state.controls.url.value,
                this.state.controls.imageUrl.value, this.state.controls.source.value, this.state.controls.author.value,
                this.state.controls.level.value, this.state.controls.avgRating.value, this.state.controls.agent.value 
            );

            const updatedSubject = {
                ...this.state.subject,
                touched: false,
                value: ''
            }

            const updateControls = {
                ...this.state.controls,
                title: {
                    ...this.state.controls.title,
                    touched: false,
                    value: ''
                },
                url: {
                    ...this.state.controls.url,
                    touched: false,
                    value: ''
                },
                imageUrl: {
                    ...this.state.controls.imageUrl,
                    touched: false,
                    value: ''
                },
                source: {
                    ...this.state.controls.source,
                    touched: false,
                    value: ''
                },
                author: {
                    ...this.state.controls.author,
                    touched: false,
                    value: ''
                },
                level: {
                    ...this.state.controls.level,
                    touched: false,
                    value: ''
                },
                avgRating: {
                    ...this.state.controls.avgRating,
                    touched: false,
                    value: ''
                },
                agent: {
                    ...this.state.controls.agent,
                    touched: false,
                    value: ''
                }
            };
            this.setState({ controls: updateControls, subject: updatedSubject, fillError: null });    
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
                <div className={classes.AdminAction}>ADD BOOKS OR DOCS</div>
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
                    { (!this.state.controls.title.valid && this.state.controls.title.touched) || (!this.state.subject.valid && this.state.subject.touched) || (!this.state.controls.url.valid && this.state.controls.url.touched)  || (!this.state.controls.source.valid && this.state.controls.source.touched) || (!this.state.controls.author.valid && this.state.controls.author.touched) || (!this.state.controls.agent.valid && this.state.controls.agent.touched) || this.state.fillError ? 
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
            </div >                                 
        )
    }
};

const mapStateToProps = state => ({
    subjects: state.explore.subjects,
    addBooksSucessInfo: state.admin1.addBooksSucessInfo,
    addBooksError: state.admin1.addBooksError,
    // user: state.auth.user
});

const mapDispatchToProps = dispatch => {
    return {
        // onFetchSubjects: () => dispatch( actions.fetchSubjects()),
        onClearAddBooksFeedbacks: () => dispatch( actions.clearAddBooksFeedbacks()),
        onAddBooks: (subject, title, url, imageUrl, source, author, level, avgRating, agent) => dispatch( actions.addBooks(subject, title, url, imageUrl, source, author, level, avgRating, agent) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddBooks);