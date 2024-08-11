// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbu_EAyXjXUkwyqmngjtVgfjAcbOcRy4g",
  authDomain: "pantry-app-b5986.firebaseapp.com",
  projectId: "pantry-app-b5986",
  storageBucket: "pantry-app-b5986.appspot.com",
  messagingSenderId: "204798106059",
  appId: "1:204798106059:web:27c3a1d0847dcb84b67e4e",
  measurementId: "G-LK0SFSMKEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app)
export {app, firestore}