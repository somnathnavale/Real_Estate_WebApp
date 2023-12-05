import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5c079.firebaseapp.com",
  projectId: "real-estate-5c079",
  storageBucket: "real-estate-5c079.appspot.com",
  messagingSenderId: "245707737149",
  appId: "1:245707737149:web:febaf487503ed158238254",
  measurementId: "G-B7RC45E4TH"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Initialize Cloud Storage and get a reference to the service
