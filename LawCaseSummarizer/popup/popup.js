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
////////////////////////////

const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");
const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");

signupButton.addEventListener("click", () => {
  loginSection.style.display = "none";
  signupSection.style.display = "block";
});

loginButton.addEventListener("click", () => {
  signupSection.style.display = "none";
  loginSection.style.display = "block";
});

