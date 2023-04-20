// // Import the Firebase SDK
// // Get login button and add event listener
// const loginBtn = document.getElementById('loginBtn');
// loginBtn.addEventListener('click', signIn);

// // Get sign in with Google button and add event listener
// const googleSignInBtn = document.getElementById('googleSignInBtn');
// googleSignInBtn.addEventListener('click', signInWithGoogle);

// // Get elements
// const email = document.getElementById('email');
// const password = document.getElementById('password');

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCfSAygglteH5k5ur1UxQlQ__Vj4eGl7SU",
//   authDomain: "hklii-bcd8f.firebaseapp.com",
//   projectId: "hklii-bcd8f",
//   storageBucket: "hklii-bcd8f.appspot.com",
//   messagingSenderId: "999175109178",
//   appId: "1:999175109178:web:abb1a20160952f115b5303",
//   measurementId: "G-CPHKW7S17M"
// };
// firebase.initializeApp(firebaseConfig);
// // firebase.auth().useEmulator('https://localhost');


// const auth = firebase.auth();


// // Sign in function
// function signIn() {
//     const userEmail = email.value;
//     const userPassword = password.value;

//     firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
//         .then(() => {
//             // Redirect to dashboard or any other page
//             window.location.href = "dashboard.html";
//         })
//         .catch((error) => {
//             const errorMessage = error.message;
//             alert(errorMessage);
//         });
// }

// // Sign in with Google function
// function signInWithGoogle() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider).then(result=>{
//         return false;
//         console.log(result);
        
//     })
//     // console.log(firebase,provider);
    

// }

// console.log('firebase.js');


//////////////////////////////////

// Firebase configuration
const firebaseConfig = {
    // add your Firebase project config here
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase auth service
  const auth = firebase.auth();
  
  // Login form
  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginWithGoogleBtn = document.getElementById("login-with-google-btn");
  
  // Signup form
  const signupForm = document.getElementById("signup-form");
  const signupEmail = document.getElementById("signup-email");
  const signupPassword = document.getElementById("signup-password");
  const confirmPassword = document.getElementById("confirm-password");
  const toggleSignupBtn = document.getElementById("toggle-signup-btn");
  
  // Toggle between login and signup forms
  toggleSignupBtn.addEventListener("click", () => {
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
  });
  
  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Get the user's email and password
    const email = loginEmail.value;
    const password = loginPassword.value;
  
    // Sign in the user
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        console.log("User signed in successfully.");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing in:", error.message);
      });
  });
  
  // Signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Get the user's email and password
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPasswordValue = confirmPassword.value;
  
    // Check if the password and confirm password fields match
    if (password !== confirmPasswordValue) {
      console.error("Passwords do not match.");
      return;
    }
  
    // Create a new user
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created successfully
        console.log("User created successfully.");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error creating user:", error.message);
      });
  });
  
  // Login with Google button click
  loginWithGoogleBtn.addEventListener("click", () => {
    // Create a Google authentication provider object
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // Sign in with Google
    auth.signInWithPopup(provider)
      .then((result) => {
        // User signed in successfully with Google
        console.log("User signed in successfully with Google.");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing in with Google:", error.message);
      });
  });
  