/*
 *
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 * NEED REFACTORING!!!
 *
 */

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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

import StickerPicker from './StickerPicker';
import Sticker from './Sticker';
import PeriodsList from '../MessageInfoModal/PeriodsList';

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
    top: "5%",
    left: "50%",
    width: "800px",
    minHeight: "700px",
    margin: "0 0 0 -400px",
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
    width: "275px",
    height: "275px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  date: {
    width: "45%",
    marginRight: "10%"
  },
  time: {
    width: "45%"
  },
  topMargin: {
    marginTop: theme.spacing.unit
  },
  inputInDialog: {
    width: "200px"
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
      const date = new Date(Date.now() + 3600000);
      this.state = {
        type: 'scheduled',
        payload_type: 'message',
        chats: [],
        message_text: '',
        sticker_id: '',
        periods: [],
        date: date.getFullYear() + '-'
          + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
          + '-' + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()),
        time:
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':'
          + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      };
      console.log(this.state.time);
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

  handlePeriodSave = (period) => {
    let periods = this.state.periods.slice();
    periods.push({
      ...period,
      hour: +period.hour,
      minute: +period.minute
    });
    this.setState({periods});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const periods = this.state.periods.map(period => {
      const newPeriod = {
        hour: period.hour,
        minute: period.minute
      };
      if (period.month != 0) {
        newPeriod.month = period.month;
      }
      if (period.day_of_week != 0) {
        newPeriod.day_of_week = period.day_of_week - 1;
      }
      if (period.day != 0) {
        newPeriod.day = period.day;
      }

      return newPeriod;
    });

    const message = {periods};

    // Todo: implement periodical messages
    message.type = this.state.type;

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

    return (
      <Modal
        open={open}
        onClose={closeHandler}
      >
        <Paper
          elevation={5}
          className={classes.paper}
        >
        <form name="admin_form" onSubmit={this.handleSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.title}>
                {this.props.oldAdmin ? 'Edit message' : 'Add new message'}
              </Typography>
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
                      {chats ? chats.map(chat => (
                        <MenuItem key={chat.id} value={chat.id} >
                          {chat.name}
                        </MenuItem>
                      )) : ''}
                    </Select>
                  </FormControl>
                </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title}>
                Date
              </Typography>
              <DatePickerSwitch
                classes={classes}
                date={this.state.date}
                time={this.state.time}
                handleDateChange={this.handleDateChange}
                handleTimeChange={this.handleTimeChange}
                type={this.state.type}
                periods={this.state.periods}
                saveHandler={this.handlePeriodSave}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title}>
                Payload
              </Typography>
              <div className={classes.formEntryContainer}>
                <PayloadSwitch
                  classes={classes}
                  payloadType={this.state.payload_type}
                  messageText={this.state.message_text}
                  messageChangeHandler={this.handleMessageTextChange}
                  stickerId={this.state.sticker_id}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <StickerPicker clickHandler={this.handleStickerPick}/>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          </form>
        </Paper>
      </Modal>
    );
  };
};

class DatePickerSwitch extends React.Component {
  state = {
    dialogIsOpened: false,
    month: 0,
    day_of_week: 0,
    day: 0,
    hour: '00',
    minute: '00'
  };

  handleDialogOpen = () => {
    this.setState({ dialogIsOpened: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogIsOpened: false });
  };

  handleMonthChange = (event) => {
    this.setState({month: event.target.value});
  };

  handleDayOfWeekChange = (event) => {
    this.setState({day_of_week: event.target.value});
  };

  handleDayChange = (event) => {
    this.setState({day: event.target.value});
  };

  handleTimeChange = (event) => {
    this.setState({
      hour: event.target.value.split(':')[0],
      minute: event.target.value.split(':')[1]
    });
  };

  handleAdd = () => {
    this.setState({dialogIsOpened: false})
    this.props.saveHandler({
      ...this.state,
      dialogIsOpened: undefined
    });
  }

