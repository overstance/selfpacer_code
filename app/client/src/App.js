import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
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

import Profile from './containers/profile/Profile';
import ResourcePage from './containers/resourcepage/Resoucepage';
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



// import ScrollToTop from './hoc/ScrollToTop';

const Landing = () => <h2>
  Landing page component
</h2>

/* const AddResource = () => <h2>
  Add Resource Page
</h2> */

/* const Home = () => <h2>
  User Home. Welcome!
</h2> */

const NotFound = () => <h2>
  Resource Not Found!
</h2>

const graphicDesign = () => <h2>
 subject explore
</h2>

class App extends Component {

  componentDidMount() {
    this.props.onFetchUser();
    this.props.onFetchSubjects();
  }

  render() {
    let routes = (
        <Switch>
            <Route path="/explore/creative-writing" component={Writing} />
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
            <Route path="/accounting/:id" component={ResourcePage} />
            <Route path="/explore/accounting" component={Accounting} />       
            <Route path="/explore/graphic-design" component={graphicDesign} />                
            <Route path="/explore" exact component={ (props) => (
                <Explore timestamp={new Date().toString()} {...props} />
                )}  
            />
            <Route path="/reverify_email" component={ReverifyEmail} />
            <Route path="/email_verify/:token" component={EmailVerified} />
            <Route path="/reset/:token" component={ResetPassword} />
            <Route path="/forgot_password" component={ForgotPassword} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Landing} />
            <Redirect to="/" />
        </Switch>
    );

    if (this.props.isAuthenticated && this.props.user.active) {
      routes = (
          <Switch>
            <Route path="/explore/creative-writing" component={Writing} />
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
            <Route path="/create_collection" exact component={CreateNewCollection} />
            <Route path="/add_resource" exact component={AddResource} />
            <Route path="/accounting/:id" component={ResourcePage} />
            <Route path="/explore/accounting" component={Accounting} />
            <Route path="/admin_tools/confirm_resources" component={ConfirmResource} />
            <Route path="/admin_tools" component={AdminTools} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/pinned_collections" component={PinnedCollections} />
            <Route path="/all_shared_collections" component={AllSharedCollections} />
            <Route path="/shared_collections/:id" component={SharedCollection} />
            <Route path="/collections/:id" component={UserCollection} />
            <Route path="/collections" component={UserCollections} />
            <Route path="/profile" component={Profile} />
            <Route path="/explore" exact component={ (props) => (
              <Explore timestamp={new Date().toString()} {...props} />
              )} 
            />          
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Landing} />
            <Redirect to="/" />
          </Switch>
      );
    }


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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSubjects: () => dispatch( actions.fetchSubjects() ),
    onFetchUser: () => dispatch(actions.fetchUser()),
    // onFetchRecentlyViewed: (recentlyViewedArray) => dispatch(actions.fetchRecentlyViewed(recentlyViewedArray))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//<Redirect to="/" />