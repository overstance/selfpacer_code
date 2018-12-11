import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Logout from './components/auth/Logout/Logout';
import Explore from './containers/explore/Explore';
import Accounting from './containers/Subjects/Accounting/Accounting';
import Profile from './containers/profile/Profile';
import ResourcePage from './containers/resourcepage/Resoucepage';
import AddResource from './containers/addResource/addResource';
import CreateNewCollection from './containers/createCollection/createCollection';
import AdminTools from './containers/admin1page/Admin1';
import EditProfile from './containers/profile/editProfile/EditProfile';
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
  }

  render() {
    let routes = (
        <Switch>
            <Route path="/accounting/:id" component={ResourcePage} />
            <Route path="/explore/accounting" component={Accounting} />       
            <Route path="/explore/graphic-design" component={graphicDesign} />                
            <Route path="/explore" exact component={ (props) => (
                <Explore timestamp={new Date().toString()} {...props} />
                )}  
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Landing} />
            <Redirect to="/" />
        </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/create_collection" exact component={CreateNewCollection} />
            <Route path="/add_resource" exact component={AddResource} />
            <Route path="/accounting/:id" component={ResourcePage} />
            <Route path="/explore/accounting" component={Accounting} />
            <Route path="/admin_tools" component={AdminTools} />
            <Route path="/profile/edit" component={EditProfile} />
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
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//<Redirect to="/" />