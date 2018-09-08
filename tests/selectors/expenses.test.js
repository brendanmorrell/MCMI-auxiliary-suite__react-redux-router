import moment from 'moment';

import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';



test('should filter by text value and sort by date', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    sortReverse: false,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
    sortReverse: false,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});


test('should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment(0).add(1, 'day'),
    sortReverse: false,
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[0]])
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    sortReverse: false,
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
    sortReverse: false,
  };
  expect(selectExpenses(expenses, filters)).toEqual([expenses[1], expenses[2], expenses[0]]);
});

test('should reverse date and amount and go back to normal when executed twice', () => {
  const filtersAmount = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
    sortReverse: true,
  };
  expect(selectExpenses(expenses, filtersAmount)).toEqual([expenses[0], expenses[2], expenses[1]]);

  const filtersDate = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
    sortReverse: true,
  };
  expect(selectExpenses(expenses, filtersDate)).toEqual([expenses[1], expenses[0], expenses[2]]);
});
