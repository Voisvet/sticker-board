import React from 'react';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

import ChatsChips from './ChatsChips';
import PeriodsList from './PeriodsList';
import PayloadSwitch from './PayloadSwitch';

import * as selectors from '../../../../store/messages/reducer';

// --------------------------------------------------
//
//  Styles section
//
// --------------------------------------------------

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  button: {
    width: "100%"
  },
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "600px",
    margin: "-300px 0 0 -200px"
  },
  title: {
    flexGrow: 1
  },
  line: {
    opacity: "0.25",
    margin: 0
  },
  firstBlock: {
    padding: 2 * theme.spacing.unit
  },
  block: {
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
  },
  body: {
    height: "536px",
    overflowY: "scroll"
  },
  typeBlock: {
    paddingTop: theme.spacing.unit
  },
  chipsBlock: {
    marginRight: -0.5 * theme.spacing.unit,
    marginLeft: -0.5 * theme.spacing.unit,
    marginBottom: -0.5 * theme.spacing.unit,
    marginTop: 0.5 * theme.spacing.unit
  },
  progressCircle: {
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "200px"
  }
});

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

const MessageInfoModal = (props) => {

  // ------------------------------
  //
  //  Props extraction
  //
  // ------------------------------

  const { open, classes, closeHandler,
          deleteHandler, message,
          mapChatIdToName } = props;

  // ------------------------------
  //
  //  Special case (progress bar)
  //
  // ------------------------------

  if (!message) {
    return (
        <Modal
          open={open}
          onClose={closeHandler}
        >
          <Paper
            elevation={5}
            className={classes.paper}
          >
            <CircularProgress className={classes.progressCircle}/>
          </Paper>
        </Modal>
    );
  }

  // ------------------------------
  //
  //  Rendering part
  //
  // ------------------------------

  const mapedChats = message.chats.map((chat) => mapChatIdToName[chat]);
  return (
    <Modal
      open={open}
      onClose={closeHandler}
    >
      <Paper
        elevation={5}
        className={classes.paper}
      >
        <AppBar color="default" position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant='h6'
              color="inherit"
            >
              Message Info
            </Typography>
            <IconButton
              aria-haspopup="true"
              color="secondary"
              onClick={() => deleteHandler(message.id)}
            >
              <Delete />
            </IconButton>
            <IconButton aria-haspopup="true" onClick={closeHandler}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <div className={classes.firstBlock}>
            <Typography variant='subtitle1'>Info</Typography>
            <div className={classes.typeBlock}>
              <Typography variant='body2'>{message.type}</Typography>
              <Typography variant='caption'>Message type</Typography>
            </div>
            <div className={classes.typeBlock}>
              <Typography variant='body2'>{message.payload_type}</Typography>
              <Typography variant='caption'>Payload type</Typography>
            </div>
            { message.type === 'scheduled' ? (
              <div className={classes.typeBlock}>
                <Typography variant='body2'>
                  {new Date(message.date).toLocaleString("ru", {})}
                </Typography>
                <Typography variant='caption'>Scheduled time</Typography>
              </div>
            ) : ''}
          </div>
          <hr className={classes.line} />
          <div className={classes.block}>
            <Typography variant='subtitle1'>Chats</Typography>
            <div className={classes.chipsBlock}>
              <ChatsChips chats={mapedChats} />
            </div>
          </div>
          { message.type === 'periodical' ? (
            <div>
              <hr className={classes.line} />
              <div className={classes.block}>
                <Typography variant='subtitle1'>Peroiods</Typography>
                <PeriodsList periods={message.periods} />
              </div>
            </div>
          ) : ''}
          <hr className={classes.line} />
          <div className={classes.block}>
            <Typography variant='subtitle1'>Payload</Typography>
            <div className={classes.typeBlock}>
              <PayloadSwitch
                payload_type={message.payload_type}
                payload={message.payload}
              />
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    mapChatIdToName: selectors.getChatIdToNameMapping(state)
  };
};

const styledMessageInfoModal = withStyles(styles)(MessageInfoModal);
export default connect(mapStateToProps)(styledMessageInfoModal);
