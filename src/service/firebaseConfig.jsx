// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKb_i9aA_Dq8HoEzKypHnZMSshQJ_eDdE",
  authDomain: "travelgpt-333bd.firebaseapp.com",
  projectId: "travelgpt-333bd",
  storageBucket: "travelgpt-333bd.firebasestorage.app",
  messagingSenderId: "75876283476",
  appId: "1:75876283476:web:41283a4a9815a58317a9c1",
  measurementId: "G-2TF6E9C8J3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);