import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  db,
  doc,
  setDoc,
} from "./firebase.js";

// <------------ for animation ----------------->
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

//  <-------sign up page ------>
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

  if (password.length < 8) {
    alert("Password must be eight characters");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
      // Signed up successfully, retrieve the user
      const user = response.user;
      console.log("User created:", user);

      if (!user || !user.uid) {
        throw new Error("User or UID is undefined. Cannot proceed.");
      }

      // Add data to Firestore
      try {
        const uid = user.uid;
        await setDoc(doc(db, "users", uid), {
          firstName: fname,
          lastName: lname,
          userName: username,
          email: email,
        });
        console.log("Document successfully written!");
        alert("Registration successful! Please log in.");
      } catch (error) {
        console.error("Error writing document:", error);
        alert("Failed to store user data in Firestore: " + error.message);
      }

      // Clear the form fields
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      // Redirect to login
      login();
    })
    .catch((error) => {
      console.log("Authentication Error:", error.message);
      alert(error.message);
    });
};

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", signup);

//  <------- login page ------>

let loginUser = (event) => {
  event.preventDefault();

  let email = document.getElementById("emailLogin").value;
  let password = document.getElementById("passwordLogin").value;

  const formBox = document.getElementById("formbox");
  formBox.style.minHeight = "400px";

  // All fields check
  if (!email || !password) {
    alert("All Fields Are Required");
    return;
  }

  if (password.length < 8) {
    alert("Password must be eight characters");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      // Signed in
      const userLogin = response.user;
      console.log(userLogin);

      // Clear the form fields
      document.getElementById("emailLogin").value = "";
      document.getElementById("passwordLogin").value = "";

      window.location.href = "home.html";
    })
    .catch((error) => {
      console.log("Error:", error.message);
      alert(error.message);
    });
};

let loginSubmit = document.getElementById("signIn");
loginSubmit.addEventListener("click", loginUser);

//  <-------google login ------>

let googleSignUp = (event) => {
  event.preventDefault();
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("token==>", token);
      console.log("user==>", user);

      // Redirect to home or dashboard
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.log("Error:", error.message);
      alert(error.message);
    });
};

let googleBtn = document.getElementById("google");
googleBtn.addEventListener("click", googleSignUp);

//  <-------Forget Password ------>

let forget = () => {
  let emailPassword = document.getElementById("emailLogin").value;
  console.log(emailPassword);

  if (emailPassword) {
    sendPasswordResetEmail(auth, emailPassword)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
        document.getElementById("emailLogin").value = "";
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    alert("Please enter your email address.");
  }
};
let forgotPassword = document.getElementById("forgotPassword");
forgotPassword.addEventListener("click", forget);
