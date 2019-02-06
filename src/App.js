import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './pages/Login';
import Main from './pages/Main';
import ErrorSnackBar from './ErrorSnackBar';

import * as actions from './store/user/actions';

class App extends Component {
  constructor(props) {
    super(props);
    props.dispatch(actions.fetchTokenFromCookies());
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/app' component={Main} />
            <Route render={() => (<Redirect to="/app" />)} />
          </Switch>
        </BrowserRouter>
        <ErrorSnackBar />
      </div>
    );
  };
}

export default connect()(App);
