import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import AdminModal from './AdminModal';

import * as selectors from '../../../store/admins/reducer';
import * as actions from '../../../store/admins/actions';


class ListAdminPage extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    modalIsOpen: false,
    checked: -1,
    adminToEdit: undefined
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRowClick = (ind) => {
    if (this.state.checked == ind) {
        this.setState({checked: -1});
    } else {
      this.setState({checked: ind});
    }
  };

  handleModalClose = () => {
    this.setState({modalIsOpen: false});
  };

  handleAddClick = () => {
    this.setState({modalIsOpen: true});
  };

  handleEditClick = (row) => {
    let adminToEdit = {...this.props.list[row]};
    adminToEdit = {
      ...adminToEdit,
      access_lvl_one: rightsToBoolMapping[adminToEdit.access_rights][0],
      access_lvl_two: rightsToBoolMapping[adminToEdit.access_rights][1],
      access_lvl_three: rightsToBoolMapping[adminToEdit.access_rights][2]
    }
    this.setState({
      modalIsOpen: true,
      adminToEdit: adminToEdit
    });
  };

  handleDeleteClick = (row) => {
    this.setState({checked: -1});
    this.props.dispatch(actions.deleteAdminWithId(this.props.list[row].id));
  };

  handleFormSubmit = (values) => {
    if (this.state.adminToEdit) {
      values.access_rights = this.state.adminToEdit.access_rights;
      this.setState({
        modalIsOpen: false,
        adminToEdit: undefined
      });
      this.props.dispatch(actions.editAdminWithId(values.id, values));
    } else {
      this.setState({modalIsOpen: false});
      this.props.dispatch(actions.createNewAdmin(values));
    }
  };

  render() {
    const { page, rowsPerPage } = this.state;

    let admins = this.props.list ?
        this.props.list
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((admin, ind) => {
            return (
              <TableRow hover key={admin.id} onClick={() => this.handleRowClick(ind)}>
                <TableCell padding="checkbox">
                  <Checkbox checked={ind === this.state.checked} />
                </TableCell>
                <TableCell>{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{rightsToStringMapping[admin.access_rights].join(', ')}</TableCell>
              </TableRow>
            );
          }) : '';

    return (
      <div>
        {this.props.fetchingInProgress ? <p>updating data in progress...</p> : ''}
        <StyledTableToolbar
          selectedRow={this.state.checked}
          deleteClickHandler={this.handleDeleteClick}
          editClickHandler={this.handleEditClick}
          addClickHandler={this.handleAddClick}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
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
        { this.state.modalIsOpen ? (
          <AdminModal
            open={this.state.modalIsOpen}
            oldAdmin={this.state.adminToEdit}
            closeHandler={this.handleModalClose}
            submitHandler={this.handleFormSubmit}
          />
        ) : ''}
      </div>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flexGrow: 1
  },
  button: {
    display: "inline-block"
  }
});

const TableToolbar = props => {
  const { selectedRow, classes,
    deleteClickHandler, editClickHandler,
    addClickHandler } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Administrators
        </Typography>
      </div>
      <div className={classes.actions}>
        <Tooltip title="Edit">
          <div className={classes.button}>
            <IconButton
            aria-label="Edit"
            disabled={selectedRow === -1}
            onClick={() => editClickHandler(selectedRow)}
            >
            <Edit />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Delete">
          <div className={classes.button}>
            <IconButton
            aria-label="Delete"
            disabled={selectedRow === -1}
            onClick={() => deleteClickHandler(selectedRow)}
            >
            <DeleteIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Add Admin">
          <IconButton
            aria-label="Add Admin"
            onClick={addClickHandler}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

const StyledTableToolbar = withStyles(toolbarStyles)(TableToolbar);

const rightsToStringMapping = {
  0: ["Only observe"],
  1: ["Manage admins"],
  2: ["Manage scheduled messages"],
  3: ["Manage admins", "Manage scheduled messages"],
  4: ["Manage periodical messages"],
  5: ["Manage admins", "Manage periodical messages"],
  6: ["Manage scheduled messages", "Manage periodical messages"],
  7: ["Manage admins", "Manage scheduled messages", "Manage periodical messages"]
}
rightsToStringMapping[-1] = ["Superuser"];

const rightsToBoolMapping = {
  0: [false, false, false],
  1: [true, false, false],
  2: [false, true, false],
  3: [true, true, false],
  4: [false, false, true],
  5: [true, false, true],
  6: [false, true, true],
  7: [true, true, true]
}
rightsToBoolMapping[-1] = [true, true, true];


const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfAdmins(state),
    fetchingInProgress: selectors.getFetchingState(state),
    errorMessage: selectors.getErrorMessage(state)
  };
};

export default connect(mapStateToProps)(ListAdminPage);
