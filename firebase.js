// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Corrected import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQA-Vx7qtKfkjId68drLnXYFXigd1kyk8",
  authDomain: "flashcardsaas-8c62d.firebaseapp.com",
  projectId: "flashcardsaas-8c62d",
  storageBucket: "flashcardsaas-8c62d.appspot.com",
  messagingSenderId: "854466103375",
  appId: "1:854466103375:web:b8777542ea6c836e75c23a",
  measurementId: "G-XYQMWHMHMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Correct function for Firestore initialization

// Correct export syntax
export { db };
