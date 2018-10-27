import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const AppBarButtons = (props) => {
  return (
    <div>
      <Link to='/app/admins/create' style={{color: 'white'}}>
        <Button color="inherit">Create admin</Button>
      </Link>
      <Link to='/app/admins/edit' style={{color: 'white'}}>
        <Button color="inherit">Edit admin</Button>
      </Link>
    </div>
  );
};

export default AppBarButtons;
