import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { firebase } from '../firebase/firebase';
import AppRouter, { history } from '../routers/AppRouter';
import configureStore from '../store/configure';
import getVisibleTests from '../selectors/tests';
import { startSetTests } from '../actions/tests';
import { getTrueFalseValues } from '../actions/trueFalseValues';
import { login, logout } from '../actions/auth';
import LoadingPage from './LoadingPage';

import '../styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  getVisibleTests(state.tests, state.filters);
  console.log(state);
});


const reduxProviderJSX = (
  <Provider store={store}>
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);
const appRoot = document.getElementById('app');


ReactDOM.render(<LoadingPage />, appRoot);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(reduxProviderJSX, appRoot);
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetTests()).then(() => store.dispatch(getTrueFalseValues())).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        return history.push('dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    return history.push('/');
  }
});
