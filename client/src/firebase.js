// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5c079.firebaseapp.com",
  projectId: "real-estate-5c079",
  storageBucket: "real-estate-5c079.appspot.com",
  messagingSenderId: "245707737149",
  appId: "1:245707737149:web:febaf487503ed158238254",
  measurementId: "G-B7RC45E4TH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);