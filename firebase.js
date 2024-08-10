import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAaB0dndRJbnkVys_eweiYqny2n8ODWDII",
  authDomain: "first-project-47348.firebaseapp.com",
  projectId: "first-project-47348",
  storageBucket: "first-project-47348.appspot.com",
  messagingSenderId: "345382297403",
  appId: "1:345382297403:web:f106e5be497ed35b38a11e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{
    auth,
    createUserWithEmailAndPassword
}