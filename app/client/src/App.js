import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Landing = () => <h2>
  Landing page component
</h2>

const CurrentUser = () => <h2>
  You have reach user page
</h2>

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/api/current_user" component={CurrentUser}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}


export default connect(null, actions)(App);
