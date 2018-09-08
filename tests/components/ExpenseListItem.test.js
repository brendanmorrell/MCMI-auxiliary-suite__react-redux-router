import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test(`It should render the 'Rent' expense item which is the 2nd item in the expenses array`, () => {
  const wrapper = shallow(
    <ExpenseListItem
      {...expenses[1]}
      expenses={expenses}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
