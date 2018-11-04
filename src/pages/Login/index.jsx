import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import * as actions from '../../store/user/actions';
import * as selectors from '../../store/user/reducer';

class Login extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(actions.fetchTokenFromCookies());
  }

  render() {
    return this.props.token ? (
      <Redirect to="/app" />
    ) : (
      <div>
        <p>Hello from login</p>
        <Link to='/app'>Login</Link>
        <p>{this.props.token}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: selectors.getUserToken(state)
  };
};

export default connect(mapStateToProps)(Login);
