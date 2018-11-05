import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import * as actions from '../../store/user/actions';
import * as selectors from '../../store/user/reducer';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10%'
  },
  inputField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  loginButton: {
    marginTop: 24,
    width: 300
  }
})

// --------------------------------------------------
//
//  Component section
//
// --------------------------------------------------


class Login extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch(actions.fetchTokenFromCookies());
  }

  loginButtonOnClickHandler = () => {
    let login = document.getElementById('username-textfield').value;
    let password = document.getElementById('password-textfield').value;
    if (login.length > 0 && password.length > 0) {
      this.props.dispatch(actions.fetchTokenFromServer(login, password));
    } else {
      if (login.length <= 0) {
        console.log('Ай-яй-яй логин');
      }
      if (password.length <= 0) {
        console.log('Ай-яй-яй пароль');
      }
    }
  }

  render() {
    const { classes } = this.props;

    let errorMessage = this.props.errorMessage ? (
      <Typography variant="caption" color="inherit" color="secondary">
        {this.props.errorMessage}
      </Typography>
    ) : '';

    // If token exists, then user has already logged in,
    // then just redirect to the app part
    // In other case render login form
    return this.props.token ? (
      <Redirect to="/app" />
    ) : (
      <div className={classes.container}>
          <Typography variant="h6" color="inherit">
            TG Bot CP
          </Typography>
          {errorMessage}
          <TextField
            id="username-textfield"
            className={classes.inputField}
            label="Username"
            margin="normal"
          />
          <TextField
            id="password-textfield"
            className={classes.inputField}
            label="Password"
            type="password"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={this.loginButtonOnClickHandler}
          >
            Log In
          </Button>
      </div>
    );
  }
}

// --------------------------------------------------
//
//  State-to-props mapping and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    token: selectors.getUserToken(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

const styledLogin = withStyles(styles)(Login);
export default connect(mapStateToProps)(styledLogin);
