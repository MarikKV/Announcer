import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXB-_qUAcdqzMRwH1LfMpQF9Bx69TSxWI",
  authDomain: "announcer-55703.firebaseapp.com",
  databaseURL: "https://announcer-55703.firebaseio.com",
  projectId: "announcer-55703",
  storageBucket: "announcer-55703.appspot.com",
  messagingSenderId: "200206777207",
  appId: "1:200206777207:web:28d190a83008f14f4c7f72"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export { firebase, db }