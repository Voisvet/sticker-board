import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as selectors from '../../../store/messages/reducer';

const ListMessagePage = (props) => {
  let messages = props.list ?
      props.list.map(mess => <p key={mess.id}>{JSON.stringify(mess)}</p>) : '';
  return (
    <div>
      <p>Hello from /messages</p>
      {props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
      { messages }
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
