

const loginWithEmailBtn = document.getElementById('login-button');
const loginWithGoogleBtn = document.getElementById('login-with-google-btn');
const signupBtn = document.getElementById('signup-button');
const chatGptLink = document.getElementById('chatGptLink');
const configLink = document.getElementById('configLink');

chrome.storage.local.get('ChatGPTFreeToken', function (result) {
  if (!result.ChatGPTFreeToken) {
    chatGptLink.style.display = 'inline';
    configLink.style.display = 'none';
  } else {
    chatGptLink.style.display = 'none';
    configLink.style.display = 'inline';
  }
});

let openOptionsPage = document.getElementById('openOptionsPage');

openOptionsPage.addEventListener('click', () => {
  chrome.runtime.sendMessage('showOptions');
});

//////////////////////////////////////////////

// Get the login and signup forms
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Get the toggle button and back button
const toggleSignupBtn = document.getElementById("toggle-signup-btn");
const backToLoginBtn = document.getElementById("back-to-login-btn");

// Handle form submission for login form
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the email and password input values
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Do something with the email and password values, such as sending them to a server for authentication
  console.log(`Logging in with email: ${email} and password: ${password}`);




});

// Handle form submission for signup form
signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the email, password, and confirm password input values
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;


  // Do something with the email, password, and confirm password values, such as sending them to a server for creating a new user account

////////////////////

async function checkPasswords() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  let FinalPassword;
  
  if (password === confirmPassword) {
    FinalPassword = password;
  } else {
    console.log("Passwords do not match");
    // or show an error message to the user
    return; // exit the function early if passwords do not match
  }
  
  // send message to background.js with email and FinalPassword
  chrome.runtime.sendMessage({type: 'my-message', data: [email, FinalPassword]}, function(response) {
    console.log('Response received:', response);
  });
}

checkPasswords();


  ///////////////////

  console.log(`Signing up with email: ${email} and password: ${password}`);

  // Clear the input fields
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("confirm-password").value = "";

  // Hide the signup form
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

// Toggle between login and signup forms
toggleSignupBtn.addEventListener("click", () => {
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    toggleSignupBtn.textContent = "Don't have an account? Signup here."; // Change the button text back to the original text
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleSignupBtn.textContent = "Already have an account? Login here."; // Change the button text to indicate that the user can go back to the login page
  }
});













