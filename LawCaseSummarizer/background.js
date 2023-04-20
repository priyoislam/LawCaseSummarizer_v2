chrome.runtime.onMessage.addListener((request) => {
  if (request === 'showOptions') chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});

try {
  // you need to manually have firebase-compat.js file in your dir
self.importScripts('firebase.js');

const config = {
  apiKey: "AIzaSyCfSAygglteH5k5ur1UxQlQ__Vj4eGl7SU",
  authDomain: "hklii-bcd8f.firebaseapp.com",
  projectId: "hklii-bcd8f",
  storageBucket: "hklii-bcd8f.appspot.com",
  messagingSenderId: "999175109178",
  appId: "1:999175109178:web:abb1a20160952f115b5303",
  measurementId: "G-CPHKW7S17M"
};
firebase.initializeApp(config);

var db = firebase.firestore();

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.command === "post") {
          // in here, you can use both firebase and data from popup view
    console.log(request.data);
          return true;
  }
});
} catch (e) {
console.error(e);}

// cross oregi wild js 

