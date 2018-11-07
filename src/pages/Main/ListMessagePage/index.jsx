import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Chip from '@material-ui/core/Chip';

import * as selectors from '../../../store/messages/reducer';

class ListMessagePage extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { page, rowsPerPage } = this.state;

    let messages = this.props.list.length > 0 ?
        this.props.list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(mess => {
            return (
              <TableRow key={mess.id + Math.random()} hover>
                <TableCell>{mess.id}</TableCell>
                <TableCell>{mess.type}</TableCell>
                <TableCell>{new Date(mess.closest_date).toLocaleString("ru")}</TableCell>
                <TableCell>{mess.payload_type}</TableCell>
                <TableCell>
                {
                  mess.chats.map(chat => {
                    return (<Chip color="primary" label={chat}/>);
                  })
                }
                </TableCell>
              </TableRow>
            );
          }) : (
            <TableRow>
              <TableCell>
                You do not have any messages :(
              </TableCell>
            </TableRow>
          );

    return (
      <div>
        {this.props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
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
          <TableBody>
            {messages}
          </TableBody>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfMessages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

export default connect(mapStateToProps)(ListMessagePage);
