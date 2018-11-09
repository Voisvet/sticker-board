import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Add from '@material-ui/icons/Add';

import MessageInfoModal from './MessageInfoModal';
import TableBodyWithMessages from './TableBodyWithMessages';

import * as selectors from '../../../store/messages/reducer';
import * as actions from '../../../store/messages/actions';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

// Table toolbar styles
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

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

class ListMessagePage extends React.Component {

  // ------------------------------
  //
  //  State definition
  //
  // ------------------------------

  state = {
    rowsPerPage: 10,
    page: 0,
    modalIsOpen: false
  }

  // ------------------------------
  //
  //  Handlers
  //
  // ------------------------------

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

  // ------------------------------
  //
  //  Render function definition
  //
  // ------------------------------

  render() {
    const { mapChatIdToName } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <div>
        {this.props.fetchingInProgress
          ? <p>updating data in progress...</p> : ''}
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

// Toolbar with title and actions buttons
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
//  Connection and export section
//
// --------------------------------------------------

const StyledTableToolbar = withStyles(toolbarStyles)(TableToolbar);

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfMessages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state),
    mapChatIdToName: selectors.getChatIdToNameMapping(state),
    currentMessage: selectors.getCurrentMessage(state)
  };
};

export default connect(mapStateToProps)(ListMessagePage);
