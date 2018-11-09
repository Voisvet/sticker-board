import React from 'react';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
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

const TableToolbar = props => {

  // ------------------------------
  //
  //  Props extraction
  //
  // ------------------------------

  const { selectedRow, classes,
    deleteClickHandler, editClickHandler,
    addClickHandler } = props;

  // ------------------------------
  //
  //  Rendering part
  //
  // ------------------------------

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Administrators
        </Typography>
      </div>
      <div className={classes.actions}>
        <Tooltip title="Edit">
          <div className={classes.button}>
            <IconButton
            aria-label="Edit"
            disabled={selectedRow === -1}
            onClick={() => editClickHandler(selectedRow)}
            >
            <Edit />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Delete">
          <div className={classes.button}>
            <IconButton
            aria-label="Delete"
            disabled={selectedRow === -1}
            onClick={() => deleteClickHandler(selectedRow)}
            >
            <DeleteIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Add Admin">
          <IconButton
            aria-label="Add Admin"
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
