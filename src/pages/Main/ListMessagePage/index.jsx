import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

import MessageInfoModal from './MessageInfoModal';
import TableBodyWithMessages from './TableBodyWithMessages';
import TableToolbar from './TableToolbar';

import * as selectors from '../../../store/messages/reducer';
import * as actions from '../../../store/messages/actions';

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

  handleRefresh = () => {
    this.props.dispatch(actions.fetchListOfMessages());
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
        <TableToolbar
          selectedRow={this.state.checked}
          refrechClickHandler={this.handleRefresh}
          progressBarShown={this.props.fetchingInProgress}
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

export default connect(mapStateToProps)(ListMessagePage);
