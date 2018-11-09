import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import MessageInfoModal from './MessageInfoModal';

import * as selectors from '../../../store/messages/reducer';
import * as actions from '../../../store/messages/actions';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
    cursor: "pointer"
  },
  tableRowLink: {
    cursor: "pointer"
  }
});

// --------------------------------------------------
//
//  Main component
//
// --------------------------------------------------

class ListMessagePage extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    modalIsOpen: false
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRowClick = (id) => {
    this.props.dispatch(actions.fetchMessageWithId(id))
      .then(() => {
        if (this.props.currentMessage.payload_type !== 'file') {
          this.props.dispatch(actions.fetchPayloadWithId(id));
        }
      });
    this.setState({ modalIsOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteMessage = (id) => {
    this.setState({ modalIsOpen: false });
    this.props.dispatch(actions.deleteMessageWithId(id));
  }

  render() {
    const { mapChatIdToName, classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <div>
        {this.props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
        <StyledTableToolbar
          selectedRow={this.state.checked}

        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Closest Sending Date</TableCell>
              <TableCell>Payload Type</TableCell>
              <TableCell>Chats</TableCell>
            </TableRow>
          </TableHead>
          <TableBodyWithMessages
            list={this.props.list}
            page={page}
            rowsPerPage={rowsPerPage}
            classes={classes}
            clickHandler={this.handleRowClick}
            chatsMapping={mapChatIdToName}
          />
        </Table>
        <TablePagination
          component="div"
          count={this.props.list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{'aria-label': 'Previous Page'}}
          nextIconButtonProps={{'aria-label': 'Next Page'}}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <MessageInfoModal
          open={this.state.modalIsOpen}
          closeHandler={this.handleModalClose}
          deleteHandler={this.handleDeleteMessage}
          message={this.props.currentMessage}
        />
      </div>
    );
  }
}

// --------------------------------------------------
//
//  Additional components
//
// --------------------------------------------------



const toolbarStyles = theme => ({
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

const TableToolbar = props => {
  const { selectedRow, classes,
    deleteClickHandler, editClickHandler,
    addClickHandler } = props;

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

const StyledTableToolbar = withStyles(toolbarStyles)(TableToolbar);

// Table body with rows with onClick handler that links to other page
const TableBodyWithMessages = (props) => {
  // Unpack all the things that we need
  const { page, rowsPerPage, classes, clickHandler, chatsMapping } = props;

  if (props.list.length > 0) {
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
              <TableCell>{new Date(mess.closest_date).toLocaleString("ru")}</TableCell>
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
//  Connection and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfMessages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state),
    mapChatIdToName: selectors.getChatIdToNameMapping(state),
    currentMessage: selectors.getCurrentMessage(state)
  };
};

const styledListMessagePage = withStyles(styles)(ListMessagePage)
export default connect(mapStateToProps)(styledListMessagePage);
