import { initializeApp } from './firebase-app'

// // Add Firebase products that you want to use

import { getAuth, createUserWithEmailAndPassword } from "./firebase-auth";




// chrome.runtime.onMessage.addListener((request) => {
//   if (request === 'showOptions') chrome.runtime.openOptionsPage();
// });

// chrome.runtime.onInstalled.addListener((details) => {
//   if (details.reason === 'install') {
//     chrome.runtime.openOptionsPage();
//   }
// });

// try {
  
// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAy1cQNmS7ODhE1RpEDY-fMQsCJlff2QOQ",
//   authDomain: "kennetp-28dbc.firebaseapp.com",
//   projectId: "kennetp-28dbc",
//   storageBucket: "kennetp-28dbc.appspot.com",
//   messagingSenderId: "470579643823",
//   appId: "1:470579643823:web:f16b4a343b2b2ee2039b5a"
// };
// initializeApp(firebaseConfig);

// ////////
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, "hello@gmail.com", "112233Aa@")
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// // Get elements from HTML
// // const loginForm = document.getElementById('login-form');
// // const signupForm = document.getElementById('signup-form');
// // const loginWithEmailBtn = document.getElementById('login-button');
// // const loginWithGoogleBtn = document.getElementById('login-with-google-btn');
// // const signupBtn = document.getElementById('signup-button');
// // const toggleSignupBtn = document.getElementById('toggle-signup-btn');

// // Toggle between login and signup forms
// // toggleSignupBtn.addEventListener('click', () => {
// //   loginForm.style.display = "none";
// //   signupForm.style.display = "block";
// // });

// // // Login with email and password
// // loginWithEmailBtn.addEventListener('click', (e) => {
// //   e.preventDefault();
// //   const email = loginForm['login-email'].value;
// //   const password = loginForm['login-password'].value;
// //   firebase.auth().signInWithEmailAndPassword(email, password)
// //     .then(() => {
// //       console.log('User logged in');
// //       // Add your desired behavior here after user logs in
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       // Add your desired error handling here
// //     });
// // });

// // // Login with Google
// // loginWithGoogleBtn.addEventListener('click', (e) => {
// //   e.preventDefault();
// //   const provider = new firebase.auth.GoogleAuthProvider();
// //   firebase.auth().signInWithPopup(provider)
// //     .then(() => {
// //       console.log('User logged in with Google');
// //       // Add your desired behavior here after user logs in
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       // Add your desired error handling here
// //     });
// // });

// // // Signup with email and password
// // signupBtn.addEventListener('click', (e) => {
// //   e.preventDefault();
// //   const email = signupForm['signup-email'].value;
// //   const password = signupForm['signup-password'].value;
// //   const confirmPassword = signupForm['confirm-password'].value;
// //   if (password !== confirmPassword) {
// //     console.error('Passwords do not match');
// //     return;
// //   }
// //   firebase.auth().createUserWithEmailAndPassword(email, password)
// //     .then(() => {
// //       console.log('User signed up');
// //       // Add your desired behavior here after user signs up
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       // Add your desired error handling here
// //     });
// // });

// // // Listen for authentication state changes
// // firebase.auth().onAuthStateChanged((user) => {
// //   if (user) {
// //     console.log('User is logged in');
// //     // Add your desired behavior here when user is logged in
// //   } else {
// //     console.log('User is logged out');
// //     // Add your desired behavior here when user is logged out
// //   }
// // });

// ////////////////////////////////////////////////

// } catch (e) {
// console.error(e)}

// // cross oregi wild js 

// // chrome.runtime.onMessage.addListener(function (request, sender) {
// //   if (request.command === "post") {
// //           // in here, you can use both firebase and data from popup view
// //     console.log(request.data);
// //           return true;
// //   }
// // });

