import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCNE1pqpdAEQ7DyCEE9C0g_VR9QgkmtYSQ',
//   authDomain: 'alx-firebase-chat-as.firebaseapp.com',
//   databaseURL:
//     'https://alx-firebase-chat-as-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'alx-firebase-chat-as',
//   storageBucket: 'alx-firebase-chat-as.appspot.com',
//   messagingSenderId: '292269269545',
//   appId: '1:292269269545:web:6d8313fc5d3483b484b238',
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/prefer-default-export
const database = getDatabase(app);

export default database;
