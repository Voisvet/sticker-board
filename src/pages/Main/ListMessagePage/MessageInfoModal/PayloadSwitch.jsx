import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

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

const PayloadSwitch = (props) => {
  const {payload, payload_type, classes} = props;

  if (!payload) {
    return (
      <Typography variant='body2'>
        Payload is loading...
      </Typography>
    );
  }

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

export default withStyles(styles)(PayloadSwitch);
