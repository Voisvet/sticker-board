import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core/styles';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  button: {
    width: "100%"
  },
  image: {
    marginRight: "auto",
    marginLeft: "auto",
    display: "block"
  }
});

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

const PayloadSwitch = (props) => {

  // ------------------------------
  //
  //  Props extraction
  //
  // ------------------------------

  const {payload, payload_type, classes} = props;

  // ------------------------------
  //
  //  Special case - content loading
  //
  // ------------------------------

  if (payload_type !== 'file' && !payload) {
    return (
      <Typography variant='body2'>
        Payload is loading...
      </Typography>
    );
  }

  // ------------------------------
  //
  //  Render part
  //
  // ------------------------------

  console.log(payload_type);
  if (payload_type === 'file') {
    return (
      <Button variant="contained" color="primary" className={classes.button}>
        <CloudDownload className={classes.leftIcon} />
        Download File
      </Button>
    );
  } else if (payload_type === 'message') {
    return (
      <Typography variant='body2'>
        { payload }
      </Typography>
    );
  } else if (payload_type === 'sticker') {
    let src = 'data:image/png;base64,' + payload;
    return <img className={classes.image} src={src}/>;
  } else {
    return (
      <Typography variant='body2'>
        There is no payload o_O
      </Typography>
    );
  }
};

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

export default withStyles(styles)(PayloadSwitch);
