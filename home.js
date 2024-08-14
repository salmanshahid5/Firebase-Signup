import { auth, onAuthStateChanged, signOut } from "./firebase.js";

let username = document.getElementById("username");

// <------------check the user is login or not------------>

onAuthStateChanged(auth, (user) => {
  if (user) {
    // <------------ get name through email ------------------>

    let userName = user.email.slice(0, user.email.indexOf("@"));
    userName =
      userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    username.innerHTML = userName;
  } else {
    window.location.href = "index.html";
  }
});

// <------------ logout btn--------------->

let logOut = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

let logOutbtn = document.getElementById("logoutbtn");
logOutbtn.addEventListener("click", logOut);
