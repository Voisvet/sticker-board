import React from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import * as selectors from './store/errors/reducer';
import * as actions from './store/errors/actions';

const styles = theme => ({
  snack: {
    backgroundColor: theme.palette.error.dark,
    margin: theme.spacing.unit * 2
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20
  },
  errorIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  }
});


class ErrorSnackBar extends React.Component {

  handleClose = () => {
    this.props.dispatch(actions.deleteFirstError());
  };

  render() {
    const { classes, isOpened, errorMessage } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isOpened}
        autoHideDuration={30000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classes.snack}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <WarningIcon className={classes.errorIcon} />
              {errorMessage}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  };
}

const mapStateToProps = state => ({
  isOpened: selectors.hasErrors(state),
  errorMessage: selectors.getFirstError(state)
});

const styledErrorSnackBar = withStyles(styles)(ErrorSnackBar);
export default connect(mapStateToProps)(styledErrorSnackBar);
