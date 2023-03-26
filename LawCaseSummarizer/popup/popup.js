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
