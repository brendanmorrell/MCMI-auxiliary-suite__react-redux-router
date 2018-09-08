import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, historySpy, startEditExpenseSpy, startRemoveExpenseSpy;

beforeEach(() => {
  startEditExpenseSpy = jest.fn();
  startRemoveExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpenseSpy}
      startRemoveExpense={startRemoveExpenseSpy}
      history={historySpy}
      expense={expenses[2]}
    />,
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/dashboard');
});

test('should handle removeExpense', () => {
  wrapper.find('button').prop('onClick')(expenses[2].id);
  expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith(expenses[2].id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/dashboard');
});
