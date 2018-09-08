import authReducer from '../../reducers/auth';

const uid = '123abc';


test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid,
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(uid);
});

test('should clear login id for logout', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer({ uid }, action);
  expect(state).toEqual({});
});
