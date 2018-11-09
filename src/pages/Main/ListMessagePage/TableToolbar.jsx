import React from 'react';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Refresh from '@material-ui/icons/Refresh';
import Add from '@material-ui/icons/Add';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flexGrow: 1
  },
  button: {
    display: "inline-block"
  }
});

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

// Toolbar with title and actions buttons
const TableToolbar = props => {

  // ------------------------------
  //
  //  Props extraction
  //
  // ------------------------------

  const { selectedRow, classes,
    refrechClickHandler, addClickHandler } = props;

  // ------------------------------
  //
  //  Render
  //
  // ------------------------------

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Messages
        </Typography>
      </div>
      <div className={classes.actions}>
        <Tooltip title="Refresh">
          <IconButton
            aria-label="Refresh"
            onClick={refrechClickHandler}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Message">
          <IconButton
            aria-label="Add Message"
            onClick={addClickHandler}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

export default withStyles(styles)(TableToolbar);
