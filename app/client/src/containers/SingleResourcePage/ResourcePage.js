import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './ResourcePage.module.css';
import Resource from '../../components/Resource/Resource';
import Dialogue from '../../components/Dialogues/Dialogue/Dialogue';
import AddToCollection from '../../components/Dialogues/addToCollection/addToCollection';
// import AuthBackdrop from '../../components/UserInterface/Backdrop/AuthBackdrop';
import Grid from '../../components/UserInterface/Grid/Grid';
import { Link } from 'react-router-dom';
import Input from '../../components/UserInterface/Input/Input';
import Button from '../../components/UserInterface/Button/Button';
import AjaxDialogueMessage from '../../components/Dialogues/Dialogue/AjaxDialogueMessage/AjaxDialogueMessage';
import PostActionInfo from '../../components/PostActionInfo/PostActionInfo';
import Form from '../../components/UserInterface/Form/Form';
// import Button from '../../components/UserInterface/Button/Button';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Resourcepage extends Component {

    state = {
        AuthenticateToCollectOrAdd: false,
        showAuthRequiredModal: false,
        showCollectionModal: false,
        
        // asset owner or admin local state
        fillError: null,
        assetToUpdateType: null,
        assetToUpdateId: null,

        resourceToDeleteTitle: null,
        resourceToDeleteId: null,

        showUpdateDialogue: false,

        showDeleteDialogue: false,

        youtubeActive: false,
        moocActive: false,
        allActive: true,
        booksActive: false,
        activeContent: 'all',

        pageIndex: 0,

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
                    label: "last Updated",
                    labelspan:'(mm/yyyy)'
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

    componentDidUpdate(prevProps) {
        if (this.props.match.params.resource_id !== prevProps.match.params.resource_id) {
            this.props.onFetchResourceById(this.props.match.params.resource_id, this.props.userId, this.props.useTypeContext); 
        }

        if (this.props.match.params.resource_category !== prevProps.match.params.resource_category) {
            this.props.onFetchSubjectResources(this.props.match.params.resource_category, 0);
        }

        if (prevProps.userAssets !== this.props.userAssets && prevProps.userAssets.length === 1 && this.props.userAssets.length === 0) {
            this.props.history.goBack();
            this.props.onClearUpdateAssetMessages();
        }

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

    componentDidMount() {
        this.props.onFetchResourceById(this.props.match.params.resource_id, this.props.userId, this.props.useTypeContext );
        this.props.onFetchSubjectResources(this.props.match.params.resource_category, 0);
    }

    componentWillUnmount() {
        this.props.onClearFetchResouceByIdMessages();
    }

    resourceClickedHandler = ( platform, id, views ) => {
        this.props.onSetClickedPlatform( platform );
        this.props.onIncreaseResourceViewCount( id, views);

        if (this.props.isAuthenticated) {
           
            const checkViewed = this.props.settedUserRecentlyViewed.filter(resource => resource === id);

            if (checkViewed.length === 0) {
                this.props.onUpdateRecentlyViewed(id, this.props.settedUserRecentlyViewed, this.props.userId);
            }           
        }        
    };

    likeHandler = (id, likes) => {
        this.props.onSetLikedResource( id );
        this.props.onResourceLiked(id, likes);


        if (this.props.isAuthenticated) {
            this.props.onUpdateUserLikeCount( this.props.userId, this.props.userLikeCount );        
        }    
    }

    collectHandler = ( id, image, title ) => {
        if (!this.props.isAuthenticated) {
            this.setState({ AuthenticateToCollectOrAdd: true, showAuthRequiredModal: true});
        } 

        if (this.props.isAuthenticated) {
            this.props.onSetToCollectResource(id, image, title);
            this.props.onFetchUserCollections(this.props.userId);
            this.setState({ showCollectionModal: true });
        }
    }

    collectAuthDialogueCloseHandler = () => {
        this.setState({ showAuthRequiredModal: false, AuthenticateToCollectOrAdd: false });
    }

    collectModalCloseHandler = () => {
        this.setState({ showCollectionModal: false });
        this.props.onClearAddToCollectionMessages();
    }

    // admin or asset owner functions

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

    deleteResourceHandler = ( resourceId, resourceTitle ) => {
        // console.log(lastEdited);
        this.setState({ resourceToDeleteTitle: resourceTitle, resourceToDeleteId: resourceId, showDeleteDialogue: true});   
    }

    confirmDelete = () => {
        this.props.onDeleteAsset(this.state.resourceToDeleteId, this.props.userAssets);   
    }

    closeUpdateDialogue = () => {
        this.setState({ showUpdateDialogue: false, fillError: null});
        this.props.onClearUpdateAssetMessages();
    }

    closeDeleteDialogue = () => {
        this.setState({ showDeleteDialogue: false});
        this.props.onClearUpdateAssetMessages();
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
                    this.state.assetToUpdateId, 
                    this.props.userAssets 
                );

                const updated = {
                    ...this.state.mooc_controls,
                    videoCount: {
                        ...this.state.mooc_controls.videoCount,
                        touched: false
                    },
                    enrollees: {
                        ...this.state.mooc_controls.enrollees,
                        touched: false
                    },
                    duration: {
                        ...this.state.mooc_controls.duration,
                        touched: false
                    },
                    level: {
                        ...this.state.mooc_controls.level,
                        touched: false
                    },
                    lastUpdated: {
                        ...this.state.mooc_controls.lastUpdated,
                        touched: false
                    },
                    avgRating: {
                        ...this.state.mooc_controls.avgRating,
                        touched: false
                    }
                };

                this.setState({mooc_controls: updated, fillError: null });
                // console.log('all conditioned fulfilled')
                
            }
     
        }

        if (this.state.assetToUpdateType === 'books') {

            if (!this.state.book_controls.level.touched && !this.state.book_controls.avgRating.touched) {

                this.setState({ fillError: 'no edit was made'});

            } else {
    
                this.props.onUpdateBookAsset(this.state.book_controls.level.value, this.state.book_controls.avgRating.value, this.props.userId, this.state.assetToUpdateId, this.props.userAssets );

                const updated = {
                    ...this.state.book_controls,
                    level: {
                        ...this.state.book_controls.level,
                        touched: false
                    },
                    avgRating: {
                        ...this.state.book_controls.avgRating,
                        touched: false
                    }
                }
                
                this.setState({book_controls: updated, fillError: null }); 
                // console.log('books all condition fulfilled');   
            }
        }
        
    }

    updateResourceHandler = ( resourceId, type, duration, enrollees, level, avgRating, videoCount, lastUpdated, source, youtubeId ) => {
        
        if (source === 'youtube.com') {
            this.props.onUpdateYoutubeAsset(resourceId, type, youtubeId, this.props.userAssets);
        } else {
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
            this.setState({ assetToUpdateType: type, assetToUpdateId: resourceId, showUpdateDialogue: true});
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

        }
    }

    render() {

        let fetchedResource;
        let relatedResources;
        let subject_title = this.props.match.params.resource_category;
        let adminOverride = false;

        if (this.props.fetchResourceByIdLoading) {
            fetchedResource = 
            <Spinner isComponent/>
        }

        if (!this.props.fetchRelatedResourcesLoading && this.props.relatedResources.length > 0) {
            let filteredRelated = this.props.relatedResources.filter(resource => resource._id !== this.props.match.params.resource_id );
            relatedResources =
            filteredRelated.map((resource, i) => (
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
                clicked={() => this.resourceClickedHandler(resource.type, resource._id, resource.views)}
                likeclicked={() => this.likeHandler( resource._id, resource.likes/* , resource.img, resource.link, resource.title */ )}
                collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
            />
            ))
        }

        if (!this.props.fetchResourceByIdLoading && this.props.fetchedResource ) {
            if( this.props.userAssets.length === 1 
                && (    this.props.fetchedResource.user_id === this.props.userId
                        || (this.props.user.accountType === 'Administrator' && this.props.user.isAssetManager)
                        || this.props.user.accountType === 'Senior Administrator'
                        || this.props.user.accountType === 'Head Administrator'
                    )) {
                fetchedResource = this.props.userAssets.map((resource, i) => (
                    <Resource
                        isAsset 
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
                        category={resource.category}
                        type={resource.type}
                        videoCount={resource.videoCount}
                        likeCount={numberWithCommas(resource.likes)}
                        collectCount={numberWithCommas(resource.collectCount)}
                        viewCount={numberWithCommas(resource.views)}
                        updateClicked={() => this.updateResourceHandler( resource._id, resource.type, resource.duration, resource.enrollees, resource.level, resource.avgRating, resource.videoCount, resource.lastUpdated, resource.source, resource.youtubeId )}
                        deleteClicked={() => this.deleteResourceHandler( resource._id, resource.title )}
                        dateAdded={new Date(resource.dateAdded).toLocaleDateString()}
                        lastEdited={resource.lastEdited}
                    />
                ))

                if (this.props.fetchedResource.user_id !== this.props.userId 
                    &&( (this.props.user.accountType === 'Administrator' && this.props.user.isAssetManager)
                        || this.props.user.accountType === 'Senior Administrator'
                        || this.props.user.accountType === 'Head Administrator'
                    )
                ) {
                    adminOverride = true;
                }
            } else {    
                let resource = this.props.fetchedResource;
                fetchedResource = 
                <Resource
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
                    clicked={() => this.resourceClickedHandler(resource.type, resource._id, resource.views)}
                    likeclicked={() => this.likeHandler( resource._id, resource.likes/* , resource.img, resource.link, resource.title */ )}
                    collectclicked={() => this.collectHandler( resource._id, resource.img, resource.title )}
                />
            }         
        } else if (!this.props.fetchResourceByIdLoading && this.props.fetchResourceByIdError) {
            fetchedResource =
            <PostActionInfo isFailed>
                {this.props.fetchResourceByIdError}
            </PostActionInfo>
        }

        let updateForm;

        let addMoocButtonText = 'submit';
        if(this.props.updateAssetLoading) {
            addMoocButtonText = <Spinner isButton/>;
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
            <Form
            submitForm={this.submitResourceHandler}
            >
                <div className={classes.FillError}>{this.state.fillError}</div>
                {moocInputs}
                { (!this.state.mooc_controls.videoCount.valid && this.state.mooc_controls.videoCount.touched) || (!this.state.mooc_controls.enrollees.valid && this.state.mooc_controls.enrollees.touched) || (!this.state.mooc_controls.duration.valid && this.state.mooc_controls.duration.touched) || (!this.state.mooc_controls.level.valid && this.state.mooc_controls.level.touched) || this.state.fillError ? 
                    <Button btnType='Danger' disabled> {addMoocButtonText} </Button> :
                    <Button btnType='Success'> {addMoocButtonText} </Button>    
                }
            </Form>
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
            addBooksButtonText = <Spinner isButton/>;
        }

        if (this.state.assetToUpdateType === 'books') {
            updateForm =
            <Form
            submitForm={this.submitResourceHandler}
            >
                <div className={classes.FillError}>{this.state.fillError}</div>
                {bookInputs}
                {  this.state.fillError ? 
                    <Button btnType='Danger' disabled> {addBooksButtonText} </Button> :
                    <Button btnType='Success'> {addBooksButtonText} </Button>    
                }
            </Form>
        }

        if (!this.props.updateAssetLoading && this.props.updateAssetSuccessInfo) {
            updateForm =
            <PostActionInfo isSuccess>
                {this.props.updateAssetSuccessInfo}
            </PostActionInfo>
            
        } else if (!this.props.updateAssetLoading && this.props.updateAssetError) {
            updateForm =
            <PostActionInfo isFailed>
                {'Error: ' + this.props.updateAssetError}
            </PostActionInfo>
        }

        let deleteForm = 
        <AjaxDialogueMessage 
        isDelete
        action='delete'
        resourceTitle={this.state.resourceToDeleteTitle}
        cancel={this.closeDeleteDialogue}
        confirm={this.confirmDelete}
        />

        if (this.props.deleteAssetLoading) {
            deleteForm =
            <Spinner isDialogue/>
        }

        if ( this.props.deleteAssetSuccessInfo && !this.props.deleteAssetLoading) {
            deleteForm =
            <PostActionInfo isSuccess>
                {this.props.deleteAssetSuccessInfo}
            </PostActionInfo>
        } else if ( this.props.deleteAssetError && !this.props.deleteAssetLoading ) {
            deleteForm =
            <PostActionInfo isFailed>
                {'Error: ' + this.props.deleteAssetError}
            </PostActionInfo>   
        }

        return (
            <Grid>
                <div className={classes.fetchedResource}>
                    {fetchedResource}
                    {adminOverride && <div className={classes.adminActionAlert}><span>Admin action on user asset!</span></div>}
                </div>
                <div className={classes.relatedResources}>
                    <div className={classes.relatedResourcesHeading}>Related Resources</div>
                    {relatedResources}
                    { this.props.relatedResources.length >= 10 ?
                        <Link to={`/skills/${subject_title}`} className={classes.SeeAll} >
                           see all
                        </Link>
                        : null

                    }
                </div>
                {this.state.AuthenticateToCollectOrAdd ? 
                    <Dialogue
                    isAuthenticate 
                    showDialogue={this.state.showAuthRequiredModal}
                    closeDialogue={this.collectAuthDialogueCloseHandler}
                    />: null
                }
                <AddToCollection 
                showDialogue={this.state.showCollectionModal}
                closeDialogue={this.collectModalCloseHandler} 
                closeModal={this.collectModalCloseHandler}
                />
                <Dialogue
                isUpdateAsset
                closeDialogue={this.closeUpdateDialogue}
                showDialogue={this.state.showUpdateDialogue}
                >
                    <div className={classes.DialogueMessage}>
                        {updateForm}  
                    </div>
                </Dialogue>
                <Dialogue
                isDeleteAsset
                closeDialogue={this.closeDeleteDialogue}
                showDialogue={this.state.showDeleteDialogue}
                >
                    {deleteForm}
                </Dialogue>
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userId: state.auth.user._id,
        useTypeContext: state.auth.useTypeContext,

        user: state.auth.user,
        settedUserRecentlyViewed: state.resource.userRecentlyViewed,
        userLikeCount: state.auth.userLikeCount,

        fetchResourceByIdLoading: state.resource.fetchResourceByIdLoading,
        fetchResourceByIdError: state.resource.fetchResourceByIdError,
        fetchedResource: state.resource.fetchedResource,

        relatedResources: state.clickedSubject.allResources,
        fetchRelatedResourcesLoading: state.clickedSubject.allLoading,
        fetchRelatedResourcesError: state.clickedSubject.fetchAllResourcesError,

        // admin or asset owner state
        userAssets: state.resource.userAssets,
        assetToUpdateFields: state.resource.assetToUpdateFields,
        updateAssetLoading: state.resource.updateAssetLoading,
        updateAssetSuccessInfo: state.resource.updateAssetSuccessInfo,
        updateAssetError: state.resource.updateAssetError,

        deleteAssetLoading: state.resource.deleteAssetLoading,
        deleteAssetSuccessInfo: state.resource.deleteAssetSuccessInfo,
        deleteAssetError: state.resource.deleteAssetError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearFetchResouceByIdMessages: () => dispatch(actions.clearFetchResouceByIdMessages()),
        onSetToCollectResource: ( resourceId, image, title ) => dispatch ( actions.setToCollectResource( resourceId, image, title )),
        onSetLikedResource: ( id ) => dispatch ( actions.setLikedResource( id )),
        onClearAddToCollectionMessages: () => dispatch(actions.clearAddToCollectionMessages()),
        onFetchUserCollections: ( userId ) => dispatch(actions.fetchUserCollections( userId )),
        onUpdateUserLikeCount: ( userId, userLikeCount ) => dispatch(actions.updateUserLikeCount( userId, userLikeCount )),
        onUpdateRecentlyViewed: (id, viewedResources, userId) => dispatch( actions.updateUserRecentlyViewed(id, viewedResources, userId)),
        onResourceLiked: ( id, likes ) => dispatch ( actions.resourceLiked( id, likes )),
        onIncreaseResourceViewCount: ( id, views ) => dispatch( actions.increaseResourceViewCount( id, views )),   
        onSetClickedPlatform: ( platform ) => dispatch ( actions.setClickedPlatform( platform ) ),
        onFetchResourceById: (id, userId, useTypeContext) => dispatch( actions.fetchResourceById(id, userId, useTypeContext) ),
        onFetchSubjectResources: (subject_title, pageIndex) => dispatch( actions.fetchSubjectResources(subject_title, pageIndex)),

        // admin or asset owner actions
        onUpdateYoutubeAsset: (resourceId, type, youtubeId, assets) => dispatch(actions.updateYoutubeAsset(resourceId, type, youtubeId, assets)),
        onSetAssetToUpdateField: (assetToUpdateFields ) => dispatch(actions.setAssetToUpdateField(assetToUpdateFields)),
        onUpdateMoocAsset: (videoCount, enrollees, duration, level, lastUpdated, avgRating, agent, resourceId, assets) => dispatch( actions.updateMoocAsset(videoCount, enrollees, duration, level, lastUpdated, avgRating, agent, resourceId, assets) ),
        onUpdateBookAsset: (level, avgRating, agent, resourceId, assets) => dispatch( actions.updateBookAsset(level, avgRating, agent, resourceId, assets) ),
        onDeleteAsset: (resourceId, userAssets) => dispatch(actions.deleteAsset(resourceId, userAssets)),
        onClearUpdateAssetMessages: () => dispatch(actions.clearUpdateAssetMessages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resourcepage);