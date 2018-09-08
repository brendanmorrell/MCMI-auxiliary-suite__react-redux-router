import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from '../../components/LoginPage';
import { startLogin } from '../../actions/auth';


let wrapper, startLoginSpy;

beforeEach(() => {
  startLoginSpy = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);
});

test('should render LoginPage', () => {
  expect(wrapper).toMatchSnapshot();
});


test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('Click');
  expect(startLoginSpy).toHaveBeenCalled();
});
