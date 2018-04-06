import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppRouter from '../routers/AppRouter';
import configureStore from '../store/configure';
import { addTest } from '../actions/tests';
import getVisibleTests from '../selectors/tests';

import '../styles/styles.scss';

const store = configureStore();


const test1 = {
  name: 'brendan',
  questions: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  scoreDate: moment().format('MMMM Do, YYYY'),
};
const test2 = {
  name: 'erin',
  questions: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  scoreDate: moment().format('MMMM Do, YYYY'),
};


store.subscribe(() => {
  const state = store.getState();
  const visibleTests = getVisibleTests(state.tests, state.filters);
  console.log(state);
});

store.dispatch(addTest(test1));
store.dispatch(addTest(test2));

const reduxProviderJSX = (
  <Provider store={store}>
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);

const appRoot = document.getElementById('app');
ReactDOM.render(reduxProviderJSX, appRoot);
