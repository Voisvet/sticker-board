import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as selectors from '../../../store/rekognition/reducer';

const ListImagePage = (props) => {
  let images = props.list ?
      props.list.map(image => {
        return (
          <TableBody>
            <TableRow key={image.id}>
              <TableCell>{image.id}</TableCell>
              <TableCell>{image.entities[0].name}</TableCell>
              <TableCell>{image.entities[0].confidence}</TableCell>
            </TableRow>
            { image.entities.slice(1).map(entity => {
                return (
                  <TableRow key={entity.name}>
                    <TableCell></TableCell>
                    <TableCell>{entity.name}</TableCell>
                    <TableCell>{entity.confidence}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        );
      }) : '';

  return (
    <div>
      {props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Recognized Entity</TableCell>
            <TableCell>Confidence</TableCell>
          </TableRow>
        </TableHead>
          {images}
      </Table>
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
