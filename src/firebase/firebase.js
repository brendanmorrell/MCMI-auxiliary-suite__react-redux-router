import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAzFi_6wGIms-oD5nElDlW9vRiVS0uWxB8',
  authDomain: 'react-mcmi.firebaseapp.com',
  databaseURL: 'https://react-mcmi.firebaseio.com',
  projectId: 'react-mcmi',
  storageBucket: '',
  messagingSenderId: '521720287793',
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider().catch(e => console.log(e));

export { firebase, googleAuthProvider, database as default };
