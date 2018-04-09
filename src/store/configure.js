import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import testsReducer from '../reducers/tests';
import filtersReducer from '../reducers/filters';
import trueFalseReducer from '../reducers/trueFalseValues';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// eslint-disable-line

export default () => {
  const store = createStore(
    combineReducers({
      tests: testsReducer,
      filters: filtersReducer,
      trueFalseValues: trueFalseReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
