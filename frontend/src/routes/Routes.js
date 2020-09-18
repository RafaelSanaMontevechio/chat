import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/privateRoutes';
import NotFound from '../pages/notFound';
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import Account from '../components/account';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