  render() {
    if (this.props.type == 'scheduled'){
      return (
        <div className={this.props.classes.formEntryContainer}>
          <div className={this.props.classes.formControl}>
              <TextField
                id="date"
                label="Date"
                type="date"
                className={this.props.classes.date}
                value={this.props.date}
                onChange={this.props.handleDateChange}
              />
              <TextField
                id="time"
                label="Time"
                type="time"
                className={this.props.classes.time}
                value={this.props.time}
                onChange={this.props.handleTimeChange}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <PeriodsList periods={this.props.periods} />
          <div className={this.props.classes.formEntryContainer}>
            <div className={this.props.classes.formControl}>
              <Button
                color="primary"
                className={this.props.classes.button}
                onClick={this.handleDialogOpen}
              >
                Add Period
              </Button>
            </div>
          </div>
          <Dialog
            open={this.state.dialogIsOpened}
            onClose={this.handleDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Period</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Every
                <div className={this.props.classes.topMargin}>
                <FormControl>
                  <InputLabel htmlFor="day-of-week">Day of week</InputLabel>
                  <Select
                    value={this.state.day_of_week}
                    onChange={this.handleDayOfWeekChange}
                    inputProps={{id: 'day-of-week'}}
                    className={this.props.classes.inputInDialog}
                  >
                    <MenuItem value={0}>Any day of week</MenuItem>
                    <MenuItem value={1}>Monday</MenuItem>
                    <MenuItem value={2}>Tuesday</MenuItem>
                    <MenuItem value={3}>Wednesday</MenuItem>
                    <MenuItem value={4}>Thursday</MenuItem>
                    <MenuItem value={5}>Friday</MenuItem>
                    <MenuItem value={6}>Saturday</MenuItem>
                    <MenuItem value={7}>Sunday</MenuItem>
                  </Select>
                </FormControl>
                </div>
                <div className={this.props.classes.topMargin}>
                <TextField
                  autoFocus
                  id="day"
                  label="Day"
                  value={this.state.day}
                  onChange={this.handleDayChange}
                  className={this.props.classes.inputInDialog}
                />
                </div>
                <div className={this.props.classes.topMargin}>
                of
                </div>
                <div className={this.props.classes.topMargin}>
                <FormControl>
                  <InputLabel htmlFor="month">Month</InputLabel>
                  <Select
                    value={this.state.month}
                    onChange={this.handleMonthChange}
                    inputProps={{id: 'month'}}
                    className={this.props.classes.inputInDialog}
                  >
                    <MenuItem value={0}>Any month</MenuItem>
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>Febrary</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>Jule</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
                  </Select>
                </FormControl>
                </div>
                <div className={this.props.classes.topMargin}>
                at
                </div>
                <div className={this.props.classes.topMargin}>
                <TextField
                  id="time"
                  label="Time"
                  type="time"
                  value={this.state.hour + ':' + this.state.minute}
                  onChange={this.handleTimeChange}
                  className={this.props.classes.inputInDialog}
                />
                </div>
              </DialogContentText>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleAdd} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

const PayloadSwitch = (props) => {
  switch (props.payloadType) {
    case 'message':
      return (
        <TextField
          id="payload"
          label="Message Text"
          multiline
          rows="13"
          className={props.classes.formEntry}
          margin="normal"
          variant="outlined"
          value={props.messageText}
          onChange={props.messageChangeHandler}
        />
      );
    case 'sticker':
      return props.stickerId == '' ? (
        "Choose a sticker"
      ) : (
        <div className={props.classes.sticker}>
          <Sticker
            key={props.stickerId}
            stickerId={props.stickerId}
          />
        </div>
      );
    default:
      return "Not supported yet.";
  }
}


// --------------------------------------------------
//
//  Additional components
//
// --------------------------------------------------

export default withStyles(styles)(AddMessageModal);
