import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as selectors from '../../../store/admins/reducer';

const ListAdminPage = (props) => {
  let admins = props.list ?
      props.list.map(admin => {
        return (
          <TableRow key={admin.id}>
            <TableCell>{admin.id}</TableCell>
            <TableCell>{admin.name}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{admin.access_rights}</TableCell>
          </TableRow>
        );
      }) : '';

  return (
    <div>
      <div>
        {props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Access Rights</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfAdmins(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

export default connect(mapStateToProps)(ListAdminPage);
