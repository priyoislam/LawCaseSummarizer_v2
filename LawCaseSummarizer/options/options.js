const apiKey = document.getElementById('apiKey');

const pageNotification = document.querySelector('#page-notification');
const notificationMessage = document.querySelector('#notification-message');
const closeNotificationButton = document.querySelector('#close-notification');

function showNotification(message) {
  notificationMessage.innerText = message;
  pageNotification.style.display = 'block';
  setTimeout(hideNotification, 2500);
}

function hideNotification() {
  pageNotification.style.display = 'none';
}

closeNotificationButton.addEventListener('click', hideNotification);

hideNotification();

chrome.storage.local.get('OpenAIToken', function (result) {
  if (result.OpenAIToken) apiKey.value = result.OpenAIToken;
});

chrome.storage.local.get('ChosenProvider', function (result) {
  const chatGptLink = document.getElementById('chatGptLink');
  const saveBtn = document.getElementById('save');
  const radioButtons = document.querySelectorAll('input[name="provider"]');

  chrome.storage.local.get('ChatGPTFreeToken', function (result) {
    if (!result.ChatGPTFreeToken) chatGptLink.style.display = 'inline';
    else chatGptLink.style.display = 'none';
  });

  if (!result.ChosenProvider) document.getElementById('webapp').checked = true;
  else document.getElementById(result.ChosenProvider).checked = true;

  saveBtn.addEventListener('click', () => {
    let selectedProvider;
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedProvider = radioButton.value;
        break;
      }
    }

    const valueToSave = apiKey.value;
    if (!valueToSave && selectedProvider === 'api') {
      pageNotification.style.backgroundColor = '#E54538';
      showNotification('Please provide an API Key');
    } else {
      pageNotification.style.backgroundColor = '#1FCD64';
      showNotification('Changes saved successfully.');
      chrome.storage.local.set({ OpenAIToken: valueToSave });
      chrome.storage.local.set({ ChosenProvider: selectedProvider });
    }
  });
});
