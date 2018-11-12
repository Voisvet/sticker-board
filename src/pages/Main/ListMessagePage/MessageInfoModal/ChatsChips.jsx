import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: 0.5 * theme.spacing.unit
  }
});

const ChatsChips = (props) => {
  // Display three first chats
  return props.chats.map(chat => (
    <Chip
      key={chat}
      color="primary"
      label={chat}
      className={props.classes.chip}
    />
  ));
};

export default withStyles(styles)(ChatsChips);
