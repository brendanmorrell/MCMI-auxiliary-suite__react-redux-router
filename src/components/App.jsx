import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import AppRouter from '../routers/AppRouter';
import configureStore from '../store/configure';
import { addTest } from '../actions/tests';
import getVisibleTests from '../selectors/tests';

import '../styles/styles.scss';


const store = configureStore();


const test1 = {
  name: 'brendan',
  questions: [
    {
      number: 1,
      answer: true,
    },
    {
      number: 2,
      answer: true,
    },
    {
      number: 3,
      answer: true,
    },
  ],
};
const test2 = {
  name: 'erin',
  questions: [
    {
      number: 1,
      answer: false,
    },
    {
      number: 2,
      answer: false,
    },
    {
      number: 3,
      answer: false,
    },
  ],
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
    <AppRouter />
  </Provider>
);


const appRoot = document.getElementById('app');
ReactDOM.render(reduxProviderJSX, appRoot);
