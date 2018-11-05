import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/admins/actions';
import * as selectors from '../../../store/admins/reducer';

const ListAdminPage = (props) => {
  let admins = props.list ?
      props.list.map(admin => <p key={admin.id}>{JSON.stringify(admin)}</p>) : '';
  return (
    <div>
      <p>Hello from /admins</p>
      {props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
      { admins }
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
