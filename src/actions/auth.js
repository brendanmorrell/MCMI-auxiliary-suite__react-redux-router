import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = () =>
  () =>
    firebase.auth()
      .signInWithPopup(googleAuthProvider)
      .catch(e => console.log(e));

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () =>
  () =>
    firebase.auth()
      .signOut()
      .catch(e => console.log(e));
