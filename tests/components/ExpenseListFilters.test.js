import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filtersDefault, filtersAlt } from '../fixtures/filters';


let setStartDateSpy, setEndDateSpy, setTextFilterSpy, sortByDateSpy, sortByAmountSpy, sortReverseSpy, wrapper;

beforeEach(() => {
  setStartDateSpy = jest.fn();
  setEndDateSpy = jest.fn();
  setTextFilterSpy = jest.fn();
  sortByDateSpy = jest.fn();
  sortByAmountSpy = jest.fn();
  sortReverseSpy = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filtersDefault}
      setStartDate={setStartDateSpy}
      setEndDate={setEndDateSpy}
      setTextFilter={setTextFilterSpy}
      sortByDate={sortByDateSpy}
      sortByAmount={sortByAmountSpy}
      sortReverse={sortReverseSpy}
    />,
  );
});

test('render ExpenseList filters correctly (no text filter, no start or end date, and filtered by date)', () => {
  expect(wrapper).toMatchSnapshot();
});

test(`render ExpenseList filters with 'text' set to '${filtersAlt.text}' and 'sortBy' set to '${filtersAlt.sortBy}', 'startDate' set to '${filtersAlt.startDate}', 'endDate' set to '${filtersAlt.endDate}', 'sortReverse' set to '${filtersAlt.sortReverse}',`, () => {
  wrapper.setProps({
    filters: filtersAlt,
  });
  expect(wrapper).toMatchSnapshot();
});


test('should handle the text change', () => {
  wrapper.find('input').at(0).prop('onChange')({
    target: {
      value: filtersAlt.text,
    },
  });
  expect(setTextFilterSpy).toHaveBeenLastCalledWith(filtersAlt.text);
});
// ALTERNATE
// test('should handle the text change', () => {
//   wrapper.find('input').at(0).simulate('change', {
//     target: { value: filtersAlt.text },
//   });
//   expect(setTextFilterSpy).toHaveBeenLastCalledWith(filtersAlt.text);
// });



test('should sort by date', () => {
  wrapper.setProps({
    filters: filtersAlt,
  });
  const value = 'date';
  wrapper.find('select').prop('onChange')({
    target: { value },
  });
  expect(sortByDateSpy).toHaveBeenCalled();
});
// ALTERNATE
// test('should sort by date', () => {
//   wrapper.setProps({
//     filters: filtersAlt,
//   });
//   const value = 'date';
//   wrapper.find('select').simulate('change', {
//     target: { value },
//   });
//   expect(sortByDateSpy).toHaveBeenCalled();
// });




test('should sort by amount', () => {
  wrapper.find('select').prop('onChange')({
    target: {
      value: filtersAlt.sortBy,
    },
  });
  expect(sortByAmountSpy).toHaveBeenCalled();
});
// ALTERNATE
// test('should sort by amount', () => {
//   wrapper.find('select').simulate('change', {
//     target: {
//       value: filtersAlt.sortBy,
//     },
//   });
//   expect(sortByAmountSpy).toHaveBeenCalled();
// });


test('should reverse sorting', () => {
  wrapper.find('button').prop('onClick')();
  expect(sortReverseSpy).toHaveBeenCalled();
});
// ALTERNATE
// test('should reverse sorting', () => {
//   wrapper.find('input').at(1).simulate('change');
//   expect(sortReverseSpy).toHaveBeenCalled();
// });



test('should handle date change', () => {
  const { startDate, endDate } = filtersAlt;
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDateSpy).toHaveBeenLastCalledWith(filtersAlt.startDate);
  expect(setEndDateSpy).toHaveBeenLastCalledWith(filtersAlt.endDate);
});
// NO ALTERNATE FOR THIS^, NEED TO USE PROP, CANT SIMULATE SINCE THE ACTION ISNT A JAVASCRIPT EVENT HANDLER


test('should handle date focus changes', () => {
  const calendarFocused = null;
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
