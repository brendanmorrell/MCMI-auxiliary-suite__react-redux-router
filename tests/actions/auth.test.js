import { login, logout } from '../../actions/auth';



const uid = '123abc';
test('should generate login action object', () => {
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid,
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({ type: 'LOGOUT' });
});
