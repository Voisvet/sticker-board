import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import * as actions from '../../store/user/actions';

// --------------------------------------------------
//
//  Main component section
//
// --------------------------------------------------

const AppBarButtons = (props) => {
  return (
    <div>
      {
        /*
        <Link to='/app/messages' style={{color: 'white'}}>
        <Button color="inherit">Messages</Button>
        </Link>
        */
      }
      <Link to='/app/images' style={{color: 'white'}}>
        <Button color="inherit">Images</Button>
      </Link>
      <Link to='/app/admins' style={{color: 'white'}}>
        <Button color="inherit">Admins</Button>
      </Link>
      <Button
          color="inherit"
          onClick={() => props.dispatch(actions.invalidateToken())}
      >
        Logout
      </Button>
    </div>
  );
};

// --------------------------------------------------
//
//  Composing and export section
//
// --------------------------------------------------

export default connect()(AppBarButtons);
