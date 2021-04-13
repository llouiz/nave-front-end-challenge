import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import NotFound from './pages/notFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <>
          <Header />
          <Component {...props} />
        </>
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
      <PrivateRoute exact path='/home' component={Home} />
      <PrivateRoute exact path='/home/add' component={Add} />
      <PrivateRoute exact path='/home/edit/:id' component={Edit} />
      <Route path='*' component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
