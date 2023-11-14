// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFJcUtNhdmEP1IDibSYMCaTPdgq9QTM7I",
  authDomain: "nextjs-project-744f2.firebaseapp.com",
  databaseURL: "https://nextjs-project-744f2-default-rtdb.firebaseio.com",
  projectId: "nextjs-project-744f2",
  storageBucket: "nextjs-project-744f2.appspot.com",
  messagingSenderId: "525373544229",
  appId: "1:525373544229:web:1eb9b9f3c2e1595286eccc",
  measurementId: "G-DQC8F804RR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
