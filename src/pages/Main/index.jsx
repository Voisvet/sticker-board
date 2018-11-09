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
import ListAdminPage from './ListAdminPage';
import ListMessagePage from './ListMessagePage';
import ListImagePage from './ListImagePage';

// Buttons for app bar
import MainAppBarButtons from './AppBarButtons';

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
    padding: '16px',
  },
};

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

class Main extends React.Component {
  constructor(props) {
    super(props);

    // Get data from server at the initialization
    if (this.props.token) {
      props.dispatch(adminsActions.fetchListOfAdmins());
      props.dispatch(messagesActions.fetchListOfMessages());
      props.dispatch(imagesActions.fetchListOfImages());
      props.dispatch(messagesActions.fetchListOfChats());
    }
  }

  backArrowOnClickHandler = () => {
    this.props.history.goBack();
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }

    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <AppBar position="static">
          <Toolbar>
            <BackArrow
              clickHandler={ this.backArrowOnClickHandler }
              styleClass={ classes.menuButton }
            />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              TG Bot CP
            </Typography>
            <Switch>
              <Route exact path='/app' component={MainAppBarButtons} />
            </Switch>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <Switch>
            <Route exact path='/app' component={ListMessagePage} />
            <Route exact path='/app/admins' component={ListAdminPage} />
            <Route exact path='/app/messages' component={ListMessagePage} />
            <Route path='/app/images' component={ListImagePage} />
          </Switch>
        </div>
      </div>
    );
  };
}

// --------------------------------------------------
//
//  Sub-components section
//
// --------------------------------------------------

const BackArrow = (props) => {
  const { classes } = props;

  // Parse URL
  let url = new URL(window.location.href);

  // Render back button if url is not root url
  return url.pathname == '/app' ? '' : (
    <IconButton
    className={props.styleClass}
    onClick={ () => props.clickHandler() }
    color="inherit"
    aria-label="Back"
    >
    <ArrowBackIcon />
    </IconButton>
  );
}

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    token: userSelectors.getUserToken(state)
  };
}

const styledMain = withStyles(styles)(Main);
export default connect(mapStateToProps)(styledMain);
