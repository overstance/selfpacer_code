import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UserInterface/Spinner/Spinner';
import classes from './Resourcepage.css';
// import AuthBackdrop from '../../components/UserInterface/Backdrop/AuthBackdrop';
import Grid from '../../components/UserInterface/Grid/Grid';
import Button from '../../components/UserInterface/Button/Button';

class Resourcepage extends Component {

    componentDidMount() {
        if (this.props.match.params.id) {
          this.props.onFetchResourceById(this.props.match.params.id, this.props.platform);
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.clickedResource._id === null && this.props.resource.loading) {
          this.props.history.push('/not-found');
        }
      }

    render() {

        let content = 
        <Spinner isComponent/>

        if (this.props.clickedResource.type === 'youtube#playlist' && !this.props.loading ) {
            content = 
            <div className={classes.Container}>
                <div className={classes.Title}>{this.props.clickedResource.title}</div>
                <div className={classes.Wrapper}>            
                    <div><img className={classes.Image} src={this.props.clickedResource.img} alt='resource'/></div>
                    <div>
                        <div className={classes.Type}>Type:<span>{this.props.clickedResource.type}</span></div>
                    </div>
                    <div>
                        <div className={classes.Type}>Video Count:<span>{this.props.clickedResource.videoCount}</span></div>
                    </div>
                    <div>
                        <div className={classes.Type}>Source:<span>{this.props.clickedResource.source}</span></div>
                    </div>
                    <div>
                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>Collect</span>
                            <span className={classes.FeedBackIconCollect}></span>
                        </div>
                    </div>   
                    <a
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href={this.props.clickedResource.link} 
                    >
                        <Button btnType='Success'>View</Button>
                    </a>  
                </div>
            </div>
        };

        if (this.props.clickedResource.type === 'youtube#video' && !this.props.loading ) {
            content = 
            <div className={classes.Container}>
                <div className={classes.Title}>{this.props.clickedResource.title}</div>
                <div className={classes.Wrapper}>
                    <div><img className={classes.Image} src={this.props.clickedResource.img} alt='resource'/></div>
                    <div>
                        <div className={classes.Type}>Published:<span>{this.props.clickedResource.publishDate}</span></div>
                    </div> 
                    <div>
                        <div className={classes.Type}>Type:<span>{this.props.clickedResource.type}</span></div>
                    </div> 
                    <div>
                        <div className={classes.Type}>Youtube Views:<span>{this.props.clickedResource.youtubeviews}</span></div>
                    </div>
                    <div>
                        <div className={classes.Type}>Youtube likes:<span>{this.props.clickedResource.youtubelikes}</span></div>
                    </div>
                    <div>
                        <div className={classes.Type}>Source:<span>{this.props.clickedResource.source}</span></div>
                    </div>
                    <div>
                        <div className={classes.Options}>
                            <span className={classes.FeedbackText}>Collect</span>
                            <span className={classes.FeedBackIconCollect}></span>
                        </div>
                    </div>   
                    <a
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href={this.props.clickedResource.link} 
                    >
                        <Button btnType='Success'>View</Button>
                    </a>  
                </div>
            </div>
            
        };

        return (
            <Grid>
               {content}
            </Grid>  
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.accounting.loading,
        clickedResource: state.accounting.clickedResource,
        platform: state.accounting.clickedResourcePlatform
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchResourceById: ( id, platform ) => dispatch( actions.fetchResourceById( id, platform ) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resourcepage);