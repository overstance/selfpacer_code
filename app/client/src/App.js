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

import UserCollections from './containers/userCollections/UserCollections';
import UserCollection from './containers/userCollections/userCollection/UserCollection';
import SharedCollection from './containers/userCollections/sharedCollection/SharedCollection';
import AllSharedCollections from './containers/allSharedCollections/AllSharedCollections';
import PinnedCollections from './containers/pinnedCollection/PinnedCollections';
import UserAssets from './containers/userAssets/UserAssets';

import Profile from './containers/profile/Profile';
// import ResourcePage from './containers/resourcepage/Resoucepage';
import AddResource from './containers/addResource/addResource';
import CreateNewCollection from './containers/createCollection/createCollection';
import AdminTools from './containers/admin1page/Admin1';
import ConfirmResource from './containers/admin1page/confirmResource/ConfirmResource';
import EditProfile from './containers/profile/editProfile/EditProfile';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword/ResetPassword';
import EmailVerified from './components/auth/Register/EmailVerified';
import ReverifyEmail from './components/auth/Register/ReverifyEmail/ReverifyEmail';

import Accounting from './containers/Subjects/Accounting';
import Animation from './containers/Subjects/Animation';
import Architecture from './containers/Subjects/Architecture';
import Audio from './containers/Subjects/Audio';
import Beauty from './containers/Subjects/Beauty';
import Cloud from './containers/Subjects/Cloud';
import Communication from './containers/Subjects/Communication';
import Customer from './containers/Subjects/Customer';
import Data from './containers/Subjects/Data';
import Database from './containers/Subjects/Database';
import Drawing from './containers/Subjects/Drawing';
import Fashion from './containers/Subjects/Fashion';
import Food from './containers/Subjects/Food';
import Gamedesign from './containers/Subjects/Gamedesign';
import Gamedev from './containers/Subjects/Gamedev';
import Gaming from './containers/Subjects/Gaming';
import Graphics from './containers/Subjects/Graphics';
import Hardware from './containers/Subjects/Hardware';
import Home from './containers/Subjects/Home';
import Health from './containers/Subjects/Health';
import UserInterface from './containers/Subjects/UserInterface';
import Interior from './containers/Subjects/Interior';
import Management from './containers/Subjects/Management';
import Marketing from './containers/Subjects/Marketing';
import Mobile from './containers/Subjects/Mobile';
import Modesign from './containers/Subjects/Modesign';
import Music from './containers/Subjects/Music';
import Network from './containers/Subjects/Network';
import Painting from './containers/Subjects/Painting';
import PersonalDev from './containers/Subjects/PersonalDev';
import Pet from './containers/Subjects/Pet';
import Photography from './containers/Subjects/Photography';
import ProfDev from './containers/Subjects/ProfDev';
import RealEstate from './containers/Subjects/RealEstate';
import Software from './containers/Subjects/Software';
import StudySkill from './containers/Subjects/StudySkill';
import TeachingSkill from './containers/Subjects/TeachingSkill';
import Travel from './containers/Subjects/Travel';
import Video from './containers/Subjects/Video';
import WebDesign from './containers/Subjects/WebDesign';
import Webdev from './containers/Subjects/Webdev';
import Writing from './containers/Subjects/Writing';


import Blog from './containers/blog/Blog';
import BlogPost from './containers/blog/BlogPost';

const Landing = () => <h2>
  Landing page component
</h2>

const Search = () => <h1>
  Search component
</h1>

const NotFound = () => <h2>
  Resource Not Found!
</h2>

class App extends Component {

  componentDidMount() {

    this.props.onFetchUser();    
    this.props.onFetchSubjects();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/explore/writing" component={Writing} />
        <Route path="/explore/web-development" component={Webdev} />
        <Route path="/explore/web-design" component={WebDesign} />
        <Route path="/explore/video" component={Video} />
        <Route path="/explore/teaching-skills" component={TeachingSkill} />
        <Route path="/explore/travel" component={Travel} />
        <Route path="/explore/study-skills" component={StudySkill} />
        <Route path="/explore/software-development" component={Software} />
        <Route path="/explore/real-estate" component={RealEstate} />
        <Route path="/explore/professional-development" component={ProfDev} />
        <Route path="/explore/photography" component={Photography} />
        <Route path="/explore/pet-care" component={Pet} />
        <Route path="/explore/personal-development" component={PersonalDev} />
        <Route path="/explore/painting" component={Painting} />
        <Route path="/explore/networks-and-systems" component={Network} />
        <Route path="/explore/music" component={Music} />
        <Route path="/explore/motion-design-vfx" component={Modesign} />
        <Route path="/explore/mobile-development" component={Mobile} />
        <Route path="/explore/marketing-and-sales" component={Marketing} />
        <Route path="/explore/management" component={Management} />
        <Route path="/explore/interior-design" component={Interior} />
        <Route path="/explore/ui-ux" component={UserInterface} />
        <Route path="/explore/home-improvement" component={Home} />
        <Route path="/explore/health-and-Fitness" component={Health} />
        <Route path="/explore/hardware" component={Hardware} />
        <Route path="/explore/graphic-design" component={Graphics} />
        <Route path="/explore/gaming" component={Gaming} />
        <Route path="/explore/game-development" component={Gamedev} />
        <Route path="/explore/game-design" component={Gamedesign} />
        <Route path="/explore/food" component={Food} />
        <Route path="/explore/fashion-design" component={Fashion} />
        <Route path="/explore/drawing" component={Drawing} />
        <Route path="/explore/database" component={Database} />
        <Route path="/explore/data-science" component={Data} />
        <Route path="/explore/customer-service" component={Customer} />
        <Route path="/explore/communications" component={Communication} />
        <Route path="/explore/cloud-computing" component={Cloud} />
        <Route path="/explore/beauty" component={Beauty} />
        <Route path="/explore/audio-production" component={Audio} />
        <Route path="/explore/architectural-design" component={Architecture} />
        <Route path="/explore/animation" component={Animation} />            
        <Route path="/explore/accounting" component={Accounting} />}
        <Route path="/explore" exact component={ (props) => (
          <Explore timestamp={new Date().toString()} {...props} />
          )} 
        />  
        <Route exact path="/reverify_email" component={ReverifyEmail} />
        <Route exact path="/email_verify/:token" component={EmailVerified} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route exact path="/forgot_password" component={ForgotPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/" component={Landing} />
        <Route path='/blog/:page' exact component={Blog} />
        <Route path='/blog' exact component={Blog} />
        <Route path='/blog/posts/:post' component={BlogPost} />
        <PrivateRoute exact path="/create_collection" component={CreateNewCollection} />
        <PrivateRoute exact path="/add_resource" component={AddResource} />
        <PrivateRoute exact path="/admin_tools/confirm_resources" component={ConfirmResource} />
        <PrivateRoute exact path="/admin_tools" component={AdminTools} />
        <PrivateRoute exact path="/profile/edit" component={EditProfile} />
        <PrivateRoute exact path="/my_assets" component={UserAssets} />
        <PrivateRoute exact path="/pinned_collections" component={PinnedCollections} />
        <PrivateRoute exact path="/all_shared_collections" component={AllSharedCollections} />
        <PrivateRoute exact path="/shared_collections/:id" component={SharedCollection} />
        <PrivateRoute exact path="/collections/:id" component={UserCollection} />
        <PrivateRoute exact path="/collections" component={UserCollections} />
        <PrivateRoute exact path="/profile" component={Profile} />        
        <PrivateRoute exact path="/logout" component={Logout} />
      </Switch>
    );

    return (
      <Layout>
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
