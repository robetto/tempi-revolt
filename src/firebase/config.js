import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tempi-revolt.firebaseapp.com",
  projectId: "tempi-revolt",
  storageBucket: "tempi-revolt.appspot.com",
  messagingSenderId: "71537647169",
  appId: "1:71537647169:web:84707fe24550aa2dd630c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const db = getFirestore(app);

export { projectStorage, db };
