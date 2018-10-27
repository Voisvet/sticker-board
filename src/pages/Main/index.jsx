import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CreateAdminPage from './CreateAdminPage';
import EditAdminPage from './EditAdminPage';
import ListAdminPage from './ListAdminPage';

import CreateMessagePage from './CreateMessagePage';
import ListMessagePage from './ListMessagePage';

import ListImagePage from './ListImagePage';

import MainAppBarButtons from './AppBarButtons';
import ListMessageAppBarButtons from './ListMessagePage/AppBarButtons';
import ListAdminAppBarButtons from './ListAdminPage/AppBarButtons';

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

const Main = (props) => {
  const { classes } = props;

  // Parse URL
  let url = new URL(window.location.href);

  // Render back button if url is not root url
  let backArrow = url.pathname == '/app' ? '' : (
    <IconButton
      className={classes.menuButton}
      onClick={ () => props.history.goBack() }
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

export default withStyles(styles)(Main);
