chrome.runtime.onMessage.addListener((request) => {
  if (request === 'showOptions') chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});

try {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAy1cQNmS7ODhE1RpEDY-fMQsCJlff2QOQ",
    authDomain: "kennetp-28dbc.firebaseapp.com",
    projectId: "kennetp-28dbc",
    storageBucket: "kennetp-28dbc.appspot.com",
    messagingSenderId: "470579643823",
    appId: "1:470579643823:web:f16b4a343b2b2ee2039b5a"
  };
firebase.initializeApp(firebaseConfig);

const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('#login-email').value;
  const password = form.querySelector('#login-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // Login successful, close the popup
      window.close();
    })
    .catch((error) => {
      // An error occurred, show the error message
      alert(error.message);
    });
});

const toggleSignupBtn = document.querySelector('#toggle-signup-btn');
const signupForm = document.querySelector('#signup-form');

toggleSignupBtn.addEventListener('click', () => {
  form.style.display = 'none';
  toggleSignupBtn.style.display = 'none';
  signupForm.style.display = 'block';
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm.querySelector('#signup-email').value;
  const password = signupForm.querySelector('#signup-password').value;
  const confirmPassword = signupForm.querySelector('#confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Signup successful, close the popup
      window.close();
    })
    .catch((error) => {
      // An error occurred, show the error message
      alert(error.message);
    });
});

} catch (e) {
  console.error(e);
}
