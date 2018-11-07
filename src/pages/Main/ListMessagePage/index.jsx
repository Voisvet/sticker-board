import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as selectors from '../../../store/messages/reducer';

const ListMessagePage = (props) => {
  let messages = props.list ?
      props.list.map(mess => {
        return (
          <TableRow key={mess.id}>
            <TableCell>{mess.id}</TableCell>
            <TableCell>{mess.type}</TableCell>
            <TableCell>{new Date(mess.closest_date).toLocaleString("ru")}</TableCell>
            <TableCell>{mess.payload_type}</TableCell>
            <TableCell>{JSON.stringify(mess.chats)}</TableCell>
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
      {props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfMessages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

export default connect(mapStateToProps)(ListMessagePage);
