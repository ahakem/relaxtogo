import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXmYLg3VOOuMLMJVhAKtwWkAaqDSDzwYE",
  authDomain: "align-with-kamine.firebaseapp.com",
  projectId: "align-with-kamine",
  storageBucket: "align-with-kamine.firebasestorage.app",
  messagingSenderId: "269076973618",
  appId: "1:269076973618:web:18813bfa44f6f4299d142b",
  measurementId: "G-G461J1DWYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
