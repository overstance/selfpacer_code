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
//import Admin1Dev from './containers/admin1page/Admin1';


const Landing = () => <h2>
  Landing page component
</h2>

/* const Home = () => <h2>
  User Home. Welcome!
</h2> */

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
        <Route path="/explore/accounting" component={Accounting} />
        <Route path="/explore/graphic-design" component={graphicDesign} />                
        <Route path="/explore" component={ (props) => (
            <Explore timestamp={new Date().toString()} {...props} />
            )}  
        />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />       
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/explore/accounting" component={Accounting} />
          <Route path="/explore" component={ (props) => (
            <Explore timestamp={new Date().toString()} {...props} />
            )} 
          />
          
          <Route path="/logout" component={Logout} />
          <Route path="/profile" exact component={Profile} />
          <Redirect to="/profile" />
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