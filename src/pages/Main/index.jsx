import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateAdminPage from './CreateAdminPage';
import EditAdminPage from './EditAdminPage';
import ListAdminPage from './ListAdminPage';

import CreateMessagePage from './CreateMessagePage';
import ListMessagePage from './ListMessagePage';

import ListImagePage from './ListImagePage';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/app' component={ListMessagePage} />

      <Route exact path='/app/admins' component={ListAdminPage} />
      <Route path='/app/admins/create' component={CreateAdminPage} />
      <Route path='/app/admins/edit' component={EditAdminPage} />

      <Route exact path='/app/messages' component={ListMessagePage} />
      <Route path='/app/messages/create' component={CreateMessagePage} />

      <Route path='/app/images' component={ListImagePage} />
    </Switch>
  );
};

export default Main;
