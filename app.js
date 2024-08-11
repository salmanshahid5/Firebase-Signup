
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

let signup = (event) => {
  event.preventDefault();
  console.log('chal gaya');
  
  let email = document.getElementById('email');
  let password = document.getElementById('Password');

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((response) => {
      // Signed up
      const user = response.user;
      console.log(user);
    })
    .catch((error) => {
      console.log('error', error.message);
    });
};

let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', signup);
