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
import { withStyles } from '@material-ui/core/styles';

import * as selectors from '../../../store/messages/reducer';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
    cursor: "pointer"
  },
  tableRowLink: {
    cursor: "pointer"
  }
});

// --------------------------------------------------
//
//  Main component
//
// --------------------------------------------------

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

  handleRowClick = (event, url) => {
    this.props.history.push(url);
  }

  render() {
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;

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
          <TableBodyWithMessages
            list={this.props.list}
            page={page}
            rowsPerPage={rowsPerPage}
            classes={classes}
            clickHandler={this.handleRowClick}
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
      </div>
    );
  }
}

// --------------------------------------------------
//
//  Additional components
//
// --------------------------------------------------

// Table body with rows with onClick handler that links to other page
const TableBodyWithMessages = (props) => {
  // Unpack all the things that we need
  const { page, rowsPerPage, classes, clickHandler } = props;

  if (props.list.length > 0) {
    return (
      <TableBody>
      { props.list
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(mess => {
          return (
            <TableRow
              key={mess.id}
              hover
              className={classes.tableRowLink}
              onClick={(event) => {
                clickHandler(event, '/app/messages/info/' + mess.id)
              }}
            >
              <TableCell>{mess.id}</TableCell>
              <TableCell>{mess.type}</TableCell>
              <TableCell>{new Date(mess.closest_date).toLocaleString("ru")}</TableCell>
              <TableCell>{mess.payload_type}</TableCell>
              <TableCell>
                <ChatsChips chats={mess.chats} classes={classes}/>
              </TableCell>
            </TableRow>
          );
        }) }
      </TableBody>
    );
  } else {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5}>
            You do not have any messages :(
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
};

// Just list of chips for beautiful displaying of list of chats
const ChatsChips = (props) => {
  // Display three first chats
  let chatsChips = props.chats.slice(0, 3).map(chat => {
    return (<Chip
      key={chat}
      color="primary"
      label={chat}
      className={props.classes.chip}
      />);
  });

  // If we have more than three chats, then display someting like "more" chip
  if (props.chats.length > 3) {
    chatsChips.push(
      <Chip
      key="_others"
      label="..."
      className={props.classes.chip}
      />
    )
  }

  return chatsChips;
};

// --------------------------------------------------
//
//  Connection and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfMessages(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

const styledListMessagePage = withStyles(styles)(ListMessagePage)
export default connect(mapStateToProps)(styledListMessagePage);
