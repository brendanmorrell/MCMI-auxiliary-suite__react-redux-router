import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseList } from '../../components/ExpenseList';
// ^you have to change the component to a non-default export so you can grab the non-connected (no state/props so you can pass whatever you want in here for testing) component, which will be grabbed here, and then when you import it as a default (for the real app) you are importing the connected one with the state and props mapped to it
import expenses from '../fixtures/expenses'; // this is the test expenses array we made for all our other tests




test('Should render the ExpenseList with Expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});



test(`Should render <p>No Expenses Currently</p> when there are no expenses`, () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
