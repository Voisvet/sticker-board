import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getUserToken } from '../../../../store/user/reducer';
import { getStickerWithId } from '../../../../services/apiConnector';

const styles = {
  sticker: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}

class Sticker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined
    }
    getStickerWithId(props.token, props.stickerId)
      .then((result) => {
        this.setState({
          image: result.payload
        });
      });
  }

  render() {
    let src = 'data:image/png;base64,' + this.state.image;
    return <img className={this.props.classes.sticker} src={src}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: getUserToken(state)
  };
};

const styledSticker = withStyles(styles)(Sticker);
export default connect(mapStateToProps)(styledSticker);
