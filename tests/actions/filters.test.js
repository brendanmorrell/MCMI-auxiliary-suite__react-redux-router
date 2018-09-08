import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  sortByDate,
  sortByAmount,
  sortReverse,
  setTextFilter,
} from '../../actions/filters';

test('should generate set start date action object', () => {
  const startDate = moment();
  const action = setStartDate(startDate);
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate,
  });
});

test('should generate set end date action object', () => {
  const endDate = moment();
  const action = setEndDate(endDate);
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate,
  });
});

test('should set text filter if it exists, and should set the filter to an empty string if nothing is entered', () => {
  const text = 'trailblazer';
  const actionValue = setTextFilter(text);
  const actionEmpty = setTextFilter();
  expect(actionValue).toEqual({
    type: 'SET_TEXT_FILTER',
    text,
  });

  expect(actionEmpty).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '',
  });
});

test('should create sort by date action', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

test('create sort by amount object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});

test('should reverse direction of filtering both ways', () => {
  const action = sortReverse();
  expect(action).toEqual({
    type: 'SORT_REVERSE',
  });
});
