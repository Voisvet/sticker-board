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

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit
  }
});

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
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;

    let messages = this.props.list.length > 0 ?
        this.props.list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(mess => {
            let chatsChips = mess.chats.slice(0, 3).map(chat => {
              return (<Chip
                key={chat}
                color="primary"
                label={chat}
                className={classes.chip}
                />);
            });

            let moreChip = mess.chats.length > 3 ? (<Chip
                
                label="..."
                className={classes.chip}
                />) : '';

            return (
              <TableRow key={mess.id + Math.random()} hover>
                <TableCell>{mess.id}</TableCell>
                <TableCell>{mess.type}</TableCell>
                <TableCell>{new Date(mess.closest_date).toLocaleString("ru")}</TableCell>
                <TableCell>{mess.payload_type}</TableCell>
                <TableCell>
                { chatsChips }
                { moreChip }
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

const styledListMessagePage = withStyles(styles)(ListMessagePage)
export default connect(mapStateToProps)(styledListMessagePage);
