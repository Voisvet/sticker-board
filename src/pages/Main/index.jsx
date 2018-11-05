import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Elements of interface
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Pages
import CreateAdminPage from './CreateAdminPage';
import EditAdminPage from './EditAdminPage';
import ListAdminPage from './ListAdminPage';

import CreateMessagePage from './CreateMessagePage';
import ListMessagePage from './ListMessagePage';

import ListImagePage from './ListImagePage';

// Buttons for app bar
import MainAppBarButtons from './AppBarButtons';
import ListMessageAppBarButtons from './ListMessagePage/AppBarButtons';
import ListAdminAppBarButtons from './ListAdminPage/AppBarButtons';

// Actions for store
import * as messagesActions from '../../store/messages/actions';
import * as adminsActions from '../../store/admins/actions';
import * as imagesActions from '../../store/rekognition/actions';

// Selectors for user part of store
import * as userSelectors from '../../store/user/reducer';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = {
  app: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  body: {
    margin: '16px',
  },
};

// --------------------------------------------------
//
//  Component section
//
// --------------------------------------------------

class Main extends React.Component {
  constructor(props) {
    super(props);

    console.log(1);
    // Get data from server at the initialization
    if (this.props.token) {
      props.dispatch(adminsActions.fetchListOfAdmins());
      props.dispatch(messagesActions.fetchListOfMessages());
      props.dispatch(imagesActions.fetchListOfImages());
    }
  }

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }

    const { classes } = this.props;

    // Parse URL
    let url = new URL(window.location.href);

    // Render back button if url is not root url
    let backArrow = url.pathname == '/app' ? '' : (
      <IconButton
      className={classes.menuButton}
      onClick={ () => this.props.history.goBack() }
      color="inherit"
      aria-label="Back"
      >
      <ArrowBackIcon />
      </IconButton>
    );

    // Render all the other buttons
    let buttons = (
      <Switch>
        <Route exact path='/app' component={MainAppBarButtons} />
        <Route exact path='/app/admins' component={ListAdminAppBarButtons} />
        <Route exact path='/app/messages' component={ListMessageAppBarButtons} />
      </Switch>
    );

    return (
      <div className={classes.app}>
        <AppBar position="static">
          <Toolbar>
            { backArrow }
            <Typography variant="h6" color="inherit" className={classes.grow}>
              TG Bot CP
            </Typography>
            {buttons}
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <Switch>
            <Route exact path='/app' component={ListMessagePage} />

            <Route exact path='/app/admins' component={ListAdminPage} />
            <Route path='/app/admins/create' component={CreateAdminPage} />
            <Route path='/app/admins/edit' component={EditAdminPage} />

            <Route exact path='/app/messages' component={ListMessagePage} />
            <Route path='/app/messages/create' component={CreateMessagePage} />

            <Route path='/app/images' component={ListImagePage} />
          </Switch>
        </div>
      </div>
    );
  };
}

// --------------------------------------------------
//
//  State-to-props mapping and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    token: userSelectors.getUserToken(state)
  };
}

const styledMain = withStyles(styles)(Main);
export default connect(mapStateToProps)(styledMain);
