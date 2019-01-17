import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import Grid from '../../components/UserInterface/Grid/Grid';
import classes from './UserAssets.css';
import Resource from './userAsset/UserAsset';
import UpdateAssetDialogue from '../../components/Dialogues/updateAsset/updateAsset';
import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import ButtonSpinner from '../../components/UserInterface/ButtonSpinner/ButtonSpinner';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class ConfirmResource extends Component {
    
    componentDidMount() {
        this.props.onFetchUserAssets(this.props.userId);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.assetToUpdateFields !== prevProps.assetToUpdateFields) {

            const moocUpdated = {
                ...this.state.mooc_controls,
                videoCount: {
                    ...this.state.mooc_controls.videoCount,
                    value: this.props.assetToUpdateFields.videoCount
                },
                enrollees: {
                    ...this.state.mooc_controls.enrollees,
                    value: this.props.assetToUpdateFields.enrollees
                },
                duration: {
                    ...this.state.mooc_controls.duration,
                    value: this.props.assetToUpdateFields.duration
                },
                level: {
                    ...this.state.mooc_controls.level,
                    value: this.props.assetToUpdateFields.level
                },
                lastUpdated: {
                    ...this.state.mooc_controls.lastUpdated,
                    value: this.props.assetToUpdateFields.lastUpdated
                },
                avgRating: {
                    ...this.state.mooc_controls.avgRating,
                    value: this.props.assetToUpdateFields.avgRating
                }
            };

            const bookUpdated = {
                ...this.state.book_controls,
                level: {
                    ...this.state.book_controls.level,
                    value: this.props.assetToUpdateFields.level
                },
                avgRating: {
                    ...this.state.book_controls.avgRating,
                    value: this.props.assetToUpdateFields.avgRating
                }
            }

            this.setState({ mooc_controls: moocUpdated, book_controls: bookUpdated});
        }

    }

    state = {
        fillError: null,
        assetToUpdateType: null,
        assetToUpdateId: null,

        showUpdateDialogue: false,

        mooc_controls: {
            videoCount: {
                elementType: 'input',
                elementConfig: {
                    label: "video count",
                    labelspan: '(number with no commas)*'
                },
                value: this.props.assetToUpdateFields.videoCount, 
                validation: {
                    required: true,
                    isNumeric: true
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
                value: this.props.assetToUpdateFields.enrollees, 
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
                value: this.props.assetToUpdateFields.duration, 
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
                value: this.props.assetToUpdateFields.level,
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
                value: this.props.assetToUpdateFields.lastUpdated,
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
                value: this.props.assetToUpdateFields.avgRating, 
                validation: {},
                valid: false,
                touched: false,
            }
        },
        book_controls: {
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
                value: this.props.assetToUpdateFields.level,
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
                value: this.props.assetToUpdateFields.avgRating, 
                validation: {},
                valid: false,
                touched: false,
            }
        }
    }

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

    closeUpdateDialogue = () => {
        this.setState({ showUpdateDialogue: false, fillError: null});
        this.props.onClearUpdateAssetMessages();
    }

    updateResourceHandler = ( resourceId, type, duration, enrollees, level, avgRating, videoCount, lastUpdated ) => {
        
        let enrolleesCheckedAndParsed = enrollees;
        let checkedDuration = duration;
        let checkedVideoCount = videoCount;
        let checkedLevel = level;
        let checkedAvgRating = avgRating;
        let checkedLastUpdated = lastUpdated;

        if (level === undefined) {
            checkedLevel = ''
        }
        
        if (avgRating === undefined) {
            checkedAvgRating = ''
        }

        if (lastUpdated === undefined) {
            checkedLastUpdated = ''
        }

        if (videoCount === undefined) {
            checkedVideoCount = ''
        }

        if (duration === undefined) {
            checkedDuration = ''
        }

        if (enrollees === undefined) {
            enrolleesCheckedAndParsed = ''
        } else {
            enrolleesCheckedAndParsed = parseFloat(enrollees.replace(/,/g, ''));
        }
        this.setState({ assetToUpdateType: type, assetToUpdateId: resourceId, showUpdateDialogue: true}, () => { console.log(this.state.assetToUpdateId, this.state.assetToUpdateType);});
        this.props.onSetAssetToUpdateField(
            {
                duration: checkedDuration,
                enrollees: enrolleesCheckedAndParsed,
                videoCount: checkedVideoCount,
                level: checkedLevel,
                avgRating: checkedAvgRating,
                lastUpdated: checkedLastUpdated

            }
        );

        // this.props.onConfirmResource(resourceId)
    }

    deleteResourceHandler = ( resourceId ) => {
        this.props.onDeleteUnconfirmedResource(resourceId);    
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

    submitResourceHandler = (event) => {
        event.preventDefault();

        if (this.state.assetToUpdateType === 'mooc') {
            // console.log('submit mooc reached');

            if (!this.state.mooc_controls.videoCount.touched && 
                !this.state.mooc_controls.enrollees.touched && 
                !this.state.mooc_controls.duration.touched && 
                !this.state.mooc_controls.level.touched &&
                !this.state.mooc_controls.lastUpdated.touched &&
                !this.state.mooc_controls.avgRating.touched) {

                this.setState({ fillError: 'no edit was made'}, () => { console.log(this.state.fillError)});

            } else if (this.state.mooc_controls.videoCount.value === '') {
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
            } else if (this.state.mooc_controls.enrollees.value === '') {
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
            } else if (this.state.mooc_controls.duration.value === '') {
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
            } else if (this.state.mooc_controls.level.value === '' ) {
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
    
                this.props.onUpdateMoocAsset(
                    this.state.mooc_controls.videoCount.value,
                    this.state.mooc_controls.enrollees.value,
                    this.state.mooc_controls.duration.value,
                    this.state.mooc_controls.level.value, 
                    this.state.mooc_controls.lastUpdated.value, 
                    this.state.mooc_controls.avgRating.value,
                    this.props.userId,
                    this.state.assetToUpdateId 
                );
                this.setState({fillError: null });
                // console.log('all conditioned fulfilled')
                
            }
     
        }

        if (this.state.assetToUpdateType === 'books') {

            if (!this.state.book_controls.level.touched && !this.state.book_controls.avgRating.touched) {

                this.setState({ fillError: 'no edit was made'});

            } else {
    
                this.props.onUpdateBookAsset(this.state.book_controls.level.value, this.state.book_controls.avgRating.value, this.props.userId, this.state.assetToUpdateId );
                
                this.setState({fillError: null }); 
                // console.log('books all condition fulfilled');   
            }
        }
        
    }

    render() {
       
        let userAssets = 
        <div className={classes.Container}>
            <div className={classes.Spinner}><Spinner /></div>
        </div>

        if (!this.props.loading) {
            userAssets = this.props.userAssets.map( (resource, i) => (
                <Resource 
                key={i}
                id={resource._id} 
                link={resource.link}
                image={resource.img}
                title={resource.title}
                likes={resource.likes}
                lastUpdated={resource.lastUpdated}
                avgRating={resource.avgRating}
                tutor={resource.tutor}
                enrollees={resource.enrollees}
                duration={resource.duration}
                level={resource.level}
                author={resource.author}
                youtubeViews={resource.youtubeviews}
                publishDate={resource.publishDate}
                source={resource.source}
                type={resource.type}
                videoCount={resource.videoCount}
                likeCount={numberWithCommas(resource.likes)}
                collectCount={numberWithCommas(resource.collectCount)}
                viewCount={numberWithCommas(resource.views)}
                updateClicked={() => this.updateResourceHandler( resource._id, resource.type, resource.duration, resource.enrollees, resource.level, resource.avgRating, resource.videoCount, resource.lastUpdated )}
                deleteClicked={() => this.deleteResourceHandler( resource._id )}
                dateAdded={new Date(resource.dateAdded).toLocaleDateString()}
                />
            ));
        }
        
        if (!this.props.loading && this.props.userAssets.length === 0) {
            userAssets =
            <div className={classes.PostAddInfo}>
                <div>You have no added resources.</div>
            </div>
        }  

        let updateForm;

        let addMoocButtonText = 'submit';
        if(this.props.updateAssetLoading) {
            addMoocButtonText = <ButtonSpinner />;
        }

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
            />
        ));

        if (this.state.assetToUpdateType === 'mooc') {

            updateForm =
            <form 
            className={classes.Form}
            onSubmit={this.submitResourceHandler}
            >
                <div className={classes.FillError}>{this.state.fillError}</div>
                {moocInputs}
                { (!this.state.mooc_controls.videoCount.valid && this.state.mooc_controls.videoCount.touched) || (!this.state.mooc_controls.enrollees.valid && this.state.mooc_controls.enrollees.touched) || (!this.state.mooc_controls.duration.valid && this.state.mooc_controls.duration.touched) || (!this.state.mooc_controls.level.valid && this.state.mooc_controls.level.touched) || this.state.fillError ? 
                    <Button btnType='Danger' disabled> {addMoocButtonText} </Button> :
                    <Button btnType='Success'> {addMoocButtonText} </Button>    
                }
            </form>
        }

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
        if(this.props.updateAssetLoading) {
            addBooksButtonText = <ButtonSpinner />;
        }

        if (this.state.assetToUpdateType === 'books') {
            updateForm =
            <form 
            className={classes.Form}
            onSubmit={this.submitResourceHandler}
            >
                <div className={classes.FillError}>{this.state.fillError}</div>
                {bookInputs}
                {  this.state.fillError ? 
                    <Button btnType='Danger' disabled> {addBooksButtonText} </Button> :
                    <Button btnType='Success'> {addBooksButtonText} </Button>    
                }
            </form>
        }

        if (!this.props.updateAssetLoading && this.props.updateAssetSuccessInfo) {
            updateForm =
            <div className={classes.PostAddInfo}>
                <div>{this.props.updateAssetSuccessInfo}</div>
            </div>
        } else if (!this.props.updateAssetLoading && this.props.updateAssetError) {
            updateForm =
            <div className={classes.PostAddError}>
                <div>{'Error: ' + this.props.updateAssetError}</div>
            </div>
        }
        

        return (
            <Grid>
                <div style={{'paddingTop': '10px'}}>
                    {userAssets}
                </div>
                {
                    this.state.showUpdateDialogue ? 
                    <UpdateAssetDialogue
                    closeDialogue={this.closeUpdateDialogue}
                    showDialogue={this.state.showUpdateDialogue}
                    >
                        {updateForm}
                    </UpdateAssetDialogue>
                    : null
                }
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        userAssets: state.resource.userAssets,
        assetToUpdateFields: state.resource.assetToUpdateFields,
        updateAssetLoading: state.resource.updateAssetLoading,
        updateAssetSuccessInfo: state.resource.updateAssetSuccessInfo,
        updateAssetError: state.resource.updateAssetError,
        loading: state.resource.loading,
        userId: state.auth.user._id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserAssets: ( userId ) => dispatch(actions.fetchUserAssets( userId)),
        onSetAssetToUpdateField: (assetToUpdateFields ) => dispatch(actions.setAssetToUpdateField(assetToUpdateFields)),
        onUpdateMoocAsset: (videoCount, enrollees, duration, level, lastUpdated, avgRating, agent, resourceId) => dispatch( actions.updateMoocAsset(videoCount, enrollees, duration, level, lastUpdated, avgRating, agent, resourceId) ),
        onUpdateBookAsset: (level, avgRating, agent, resourceId) => dispatch( actions.updateBookAsset(level, avgRating, agent, resourceId) ),
        onClearUpdateAssetMessages: () => dispatch(actions.clearUpdateAssetMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmResource);