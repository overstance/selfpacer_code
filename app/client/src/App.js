import React, { Component } from 'react';
import { Route, Switch, /* Redirect */ withRouter } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Logout from './components/auth/Logout/Logout';
import Explore from './containers/explore/Explore';
import Facilitate from './containers/FacilitatorPage/Facilitate';
import Collections from './containers/CollectionsPage/Collections';
import UserCollection from './containers/CollectionPage/userCollection/UserCollection';
import SharedCollection from './containers/CollectionPage/sharedCollection/SharedCollection';
import UserAssets from './containers/userAssets/UserAssets';
import CreateNewCollection from './containers/createCollection/createCollection';
import Profile from './containers/profile/Profile';
import AdminTools from './containers/AdminPage/Admin';
import ConfirmResource from './containers/confirmResource/ConfirmResource';
import EditProfile from './containers/profile/editProfile/EditProfile';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import EmailVerified from './components/auth/Register/EmailVerified';
import ReverifyEmail from './components/auth/Register/ReverifyEmail/ReverifyEmail';
import SubjectPage from './containers/SubjectPage/SubjectPage'; 
import Blog from './containers/BlogHome/BlogHome';
import BlogPost from './containers/BlogPost/BlogPost';
import BlogSection from './containers/BlogSection/BlogSection';
import PopularBlogs from './containers/BlogSection/Popular';
import LatestBlogs from './containers/BlogSection/Latest';
import FacilitateApplicants from './containers/ViewFacilitateApplicants/FacilitateApplicants';
// import RichEditor from './components/RichEditor/RichEditor';
import ManageBlogDrafts from './containers/ManageBlogDrafts/ManageBlogDrafts';
import Conversation from './containers/Conversation/Conversation';

const Landing = () => <h2>
  Landing page component
</h2>

const Search = () => <h1>
  Search component
</h1>

const BlogSearch = () => <h1>
  Search component
</h1>

const NotFound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class App extends Component {

  componentDidMount() {
    this.props.onFetchUser();    
    this.props.onFetchSubjects();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/explore" exact component={ (props) => (<Explore timestamp={new Date().toString()} {...props} /> )}/> 
        <Route path="/search" component={Search} />
        <Route path="/blog_search" component={BlogSearch} />
        <Route path="/explore/:subject_title" component={SubjectPage} /> 
        <Route exact path="/reverify_email" component={ReverifyEmail} />
        <Route exact path="/email_verify/:token" component={EmailVerified} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route exact path="/forgot_password" component={ForgotPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/" component={Landing} />
        <Route path='/blog' exact component={Blog} />
        <Route path='/blog/sections/:category' exact component={BlogSection} />
        <Route path='/blog/popular_blogposts' exact component={PopularBlogs} />
        <Route path='/blog/latest_blogposts' exact component={LatestBlogs} />
        <Route path='/blog/:publishYear/:publishMonth/:publishDay/:slug' component={BlogPost} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/shared_collections/:id" component={SharedCollection} />

        <PrivateRoute exact path="/collections/:id" component={UserCollection} />
        <PrivateRoute exact path="/facilitate" component={Facilitate} />
        <PrivateRoute exact path="/facilitate/conversations/:id" component={Conversation} />
        <PrivateRoute exact path="/create_collection" component={CreateNewCollection} />
        <PrivateRoute exact path="/admin_tools/confirm_resources" component={ConfirmResource} />
        <PrivateRoute exact path="/admin_tools" component={AdminTools} />      
        <PrivateRoute exact path="/profile/edit" component={EditProfile} />
        <PrivateRoute exact path="/manage_assets" component={UserAssets} />
        <PrivateRoute exact path="/facilitate_applicants" component={FacilitateApplicants} />
        <PrivateRoute exact path="/profile" component={Profile} />        
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/blog_drafts" component={ManageBlogDrafts} />

        <Route component={NotFound} />
      </Switch>
    );

    return (
      <Layout pageType={this.props.pageType}>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    userName: state.auth.user.name,
    userId: state.auth.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSubjects: () => dispatch( actions.fetchSubjects() ),
    onFetchUser: () => dispatch(actions.fetchUser()),
    onSetAuthentication: () => dispatch(actions.setAuthentication()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
