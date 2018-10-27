import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const AppBarButtons = (props) => {
  return (
    <div>
      <Link to='/app/messages/create' style={{color: 'white'}}>
        <Button color="inherit">Create message</Button>
      </Link>
    </div>
  );
};

export default AppBarButtons;
