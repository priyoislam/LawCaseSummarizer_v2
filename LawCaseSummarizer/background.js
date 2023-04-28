import { initializeApp } from "./firebase/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "./firebase/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAy1cQNmS7ODhE1RpEDY-fMQsCJlff2QOQ",
  authDomain: "kennetp-28dbc.firebaseapp.com",
  projectId: "kennetp-28dbc",
  storageBucket: "kennetp-28dbc.appspot.com",
  messagingSenderId: "470579643823",
  appId: "1:470579643823:web:f16b4a343b2b2ee2039b5a",
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

    createUserWithEmailAndPassword(auth, message.data[0], message.data[1])
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
      });
  }
});


async function performAsyncTasks() {
  // Placeholder function for async tasks
  return "Async tasks completed";
}
