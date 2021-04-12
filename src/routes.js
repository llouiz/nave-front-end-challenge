import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Login from './components/login';
import Home from './components/home';
import Add from './components/add';
import Edit from './components/edit';
import NotFound from './components/notFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <PrivateRoute path='/home' component={Home} />
      <PrivateRoute path='/add' component={Add} />
      <PrivateRoute path='/edit/:id' component={Edit} />
      <Route path='*' component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
