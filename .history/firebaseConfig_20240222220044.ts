// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZBzlYp8KR-bJDEJVVbYroSMxS-GXYmR8",
  authDomain: "plan-it-earth-94b85.firebaseapp.com",
  projectId: "plan-it-earth-94b85",
  storageBucket: "plan-it-earth-94b85.appspot.com",
  messagingSenderId: "97255809349",
  appId: "1:97255809349:web:8b9f6ed7ba990714221e2c",
  measurementId: "G-WXFLGQPQ1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);