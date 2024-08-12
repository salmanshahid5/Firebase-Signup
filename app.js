import { auth, createUserWithEmailAndPassword } from "./firebase.js";

var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
}
window.login = login;
window.register = register;

let signup = (event) => {
  event.preventDefault();

  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // All fields check
  if (!fname || !lname || !username || !email || !password) {
    alert("All Fields Are Required");
    return;
  }

  // Password length check
  if (password.length < 8) {
    alert("Password must be eight characters");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      // Signed up
      const user = response.user;
      console.log(user);

      // Clear the form fields
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      // Show login form after successful signup
      login();
      alert("Registration successful! Please log in.");
    })
    .catch((error) => {
      console.log("Error:", error.message);
      alert(error.message); // Show error to the user
    });
};

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", signup);
