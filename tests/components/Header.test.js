// had to install enzyme and enzyme-adapter-react-(put your react version number here, like '16') and raf@3.3.2 (request animation frame)
import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';// just renders the given component. full rendering would deal with rendering all the related components for testing things like child componenets for user interaction, etc
// ^(this no longer necessary with Enzyme)
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
// ^no longer necessary when enzyme-to-jason's snapshot serializer is set in the config file
import { Header } from '../../components/Header';

// redo this now with enzyme
// test('should render Header correctly', () => {
//   const renderer = new ReactShallowRenderer();
//   renderer.render(<Header />);
//   const output = renderer.getRenderOutput();
//   expect(output).toMatchSnapshot(); // this is a jest command that takes a snapshot of the rendered output and saves it to a file (__snapshots__ folder). It compares the current snapshot with whatever the previous rendered snapshot was (thus, the first call to this will always pass, because it just creates a new one which will obs match itself)
// });

let dispatchStartLogoutPropSpy, wrapper;

beforeEach(() => {
  dispatchStartLogoutPropSpy = jest.fn();
  wrapper = shallow(<Header dispatchStartLogoutProp={dispatchStartLogoutPropSpy} />);
});

test('should render Header correctly', () => {
  // const wrapper = shallow(<Header startLogout={() => {}} />);// you pass in the JSX you want to shallow render into this wrapper variable
  // REACTSHALLOW RENDER SETUP (the code below is basic, and you don't need to wrapper line, above. Also not very useful. Enzyme is much better)

  //  expect(wrapper.find('h1').length).toBe(1);
  //  expect(wrapper.find('h1').text()).toBe('Coinpurse!');

  // ENZYME SETUP EXAMPLE
  // expect(toJSON(wrapper)).toMatchSnapshot();// using this with enzyme now adds a bunch of enzyme scripot into the snapshot, which we don't want because if the enzyme script changes, it will say the snapshot doesn't match, even if what we actually rendered didn't change. Thus, we need to add a library called enzyme-to-json and use it when we are expecting something about our enzyme wrapper
  // ^ with enzyme, need to throw toJSON around the wrapper, and it will extract the meaningful info, and disregard the enzyme content
  // ^you can also wire this up in the jest.config.json filt to run automatically so you don't have to import it or call it
  // ^ you do this by adding:
  // "snapshotSerializers": [
  //   "enzyme-to-json/serializer"
  // ]
  // to the setup file, before or after the "setupFiles" key and then you can run the file as it is written below without importing
  expect(wrapper).toMatchSnapshot();
});


test('expect dispatchStartLogout to have been called on click', () => {
  wrapper.find('button').simulate('click');
  expect(dispatchStartLogoutPropSpy).toHaveBeenCalled();
});
