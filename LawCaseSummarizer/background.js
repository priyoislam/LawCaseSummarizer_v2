import { initializeApp } from "./firebase/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword ,
  GoogleAuthProvider,
  signInWithPopup
} from "./firebase/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfSAygglteH5k5ur1UxQlQ__Vj4eGl7SU",
  authDomain: "hklii-bcd8f.firebaseapp.com",
  projectId: "hklii-bcd8f",
  storageBucket: "hklii-bcd8f.appspot.com",
  messagingSenderId: "999175109178",
  appId: "1:999175109178:web:abb1a20160952f115b5303",
  measurementId: "G-CPHKW7S17M",
};
initializeApp(firebaseConfig);
let auth = getAuth();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message) {
    console.log(
      "password match and sending pass :",
      message.data[0],
      message.data[1]
    );

    // Perform async tasks
    const result = await performAsyncTasks();

    // Send a response back to the popup
    sendResponse({ response: "message received", result });

    //////////////

    createUserWithEmailAndPassword(auth, message.data[0], message.data[1]).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const operationType = userCredential.operationType;

        console.log("Signup successful!"); // add this line
        chrome.runtime.sendMessage({ type: "signup-success" });
        const _tokenResponse = userCredential._tokenResponse;

        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const expiresIn = _tokenResponse.expiresIn;
        const idToken = _tokenResponse.idToken;

        const kind = _tokenResponse.kind;
        const localId = _tokenResponse.localId;
        const authAccessToken = "";
        const authExpireIn = "";
        const authIdToken = "";
        const photoURL = user.photoURL;
        const providerId = user.providerId;
        const rawUserId = "";
        const rawUserInfo = "";
        const refreshToken = _tokenResponse.refreshToken;

        const uid = user.uid;

        console.log("====================================");
        console.log(expiresIn);
        console.log("==================================== id token ");
        console.log(idToken);
        console.log("====================================");
        console.log(kind);
        console.log("====================================");
        console.log(localId);
        console.log("====================================");
        console.log(refreshToken);
        console.log("====================================");
        console.log(displayName);
        console.log("====================================");
        console.log(email);
        console.log("====================================");
        console.log(emailVerified);
        console.log("====================================");
        console.log(photoURL);
        console.log("====================================");
        console.log(providerId);
        console.log("====================================");
        console.log(uid);
        console.log("==================================== xxxx");

        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${idToken}`);
        

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          "https://makebell.vercel.app/api/auth-check",
          requestOptions,
          idToken
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));

        // ..
      }
    );
  }
});

async function performAsyncTasks() {
  // Placeholder function for async tasks
  return "Async tasks completed";
}

// logInWithEmail 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.email && message.password) {
    console.log("Received message from popup:", message);
    const email= message.email
    const password= message.password
    // Do some processing with the email and password here
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('ssssssssssssssssssssssssssssss');
        
        
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    // Do some processing with the email and password here


    // Send a response back to the popup
    sendResponse({ response: "Message received" });
  }
});


// logInWithEmail 

// signinwithGoogle

// listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "loginWithGoogleBtn") {

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

   
  }
});
