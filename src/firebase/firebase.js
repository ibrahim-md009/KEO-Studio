// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5XysGYa8_6Z_pZVCbwWKylWTqpSgSy44",
  authDomain: "photography-studio-ae81a.firebaseapp.com",
  projectId: "photography-studio-ae81a",
  storageBucket: "photography-studio-ae81a.firebasestorage.app",
  messagingSenderId: "1011841824778",
  appId: "1:1011841824778:web:6d6e8fbb2971dc47cc07f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);

// لو محتاج Auth
export const auth = getAuth(app);
