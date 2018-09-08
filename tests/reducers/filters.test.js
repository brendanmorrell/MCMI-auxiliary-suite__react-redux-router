import moment from 'moment';
import filtersReducer from '../../reducers/filters';


test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });// arg1=reducer state. we want undefined because we want it to be the default, which is what it will rever to if no data is passed in. arg2=the action. @@INIT is an action that is performed when redux first launches, so it is the deault state.the first
  const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortReverse: false,
  };
  expect(state).toEqual(filtersReducerDefaultState);
});



test('should set sortBy to amount, and then should sort back by date', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});


test('should set sortBy back to date', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
  const state2 = filtersReducer(state, { type: 'SORT_BY_DATE' });
  expect(state2.sortBy).toBe('date');
});


test('should reverse the sorting', () => {
  const state = filtersReducer(undefined, { type: 'SORT_REVERSE' });
  expect(state.sortReverse).toBe(true);

  const state2 = filtersReducer(state, { type: 'SORT_REVERSE' });
  expect(state2.sortReverse).toBe(false);
});



test('should set text filter', () => {
  const text = 'this is a filter value';
  const action = {
    type: 'SET_TEXT_FILTER',
    text,
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});


test('should set the startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(startDate);
});

test('should set the endDate filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(endDate);
});
