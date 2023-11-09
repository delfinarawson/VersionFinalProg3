import app from "firebase/app";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC275ow-53-3Asmxu6QTiPF-2V1t1iNRiw",
  authDomain: "prog3final-20679.firebaseapp.com",
  projectId: "prog3final-20679",
  storageBucket: "prog3final-20679.appspot.com",
  messagingSenderId: "59075933964",
  appId: "1:59075933964:web:00c80d8a4d0791be42fb29"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();