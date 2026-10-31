import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD8rioVWRFhFJ_FTbCjP1iXUhPmsrYhz0I",
  authDomain: "e-learning-5f275.firebaseapp.com",
  projectId: "e-learning-5f275",
  storageBucket: "e-learning-5f275.firebasestorage.app",
  messagingSenderId: "287896459658",
  appId: "1:287896459658:web:5461f7a15abbedbe3ad073"
};

const app = initializeApp(firebaseConfig)

 export const auth = getAuth(app);
 export const db = getFirestore(app);

