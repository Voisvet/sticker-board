import React from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';

import { withStyles } from '@material-ui/core/styles';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  tableRowLink: {
    cursor: "pointer"
  },
  chip: {
    marginRight: theme.spacing.unit,
    cursor: "pointer"
  }
});

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

// Table body with rows with onClick handler that links to other page
const TableBodyWithMessages = (props) => {

  // ------------------------------
  //
  //  Props extraction
  //
  // ------------------------------

  const { page, rowsPerPage, classes, clickHandler, chatsMapping } = props;

  // ------------------------------
  //
  //  List generation
  //
  // ------------------------------

  if (props.list.length > 0) {
    // Case when we have messages in list
    return (
      <TableBody>
      { props.list
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(mess => {
          let chats = mess.chats;
          if (chatsMapping) {
            chats = mess.chats.map(chat => chatsMapping[chat]);
          }
          return (
            <TableRow
              key={mess.id}
              hover
              className={classes.tableRowLink}
              onClick={() => clickHandler(mess.id)}
            >
              <TableCell>{mess.id}</TableCell>
              <TableCell>{mess.type}</TableCell>
              <TableCell>
                {new Date(mess.closest_date).toLocaleString("ru")}
              </TableCell>
              <TableCell>{mess.payload_type}</TableCell>
              <TableCell>
                <ChatsChips chats={chats} classes={classes}/>
              </TableCell>
            </TableRow>
          );
        }) }
      </TableBody>
    );
  } else {
    // Case when we do not have any messages
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5}>
            You do not have any messages :(
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
};

// --------------------------------------------------
//
//  Sub-component section
//
// --------------------------------------------------

// Just list of chips for beautiful displaying of list of chats
const ChatsChips = (props) => {
  // Display three first chats
  let chatsChips = props.chats.slice(0, 3).map(chat => {
    return (<Chip
      key={chat}
      color="primary"
      label={chat}
      className={props.classes.chip}
      />);
  });

  // If we have more than three chats, then display someting like "more" chip
  if (props.chats.length > 3) {
    chatsChips.push(
      <Chip
      key="_others"
      label="..."
      className={props.classes.chip}
      />
    )
  }

  return chatsChips;
};

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

export default withStyles(styles)(TableBodyWithMessages)
