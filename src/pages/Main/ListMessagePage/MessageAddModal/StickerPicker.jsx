import React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import * as selectors from '../../../../store/messages/reducer';
import * as actions from '../../../../store/messages/actions';

import Sticker from './Sticker';

const styles = theme => ({
  formEntryContainer: {
    marginBottom: 2 * theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  title: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  stickerPicker: {
    height: "100%",
    width: "100%"
  },
  stickersList: {
    height: "70%",
    width: "100%",
    overflowY: "scroll",
    display: "flex",
    flexWrap: "wrap"
  },
  sticker: {
    padding: theme.spacing.unit,
    width: "100px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
      backgroundColor: "#f1f1f1"
    },
    cursor: "pointer"
  },
});


class StickerPicker extends React.Component {
  constructor(props) {
    super(props);
    if (props.list.length < 1) {
      props.dispatch(actions.fetchStickers());
    }
  }

  state = {
    idForSearch: '',
    foundSticker: undefined
  };

  handleIdChange = (event) => {
    this.setState({ idForSearch: event.target.value });
  }

  render() {
    const { classes, clickHandler } = this.props;

    return (
      <div className={classes.stickerPicker}>
        <Typography variant="h6" className={classes.title}>
          Sticker Picker
        </Typography>
        <div className={classes.formEntryContainer}>
          <TextField
            id="sticker-id"
            label="Find sticker by ID"
            className={classes.formControl}
            value={this.state.name}
            margin="normal"
            value={this.state.idForSearch}
            onChange={this.handleIdChange}
          />
        </div>
        <div className={classes.stickersList}>
          {this.state.idForSearch == '' ? this.props.list.map(id => {
            return (
              <div key={id} className={classes.sticker} onClick={() => clickHandler(id)}>
                <Sticker stickerId={id} />
              </div>
            );
          }) : (
            <div className={classes.sticker}>
              <Sticker
                stickerId={this.state.idForSearch}
                onClick={() => clickHandler(this.state.idForSearch)}
              />
            </div>
          ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: selectors.getListOfStickers(state)
  };
};

const styledStickerPicker = withStyles(styles)(StickerPicker);
export default connect(mapStateToProps)(styledStickerPicker);
