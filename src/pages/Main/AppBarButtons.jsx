import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const AppBarButtons = (props) => {
  return (
    <div>
      <Link to='/app/messages' style={{color: 'white'}}>
        <Button color="inherit">Messages</Button>
      </Link>
      <Link to='/app/images' style={{color: 'white'}}>
        <Button color="inherit">Images</Button>
      </Link>
      <Link to='/app/admins' style={{color: 'white'}}>
        <Button color="inherit">Admins</Button>
      </Link>
      <Link to='/' style={{color: 'white'}}>
        <Button color="inherit">Logout</Button>
      </Link>
    </div>
  );
};

export default AppBarButtons;
