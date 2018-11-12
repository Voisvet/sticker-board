import React from 'react';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import StickerPicker from './StickerPicker';
import Sticker from './Sticker';

import * as selectors from '../../../../store/messages/reducer';
import * as actions from '../../../../store/messages/actions';

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
    width: "800px",
    height: "600px",
    margin: "-300px 0 0 -400px",
    padding: 2 * theme.spacing.unit,
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  stickerPicker: {
    height: "100%",
    width: "100%"
  },
  stickersList: {
    height: "75%",
    width: "100%",
    overflowY: "scroll"
  },
  sticker: {
    padding: theme.spacing.unit,
    width: "100px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  date: {
    width: "45%",
    marginRight: "10%"
  },
  time: {
    width: "45%"
  }
});

// --------------------------------------------------
//
//  Main component
//
// --------------------------------------------------

class AddMessageModal extends React.Component {

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
        type: 'scheduled',
        payload_type: 'message',
        chats: [],
        message_text: '',
        sticker_id: '',
        date: '',
        time: ''
      };
    }
  }

  // ------------------------------
  //
  //  Handlers
  //
  // ------------------------------

  handleTypeChange = (event) => {
    this.setState({type: event.target.value});
  };

  handlePayloadTypeChange = (event) => {
    this.setState({payload_type: event.target.value});
  };

  handleChatsChange = (event) => {
    this.setState({chats: event.target.value});
  };

  handleMessageTextChange = (event) => {
    this.setState({message_text: event.target.value});
  };

  handleDateChange = (event) => {
    this.setState({date: event.target.value});
  };

  handleTimeChange = (event) => {
    this.setState({time: event.target.value});
  };

  handleStickerPick = (stickerId) => {
    this.setState({sticker_id: stickerId});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const message = {};

    // Todo: implement periodical messages
    if (this.state.type == 'scheduled') {
      message.type = 'scheduled';
    } else if (this.state.type == 'periodical') {
      message.type = 'scheduled';
    }

    message.date = Date.parse(this.state.date + ' ' + this.state.time);
    message.chats = this.state.chats;

    message.payload_type = this.state.payload_type;
    if (this.state.payload_type == 'message') {
      message.payload = this.state.message_text;
    } else if (this.state.payload_type == 'sticker') {
      message.payload = this.state.sticker_id;
    }

    this.props.submitHandler(message);
  }

  // ------------------------------
  //
  //  Rendering
  //
  // ------------------------------

  render() {
    const { open, classes, closeHandler, chats, chatIdToNameMap } = this.props;

    let payload = '';
    switch (this.state.payload_type) {
      case 'message':
        payload = (
          <TextField
            id="payload"
            label="Message Text"
            multiline
            rows="5"
            className={classes.formEntry}
            margin="normal"
            variant="outlined"
            value={this.state.message_text}
            onChange={this.handleMessageTextChange}
          />
        );
        break;
      case 'sticker':
        payload = (
          <div className={classes.sticker}>
            <Sticker
              key={this.state.sticker_id}
              stickerId={this.state.sticker_id}
            />
          </div>
        );
        break;
      default:
        payload = "Not supported yet.";
    }

    return (
      <Modal
        open={open}
        onClose={closeHandler}
      >
        <Paper
          elevation={5}
          className={classes.paper}
        >
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.title}>
                {this.props.oldAdmin ? 'Edit message' : 'Add new message'}
              </Typography>
              <form name="admin_form" onSubmit={this.handleSubmit}>
                <div className={classes.formEntryContainer}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="message-type">Message Type</InputLabel>
                    <Select
                      value={this.state.type}
                      onChange={this.handleTypeChange}
                      inputProps={{
                        name: 'message-type',
                        id: 'message-type',
                      }}
                    >
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="periodical">Periodical</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.formEntryContainer}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="payload-type">Payload Type</InputLabel>
                    <Select
                      value={this.state.payload_type}
                      onChange={this.handlePayloadTypeChange}
                      inputProps={{
                        name: 'payload-type',
                        id: 'payload-type',
                      }}
                    >
                      <MenuItem value="message">Message</MenuItem>
                      <MenuItem value="sticker">Sticker</MenuItem>
                      <MenuItem value="file">File</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.formEntryContainer}>
                  <div className={classes.formControl}>
                      <TextField
                        id="date"
                        label="Date"
                        type="date"
                        className={classes.date}
                        value={this.state.date}
                        onChange={this.handleDateChange}
                      />
                      <TextField
                        id="time"
                        label="Time"
                        type="time"
                        className={classes.time}
                        value={this.state.time}
                        onChange={this.handleTimeChange}
                      />
                  </div>
                </div>

                <div className={classes.formEntryContainer}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="chats">Chats</InputLabel>
                    <Select
                      multiple
                      value={this.state.chats}
                      onChange={this.handleChatsChange}
                      input={<Input id="chats" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip key={value} label={chatIdToNameMap[value]} className={classes.chip} />
                          ))}
                        </div>
                      )}
                    >
                      {chats.map(chat => (
                        <MenuItem key={chat.id} value={chat.id} >
                          {chat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.formEntryContainer}>
                  {payload}
                </div>

                <div className={classes.formEntryContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Grid>
            <Grid item xs={6}>
              <StickerPicker clickHandler={this.handleStickerPick}/>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  };
};

// --------------------------------------------------
//
//  Additional components
//
// --------------------------------------------------

export default withStyles(styles)(AddMessageModal);
