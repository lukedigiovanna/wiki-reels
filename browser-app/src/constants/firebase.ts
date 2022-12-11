// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmGdghbu2fPoP5VS7MyuIh73QiLfHTJiM",
  authDomain: "wiki-reels.firebaseapp.com",
  projectId: "wiki-reels",
  storageBucket: "wiki-reels.appspot.com",
  messagingSenderId: "301796724701",
  appId: "1:301796724701:web:3a3e71bc45c911340bb034",
  measurementId: "G-JQ1VHVDW6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

export { auth, googleProvider};
