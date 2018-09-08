import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense,
  addExpense,
  startEditExpense,
  editExpense,
  startRemoveExpense,
  removeExpense,
  startSetExpenses,
  setExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = '123abc';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});


test('should setup remove expense action object', () => {
  const action = removeExpense(expenses[1].id);
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  });
});

test('should dispatch removeExpense and remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const { id } = expenses[2];
  store.dispatch(startRemoveExpense(id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id,
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});


test('should setup edit expense action object', () => {
  const action = editExpense(expenses[1].id, { note: expenses[2].note });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      note: expenses[2].note,
    },
  });
});

test('should edit expense', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseId = expenses[1].id;
  const { id, ...updates } = expenses[2];// complicated thing I looked up to remove a single property (id) from an object you clone
  if (id); // just to make the linter stop bitching about id never being used. no actual purpose
  store.dispatch(startEditExpense(expenseId, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expenseId,
      updates,
    });
    return database.ref(`users/${uid}/expenses/${expenseId}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(updates);
    done();
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

test('should add expense to database and store', (done) => { // must add done so that jest waits for the done call before checking to see if there were any errors, otherwise, it will run through the code, the promises won't have run yet, and since no errors will have come back, it will think it passed even though an error would have been thrown when the promises returned
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();// // special redux-mock-store function that returns an array of all the actions that were dispatched to the store
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      },
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults,
      },
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});



test('should setup set expense object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});


test('should fetch expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});
