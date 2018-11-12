import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import TableToolbar from './TableToolbar';

import * as selectors from '../../../store/rekognition/reducer';
import * as actions from '../../../store/rekognition/actions';

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

class ListImagePage extends React.Component {

  // ------------------------------
  //
  //  State initialization
  //
  // ------------------------------

  state = {
    rowsPerPage: 10,
    page: 0
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

  handleRefresh = () => {
    this.props.dispatch(actions.fetchListOfImages());
  }

  // ------------------------------
  //
  //  Render function
  //
  // ------------------------------

  render() {
    const { page, rowsPerPage } = this.state;

    return (
      <div>
        <TableToolbar
          progressBarShown={this.props.fetchingInProgress}
          refrechClickHandler={this.handleRefresh}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Most Probable Entity</TableCell>
              <TableCell>Confidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ImagesList
              list={this.props.list}
              page={page}
              rowsPerPage={rowsPerPage}
            />
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

// --------------------------------------------------
//
//  Sub-component section
//
// --------------------------------------------------

const ImagesList = (props) => {
  const {list, page, rowsPerPage} = props;
  return list ? list
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(image => {
          return (
            <TableRow key={image.id} hover>
              <TableCell>{image.id}</TableCell>
              <TableCell>{image.entities[0].name}</TableCell>
              <TableCell>{image.entities[0].confidence}</TableCell>
            </TableRow>
          );
        }) : '';
};

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfImages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

export default connect(mapStateToProps)(ListImagePage);
