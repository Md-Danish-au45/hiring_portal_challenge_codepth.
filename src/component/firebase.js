// import firebase from 'firebase/compat/app'; // Use compat/app for Firebase v9 and above
// import 'firebase/compat/auth'; // Import compat/auth for Firebase v9 and above
// import 'firebase/compat/firestore'; // Import compat/firestore for Firebase v9 and above
// import 'firebase/compat/messaging'; // Import compat/messaging for Firebase v9 and above

// import { getAnalytics } from 'firebase/analytics'; // Import getAnalytics directly

// const firebaseConfig = {
//   // Your Firebase configuration details here
//   apiKey: "AIzaSyAcqZmOhkU9S9XoLJRWN4cPQfuQyKW-uwc",
//   authDomain: "assignment-2d360.firebaseapp.com",
//   projectId: "assignment-2d360",
//   storageBucket: "assignment-2d360.appspot.com",
//   messagingSenderId: "567379983916",
//   appId: "1:567379983916:web:0c69bdf6e9efa046c85b89",
//   measurementId: "G-Z5S963PDDC"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig); // Initialize Firebase app

// export const auth = app.auth(); // Access auth from initialized app
// export const firestore = app.firestore(); // Access firestore from initialized app
// export const messaging = app.messaging(); // Access messaging fro

import firebase from 'firebase/compat/app'; // Use compat/app for Firebase v9 and above
import 'firebase/compat/auth'; // Import compat/auth for Firebase v9 and above
import 'firebase/compat/firestore'; // Import compat/firestore for Firebase v9 and above
import { getAnalytics } from 'firebase/analytics'; // Import getAnalytics directly
import 'firebase/compat/messaging'; // Import compat/messaging for Firebase v9 and above

const firebaseConfig = {
  // Your Firebase configuration details here
  apiKey: "AIzaSyAcqZmOhkU9S9XoLJRWN4cPQfuQyKW-uwc",
  authDomain: "assignment-2d360.firebaseapp.com",
  projectId: "assignment-2d360",
  storageBucket: "assignment-2d360.appspot.com",
  messagingSenderId: "567379983916",
  appId: "1:567379983916:web:0c69bdf6e9efa046c85b89",
  measurementId: "G-Z5S963PDDC"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig); // Initialize Firebase app

export const auth = app.auth(); // Access auth from initialized app
export const firestore = app.firestore(); // Access firestore from initialized app
export const messaging = firebase.messaging(); // Access messaging from initialized app

export const analytics = getAnalytics(app); // Access analytics from initialized app
