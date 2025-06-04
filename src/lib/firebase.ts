
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqy-_3SgNgrEQZZUsvWGMDgmYiXG3wbmQ",
  authDomain: "devoura-b217f.firebaseapp.com",
  projectId: "devoura-b217f",
  storageBucket: "devoura-b217f.firebasestorage.app",
  messagingSenderId: "1098617752715",
  appId: "1:1098617752715:web:3cbc501b389f1c143cd88e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
