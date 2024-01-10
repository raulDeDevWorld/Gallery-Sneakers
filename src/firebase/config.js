import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAC9NY5rfSE3TifHOq_6kK04-HayD4H_ig",
  authDomain: "gallery-sneakers.firebaseapp.com",
  databaseURL: "https://gallery-sneakers-default-rtdb.firebaseio.com",
  projectId: "gallery-sneakers",
  storageBucket: "gallery-sneakers.appspot.com",
  messagingSenderId: "1048996871979",
  appId: "1:1048996871979:web:d20f6d63d73e6590de4f6e"
};

const app = initializeApp(firebaseConfig)

export { app }