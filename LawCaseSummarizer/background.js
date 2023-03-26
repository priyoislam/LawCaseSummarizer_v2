chrome.runtime.onMessage.addListener((request) => {
  if (request === 'showOptions') chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});
