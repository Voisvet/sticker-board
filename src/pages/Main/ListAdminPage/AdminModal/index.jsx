import React from 'react';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  button: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  formEntry: {
    width: "100%"
  },
  formEntryContainer: {
    marginBottom: 2 * theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  checkboxLabel: {
    display: "inline-block"
  },
  title: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "420px",
    margin: "-210px 0 0 -200px",
    padding: 2 * theme.spacing.unit,
  }
});

// --------------------------------------------------
//
//  Main component
//
// --------------------------------------------------

class AdminModal extends React.Component {

  // ------------------------------
  //
  //  Constructor overriding
  //  and state initialization
  //
  // ------------------------------

  constructor(props) {
    super(props);
    if (props.oldAdmin) {
      this.state = {
        ...props.oldAdmin,
        password: ''
      };
    } else {
      this.state = {
        name: '',
        email: '',
        password: '',
        access_lvl_one: false,
        access_lvl_two: false,
        access_lvl_three: false
      };
    }
  }

  // ------------------------------
  //
  //  Handlers
  //
  // ------------------------------

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  };

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  };

  handleAccessLvlOneChange = (event) => {
    this.setState({access_lvl_one: !this.state.access_lvl_one});
  };

  handleAccessLvlTwoChange = (event) => {
    this.setState({access_lvl_two: !this.state.access_lvl_two});
  };

  handleAccessLvlThreeChange = (event) => {
    this.setState({access_lvl_three: !this.state.access_lvl_three});
  };

  // ------------------------------
  //
  //  Rendering
  //
  // ------------------------------

  render() {
    const { open, classes, closeHandler, submitHandler } = this.props;

    return (
      <Modal
        open={open}
        onClose={closeHandler}
      >
        <Paper
          elevation={5}
          className={classes.paper}
        >
          <Typography variant="h5" className={classes.title}>
            {this.props.oldAdmin ? 'Edit admin' : 'Add new admin'}
          </Typography>
          <form>
            <div className={classes.formEntryContainer}>
              <TextField
                value={this.state.name}
                onChange={this.handleNameChange}
                name="name"
                className={classes.formEntry}
                label="Name"
              />
            </div>
            <div className={classes.formEntryContainer}>
              <TextField
                value={this.state.email}
                onChange={this.handleEmailChange}
                name="email"
                className={classes.formEntry}
                label="Email"
              />
            </div>
            <div className={classes.formEntryContainer}>
              <TextField
                value={this.state.password}
                onChange={this.handlePasswordChange}
                name="password"
                className={classes.formEntry}
                label="Password"
                type="password"
              />
            </div>
            <div onClick={this.handleAccessLvlOneChange}>
              <Checkbox checked={this.state.access_lvl_one} />
              <Typography className={classes.checkboxLabel}>
                Can manage administrators
              </Typography>
            </div>
            <div onClick={this.handleAccessLvlTwoChange}>
              <Checkbox checked={this.state.access_lvl_two}/>
              <Typography className={classes.checkboxLabel}>
                Can manage scheduled messages
              </Typography>
            </div>
            <div onClick={this.handleAccessLvlThreeChange}>
              <Checkbox checked={this.state.access_lvl_three}/>
              <Typography className={classes.checkboxLabel}>
                Can manage periodic messages
              </Typography>
            </div>
            <div className={classes.formEntryContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => submitHandler(this.state)}
              >
                Save
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>
    );
  };
}

// --------------------------------------------------
//
//  Additional components
//
// --------------------------------------------------

export default withStyles(styles)(AdminModal);
