// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Htdw8nwTRbr18l-L3d8HPwVRD_MLte0",
  authDomain: "login-auth-project-8509e.firebaseapp.com",
  projectId: "login-auth-project-8509e",
  storageBucket: "login-auth-project-8509e.appspot.com",
  messagingSenderId: "708392050763",
  appId: "1:708392050763:web:f3088ef61b3b4fef3bedce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };