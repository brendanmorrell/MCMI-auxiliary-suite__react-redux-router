import { createStore, combineReducers } from 'redux';
import testsReducer from '../reducers/tests';
import filtersReducer from '../reducers/filters';
import trueFalseReducer from '../reducers/trueFalseValues';

export default () => {
  const store = createStore(
    combineReducers({
      tests: testsReducer,
      filters: filtersReducer,
      trueFalseValues: trueFalseReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  );

  return store;
};
