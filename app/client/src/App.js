import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, /* Redirect */ withRouter } from 'react-router-dom';
import PrivateRoute from './containers/auth/PrivateRoute';
import Layout from './components/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import RouteLoading from './components/UserInterface/routeLoading/routeLoading';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Logout from './components/auth/Logout/Logout';
import CreateNewCollection from './containers/createCollection/createCollection';
import AdminTools from './containers/AdminPage/Admin';
import EditProfile from './containers/profile/editProfile/EditProfile';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import EmailVerified from './components/auth/Register/EmailVerified';
import ReverifyEmail from './components/auth/Register/ReverifyEmail/ReverifyEmail';
const Profile = lazy(() => import('./containers/profile/Profile'));
const HomePage = lazy(() => import('./containers/HomePage/Home'));
const Skills = lazy(() => import('./containers/skillsPage/Skills'));
const SubjectPage = lazy(() => import('./containers/SubjectPage/SubjectPage'));
const Blog = lazy(() => import('./containers/BlogHome/BlogHome'));
const BlogPost = lazy(() => import('./containers/BlogPost/BlogPost'));
const BlogSection = lazy(() => import('./containers/BlogSection/BlogSection'));
const Facilitate = lazy(() => import('./containers/FacilitatorPage/Facilitate'));
const Collections = lazy(() => import('./containers/CollectionsPage/Collections'));
const UserCollection = lazy(() => import('./containers/CollectionPage/userCollection/UserCollection'));
const SharedCollection = lazy(() => import('./containers/CollectionPage/sharedCollection/SharedCollection'));
const UserAssets = lazy(() => import('./containers/userAssets/UserAssets'));
const ConfirmResource = lazy(() => import('./containers/confirmResource/ConfirmResource'));
const PopularBlogs = lazy(() => import('./containers/BlogSection/Popular'));
const LatestBlogs = lazy(() => import('./containers/BlogSection/Latest'));
const UserSavedBlogs = lazy(() => import('./containers/BlogSection/saved'));
const FacilitateApplicants = lazy(() => import('./containers/ViewFacilitateApplicants/FacilitateApplicants'));
const ManageBlogDrafts = lazy(() => import('./containers/ManageBlogDrafts/ManageBlogDrafts'));
const Conversation = lazy(() => import('./containers/Conversation/Conversation'));
const ResourcePage = lazy(() => import('./containers/SingleResourcePage/ResourcePage'));
const ManageInspireText = lazy(() => import('./containers/manageInspireText/ManageInspireTexts'));
const ManageAbuseReports = lazy(() => import('./containers/manageAbuseReports/AbuseReports'));
const Explore = lazy(() => import('./containers/explore/Explore'));


const NotFound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class App extends Component {

  componentDidMount() {
    this.props.onFetchUser();    
    this.props.onFetchSubjects();
    this.props.onFetchInspireTexts();
  }

  render() {
    let routes = (
      <Suspense fallback={<RouteLoading />}>
        <Switch>
          <Route path="/skills" exact component={ (props) => (<Skills timestamp={new Date().toString()} {...props} /> )}/>
          <Route path="/skills/:subject_title" component={SubjectPage} /> 
          <Route exact path="/reverify_email" component={ReverifyEmail} />
          <Route exact path="/email_verify/:token" component={EmailVerified} />
          <Route exact path="/reset/:token" component={ResetPassword} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/" component={HomePage} />
          <Route exact path='/blog' component={Blog} />
          <Route path='/blog/sections/:category' exact component={BlogSection} />
          <Route path='/blog/popular_blogposts' exact component={PopularBlogs} />
          <Route path='/blog/latest_blogposts' exact component={LatestBlogs} />
          <Route path='/blog/:publishYear/:publishMonth/:publishDay/:slug' component={BlogPost} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/shared_collections/:id" component={SharedCollection} />
          <Route exact path="/resource/:resource_category/:resource_id" component={ResourcePage} />
          <Route exact path="/explore" component={Explore} />
          
          <PrivateRoute exact path="/blog/saved/:userId" component={UserSavedBlogs} />
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
          <PrivateRoute exact path="/manage_inspire_texts" component={ManageInspireText} />
          <PrivateRoute exact path="/manage_abuse_reports" component={ManageAbuseReports} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
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
    onFetchInspireTexts: () => dispatch(actions.fetchInspireTexts()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
