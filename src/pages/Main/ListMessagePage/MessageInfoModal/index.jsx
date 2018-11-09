import React from 'react';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core/styles';

import ChatsChips from './ChatsChips';
import PeriodsList from './PeriodsList';

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
  }
});

// --------------------------------------------------
//
//  Main component
//
// --------------------------------------------------

const MessageInfoModal = (props) => {
  const { open, classes, closeHandler, message, mapChatIdToName } = props;

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
          Wait for a moment...
          </Paper>
        </Modal>
    );
  }

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
            <IconButton aria-haspopup="true">
              <Edit />
            </IconButton>
            <IconButton aria-haspopup="true" color="secondary">
              <Delete />
            </IconButton>
            <IconButton aria-haspopup="true" onClick={closeHandler}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <div className={classes.block}>
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
            { message.payload_type === 'file' ? (
              <Button variant="contained" color="primary" className={classes.button}>
                <CloudDownload className={classes.leftIcon} />
                Download File
              </Button>
            ) : ''}
            { message.payload_type === 'message' ? (
              <Typography variant='body2'>
                This is a message payload. Do not take care of it
              </Typography>
            ) : ''}
            { message.payload_type === 'sticker' ? (
              <Typography variant='body2'>
                Here should be an image
              </Typography>
            ) : ''}
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

// --------------------------------------------------
//
//  Additional components
//
// --------------------------------------------------

const mapStateToProps = (state) => {
  return {
    mapChatIdToName: selectors.getChatIdToNameMapping(state)
  };
};

const styledMessageInfoModal = withStyles(styles)(MessageInfoModal);
export default connect(mapStateToProps)(styledMessageInfoModal);
