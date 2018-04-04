import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import TestDashboardPage from '../components/TestDashboardPage';
import LoginPage from '../components/LoginPage';
import AddTestPage from '../components/AddTestPage';
import ResultsPage from '../components/ResultsPage';
import NotFoundPage from '../components/NotFoundPage';
import EditTestPage from '../components/EditTestPage';
import Header from '../components/Header';

export default () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={TestDashboardPage} />
        <Route exact path="/scoring" component={AddTestPage} />
        <Route exact path="/edit/:id" component={EditTestPage} />
        <Route exact path="/results/:id" component={ResultsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
