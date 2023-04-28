import { initializeApp } from "./firebase/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "./firebase/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAy1cQNmS7ODhE1RpEDY-fMQsCJlff2QOQ",
    authDomain: "kennetp-28dbc.firebaseapp.com",
    projectId: "kennetp-28dbc",
    storageBucket: "kennetp-28dbc.appspot.com",
    messagingSenderId: "470579643823",
    appId: "1:470579643823:web:f16b4a343b2b2ee2039b5a"
};
initializeApp(firebaseConfig);
let auth = getAuth();

console.log("k");
createUserWithEmailAndPassword(auth, "helloNOORxxx@gmail.com", "sjkhbsdjidfhuifh478ry287rixxx")
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential);
        // ...
    })
    .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    })



    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(message);
        console.log(sender);
        sendResponse('received From content Script');
      });
      
