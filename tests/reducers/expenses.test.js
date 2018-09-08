import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('expenses reducer default state', () => {
  const expensesReducerDefaultState = [];
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(expensesReducerDefaultState);
});


// ADD_EXPENSE

test('ADD_EXPENSE ', () => {
  const expense = {
    id: '109',
    description: 'insurance',
    note: '',
    createdAt: 2000,
    amount: 29500,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);
  expect(state.length).toBe(4);
  expect(state).toEqual([...expenses, expense]);
});

// REMOVE_EXPENSE (TWO TESTS)

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-12',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});


// EDIT_EXPENSE (TWO TESTS)

test('should EDIT_EXPENSE', () => {
  const { description, amount, id } = expenses[1];
  const newDescription = 'new tablesaw';
  const newAmount = 7878787878;

  const action = {
    type: 'EDIT_EXPENSE',
    id,
    updates: {
      description: newDescription,
      amount: newAmount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].description).toBe(newDescription);
  expect(state[1].amount).toBe(newAmount);

  expect(state.filter((expense) => expense.description === description)).toEqual([]);
  expect(state.filter((expense) => expense.amount === amount)).toEqual([]);
});

test('should not edit an expense if incorrect id given', () => {
  const description = 'new tablesaw';
  const amount = 7878787878;

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-12',
    updates: {
      description,
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});


test('should just set expenses based off of info provided and not what is in the state', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]],
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
