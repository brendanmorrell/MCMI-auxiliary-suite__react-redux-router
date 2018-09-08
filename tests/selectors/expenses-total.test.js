import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('should return 0 if no expenses', () => {
  const res = selectExpensesTotal([]);
  expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
  const res = selectExpensesTotal([expenses[0]]);
  expect(res).toBe(expenses[0].amount);
});

test('should correctly add up multiple expense', () => {
  const res = selectExpensesTotal(expenses);
  expect(res).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});
