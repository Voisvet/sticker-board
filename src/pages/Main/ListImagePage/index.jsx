import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/rekognition/actions';
import * as selectors from '../../../store/rekognition/reducer';

const ListImagePage = (props) => {
  let images = props.list ?
      props.list.map(image => <p key={image.id}>{JSON.stringify(image)}</p>) : '';

  return (
    <div>
      <p>Hello from /images</p>
      {props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
      { images }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfImages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

export default connect(mapStateToProps)(ListImagePage);
