import app from "firebase/app";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Lj9Z-qNsP1Y0EX2U134PORKLYtp5n1Y",
  authDomain: "versionfinalprog3.firebaseapp.com",
  projectId: "versionfinalprog3",
  storageBucket: "versionfinalprog3.appspot.com",
  messagingSenderId: "129968517701",
  appId: "1:129968517701:web:119055f3f4b7a9ca5da92c"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
