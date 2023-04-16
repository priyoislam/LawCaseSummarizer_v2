// Import the Firebase SDK
// import firebase from '/node_modules/firebase/app';

// import 'firebase/auth';



// Get login button and add event listener
const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', signIn);

// Get sign in with Google button and add event listener
const googleSignInBtn = document.getElementById('googleSignInBtn');
googleSignInBtn.addEventListener('click', signInWithGoogle);

// Get elements
const email = document.getElementById('email');
const password = document.getElementById('password');

// Initialize Firebase
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyCfSAygglteH5k5ur1UxQlQ__Vj4eGl7SU",
  authDomain: "hklii-bcd8f.firebaseapp.com",
  projectId: "hklii-bcd8f",
  storageBucket: "hklii-bcd8f.appspot.com",
  messagingSenderId: "999175109178",
  appId: "1:999175109178:web:abb1a20160952f115b5303",
  measurementId: "G-CPHKW7S17M"
};
firebase.initializeApp(firebaseConfig);
// firebase.auth().useEmulator('https://localhost');

// Now you can access the Firebase SDK anywhere in your extension's code
// For example:
const auth = firebase.auth();


// Sign in function
function signIn() {
    const userEmail = email.value;
    const userPassword = password.value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            // Redirect to dashboard or any other page
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

// Sign in with Google function
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result=>{
        console.log(result,"xxxxxx");
        
    })
    // console.log(firebase,provider);
    

}

console.log('firebase.js');