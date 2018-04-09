import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import TestDashboardPage from '../components/TestDashboardPage';
import LoginPage from '../components/LoginPage';
import AddTestPage from '../components/AddTestPage';
import ResultsPage from '../components/ResultsPage';
import NotFoundPage from '../components/NotFoundPage';
import EditTestPage from '../components/EditTestPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


export const history = createHistory();

export default () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={TestDashboardPage} />
        <PrivateRoute exact path="/scoring" component={AddTestPage} />
        <PrivateRoute exact path="/edit/:id" component={EditTestPage} />
        <PrivateRoute exact path="/results/:id" component={ResultsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);
