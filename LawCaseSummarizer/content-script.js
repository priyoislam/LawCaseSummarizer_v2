
chrome.runtime.sendMessage("hello this is from content Script ", (response) => {
  console.log(response);
});



// // content-script.js
// const myElement = document.querySelector('p')
// console.log(myElement.innerText);


////////////////////////////////////////////////////////////////////////
// const headings = document.querySelectorAll('p.heading');
// const texts = [];

// for (let i = 0; i < headings.length; i++) {
//   const heading = headings[i];
//   const nextParagraphs = [];
//   let current = heading.nextElementSibling;

//   while (current && !current.classList.contains('heading') && current.tagName.toLowerCase() === 'p') {
//     nextParagraphs.push(current.textContent);
//     current = current.nextElementSibling;
//   }

//   texts[i] = nextParagraphs.join('\n');
// }

// console.log(texts);

// const API_URL = 'https://example.com/api';
// const payload = {
//   texts: texts
// };

// fetch(API_URL, {
//   method: 'POST',
//   body: JSON.stringify(payload),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));}


// //////////////////////////////////////////////////////////////////////////

// this is for every text content after every p tag contain classname heading / 

const headings = document.querySelectorAll('p.heading');
const texts = [];
const data ={};

for (let i = 0; i < headings.length; i++) {
  const heading = headings[i];
  const nextParagraphs = [];
  let current = heading.nextElementSibling;

  while (current && !current.classList.contains('heading')) {
    nextParagraphs.push(current.textContent);
    current = current.nextElementSibling;
  }

  texts[i] = nextParagraphs.join('\n');
  data[heading.textContent] = nextParagraphs.join('\n');
  
}

console.log(texts);
console.log(JSON.stringify(data));

fetch('https://example.com/api/endpoint', {
  // insert You API here , in line num ber 88
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response);
  
})
.catch(error => {
  console.log(error);
  
});




/////////////////////////////////////////////
// this is for only p tag  text content after every p tag that  contain classname heading / 

// const headings = document.querySelectorAll('p.heading');
// const texts = [];

// for (let i = 0; i < headings.length; i++) {
//   const heading = headings[i];
//   const nextParagraphs = [];
//   let current = heading.nextElementSibling;

//   while (current && !current.classList.contains('heading') && current.tagName.toLowerCase() === 'p') {
//     nextParagraphs.push(current.textContent);
//     current = current.nextElementSibling;
//   }

//   texts[i] = nextParagraphs.join('\n');
// }

// console.log(texts);

//////////////////////////////////////////////////////////







const ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const CHATGPT_WEBSITE = 'https://chat.openai.com/chat';
const CHATGPT_TOKEN_ENDPOINT = 'https://chat.openai.com/api/auth/session';
const AI_PROVIDER = 'ChosenProvider';
const OPENAI_TOKEN_NAME = 'OpenAIToken';
const CHATGPT_TOKEN_NAME = 'ChatGPTFreeToken';
const MODEL_NAME = 'gpt-3.5-turbo';
const MAX_PROMPT_CHARACTERS = 5100;
const MAX_TOKENS = 800;
const TEMPERATURE = 0;
const SUMMARY_DIV_WIDTH = '275px';
const SUMMARY_DIV_MIN_HEIGHT = '550px';
const SUMMARY_TITLE = 'Makebell';
const SUMMARY_IN_PROGRESS_TEXT = 'Summarizing the case is in progress ..';
const COPY_NOTIFICATION_DURATION = 1500;
const COPY_NOTIFICATION_TEXT = 'Summary copied !';

// COLORS
const ERROR_COLOR = '#C33939';
const ERROR_LINK_COLOR = '#08578F';
const SUMMARY_DIV_BACKGROUND_COLOR = '#DCDCDC';
const SPINNER_COLOR = '#C1C1C1';
const COPY_NOTIF_BACKGROUND_COLOR = '#9BD8A0';

// Error messages
const ERROR_CONFIG =
  'Please configure your API access first, then refresh this page : <br><br><a href="" id="openOptionsPage">Configure your API Access</a>';

const ERROR_401_TEXT = `<b style="color: ${ERROR_COLOR}">ERROR</b><br><br>There is a problem with your API Key, please check it then refresh this page. <br><br><a href="" id="openOptionsPageApiKey" style="text-decoration:none; color:${ERROR_LINK_COLOR} !important;">Check your API Access <i class="fa fa-external-link" style="font-size:15px"></i></a>`;

const ERROR_429_TEXT = `<b style="color: ${ERROR_COLOR}">ERROR</b><br><br>You are either sending requests too quickly, or exceeded your current quota. <br><br><a href="https://platform.openai.com/account/billing/limits" target="_blank" style="text-decoration:none; color:${ERROR_LINK_COLOR} !important;">Check your usage limit here <i class="fa fa-external-link" style="font-size:15px"></i></a>`;

const ERROR_500_TEXT = `<b style="color: ${ERROR_COLOR}">ERROR</b><br><br>The server had an error while processing your request. Please retry later. <br><br><a href="https://status.openai.com/" target="_blank" style="text-decoration:none; color:${ERROR_LINK_COLOR} !important;">Check ChatGPT status here <i class="fa fa-external-link" style="font-size:15px"></i></a>`;

const searchBody = document.getElementsByName('search_body')[0];
let OPEN_AI_API_KEY = '';

if (window.location.href.includes(CHATGPT_WEBSITE))
  fetch(CHATGPT_TOKEN_ENDPOINT)
    .then((response) => response.json())
    .then((responseJson) => {
      OPEN_AI_API_KEY = `Bearer ${responseJson.accessToken}`;
      chrome.storage.local.set({ ChatGPTFreeToken: OPEN_AI_API_KEY });
    });

chrome.storage.local.get(AI_PROVIDER, function (result) {
  if (result.ChosenProvider === 'api') {
    chrome.storage.local.get(OPENAI_TOKEN_NAME, function (result) {
      OPEN_AI_API_KEY = `Bearer ${result.OpenAIToken}`;
      main();
    });
  } else {
    chrome.storage.local.get(CHATGPT_TOKEN_NAME, function (result) {
      OPEN_AI_API_KEY = `${result.ChatGPTFreeToken}`;
      main();
    });
  }
});

function main() {
  const summarizeButton = document.createElement('button');
  summarizeButton.textContent = 'Summarize';
  if (searchBody) {
    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

    document.head.appendChild(stylesheet);

    const content = searchBody
      .getElementsByTagName('table')[0]
      .getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr')[0]
      .getElementsByTagName('td')[0];

    const summaryTitle = document.createElement('h2');
    
    summaryTitle.innerHTML = `${SUMMARY_TITLE} <i id="copyBtn" title="Copy summary" class="fa fa-copy" style="display=none; cursor: pointer; font-size: 19px; font-weight: bold; margin-left: 8px"></i> <i title="Extension options" id="openOptionsConfig" class="fa fa-cog" style="float: right; margin-left: 9px; cursor: pointer;"></i> <i title="Regenerate summary" id="restartSummary"class="fa fa-rotate-right" style="float: right; cursor: pointer;"></i>`;

    const summary = document.createElement('p');

    let newTD = document.createElement('td');
    newTD.style.width = '18%';
    newTD.style.marginLeft = '10px';
    newTD.style.display = 'flex';
    newTD.style.alignItems = 'flex-start';

    let newDiv = document.createElement('div');
    newDiv.style.minWidth = SUMMARY_DIV_WIDTH;
    newDiv.style.width = SUMMARY_DIV_WIDTH;
    newDiv.style.minHeight = SUMMARY_DIV_MIN_HEIGHT;
    newDiv.style.height = 'auto';
    newDiv.style.padding = '8px';
    newDiv.style.backgroundColor = SUMMARY_DIV_BACKGROUND_COLOR;
    newDiv.style.margin = '0 auto';
    newDiv.style.borderRadius = '15px';

    let hr = document.createElement('hr');
    const copyNotification = document.createElement('span');
    styleCopyNotification(copyNotification);

    newDiv.appendChild(copyNotification);
    newDiv.appendChild(summaryTitle);
    newDiv.appendChild(hr);
    newDiv.appendChild(summary);

    newTD.appendChild(newDiv);

    content.parentNode.insertBefore(newTD, content.nextSibling);

    let lawCaseText = Array.from(content.childNodes)
      .filter(
        (c) =>
          c.nodeName !== '-text' &&
          c.nodeName !== '-comment' &&
          !c.textContent.includes('_________________') &&
          c.textContent.trim().length
      )
      .map((p) =>
        p.textContent
          .trim()
          .replace(/[\r\n\t]+/g, ' ')
          .replace(/\s+/g, ' ')
      )
      .join('. ');

    let promptsArray = lawCaseText.match(
      new RegExp(`.{1,${MAX_PROMPT_CHARACTERS}}`, 'g')
    );

    let messages = [];
    let latestResponse = '';
    let openOptionsConfigBtn = document.getElementById('openOptionsConfig');

    openOptionsConfigBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage('showOptions');
    });

    callChatGPT();

    function callChatGPT() {
      let restartSummary2 = document.getElementById('restartSummary');
      restartSummary2.removeEventListener('click', callChatGPT);
      restartSummary2.style.color = 'gray';
      restartSummary2.style.cursor = 'not-allowed';
      restartSummary2.style.pointerEvents = 'none';

      let copyBtn = document.getElementById('copyBtn');
      copyBtn.style.display = 'none';

      if (OPEN_AI_API_KEY) {
        summary.innerHTML = `${SUMMARY_IN_PROGRESS_TEXT} <br><br> <div id="loading-spinner"></div>`;

        createSpinner();

        if (promptsArray.length && promptsArray.length === 1)
          callChatGPTForShortArticles();
        else callChatGPTForLongArticles();
      } else {
        summary.innerHTML = ERROR_CONFIG;
        let openOptionsPage = document.getElementById('openOptionsPage');
        openOptionsPage.addEventListener('click', () => {
          chrome.runtime.sendMessage('showOptions');
        });
      }
    }

    function callChatGPTForShortArticles() {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: 'user',
              content: `This is a law case report : "${promptsArray[0]}". Could you please List :
          -The sequence of events :
          -The cases cited :
          -The issues discussed :

          If nothing was found, just say : None mentioned.
          \n`,
            },
          ],
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
        }),
      })
        .then((response) => {
          checkErrors(response);
          return response.json();
        })
        .then((data) => {
          if (data.choices) {
            latestResponse = JSON.stringify(
              data.choices[0].message.content
                .trim()
                .replaceAll('\n', '<br>')
                .replaceAll('"', '*')
            );
          }
        })
        .then(() => {
          if (latestResponse) {
            let finalSummary = latestResponse
              .replaceAll('Sequence of events:', '<b>Sequence of events:</b>')
              .replaceAll('Cases cited:', '<b>Cases cited:</b>')
              .replaceAll('Issues discussed:', '<b>Issues discussed:</b>')
              .replaceAll('--', '-');
            let textToCopy = finalSummary
              .replaceAll('<br>', '\n')
              .replaceAll('<b>', '')
              .replaceAll('</b>', '');
            copyListener(textToCopy);
            insertSummary(finalSummary);
          }

          activateRestartBtn();
        });
    }

    function callChatGPTForLongArticles() {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: 'user',
              content: `This is a law case report : "${promptsArray[0]}". Could you please summarize and List if found :
          -The sequence of events :
          -List the cases cited :
          -List the issues discussed :
          Give only the keypoints without extra details. keep it short and concise as this will a summary of a very long article.
          \n`,
            },
          ],
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
        }),
      })
        .then((response) => {
          checkErrors(response);
          return response.json();
        })
        .then((data) => {
          if (data.choices) {
            latestResponse = JSON.stringify(
              data.choices[0].message.content
                .trim()
                .replaceAll('\n', '<br>')
                .replaceAll('"', '*')
            );
          }
        })
        .then(() => {
          if (latestResponse.length) makePostCalls();
          activateRestartBtn();
        });
    }

    function checkErrors(response) {
      if (response.status === 401) {
        summary.innerHTML = ERROR_401_TEXT;
        let openOptionsPage = document.getElementById('openOptionsPageApiKey');
        openOptionsPage.addEventListener('click', () => {
          chrome.runtime.sendMessage('showOptions');
        });
      } else if (response.status === 429) summary.innerHTML = ERROR_429_TEXT;
      else if (response.status === 500) summary.innerHTML = ERROR_500_TEXT;
    }

    function copyListener(latestResponse) {
      let copyBtn = document.getElementById('copyBtn');
      copyBtn.style.display = 'inline';
      copyBtn.addEventListener('click', () => {
        showCopyNotification();
        navigator.clipboard.writeText(latestResponse.trim()).then(() => {
          setTimeout(hideCopyNotification, COPY_NOTIFICATION_DURATION);
        });
      });
    }

    function hideCopyNotification() {
      let copyNotification = document.getElementById('copyNotification');
      copyNotification.style.visibility = 'hidden';
    }

    function showCopyNotification() {
      let copyNotification = document.getElementById('copyNotification');
      copyNotification.style.visibility = 'visible';
    }

    async function makePostCalls() {
      messages.push({});
      messages.push({});
      messages.push({});

      for (let i = 1; i < promptsArray.length; i++) {
        try {
          messages[0] = {
            role: 'user',
            content: `This is a law case report : "${promptsArray[0]}". Could you please List :
          -The sequence of events :
          \n`,
          };

          messages[1] = {
            role: 'assistant',
            content: latestResponse.replaceAll('"', ''),
          };

          messages[2] = {
            role: 'user',
            content: `based on your previous response, give me the rest of the sequence events using this new part of the law case : "${promptsArray[i]}". Summarize only the keypoints without extra details, keep it short and concise, as this will be a summary of a very long article and Answer like this :
          -The sequence of events :
          -List the cases cited :
          -List the issues discussed :
          \n`,
          };
          const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `${OPEN_AI_API_KEY}`,
            },
            body: JSON.stringify({
              model: MODEL_NAME,
              messages,
              max_tokens: MAX_TOKENS,
              temperature: TEMPERATURE,
            }),
          });
          const data = await response.json();
          latestResponse = JSON.stringify(
            data.choices[0].message.content
              .trim()
              .replaceAll('\n', '<br>')
              .replaceAll('"', '*')
          );
        } catch (error) {}
      }

      let finalSummary = latestResponse
        .replaceAll('Sequence of events:', '<b>Sequence of events:</b>')
        .replaceAll('Cases cited:', '<b>Cases cited:</b>')
        .replaceAll('Issues discussed:', '<b>Issues discussed:</b>')
        .replaceAll('--', '-');

      let textToCopy = finalSummary
        .replaceAll('<br>', '\n')
        .replaceAll('<b>', '')
        .replaceAll('</b>', '');
      copyListener(textToCopy);
      insertSummary(finalSummary);
    }

    // Insert summary into the HTML
    function insertSummary(text) {
      summary.innerHTML = '';
      const sections = text.split(/<b>(.*?)<\/b>/); // split the text into sections using <b> tags as titles
      const container = document.createElement('div'); // create a container element to hold the sections
      let titles = [];
      const headerNavigation = document.createElement('div');
      headerNavigation.style.display = 'flex';
      headerNavigation.style.justifyContent = 'space-between';

      for (let i = 1; i < sections.length; i += 2) {
        const title = sections[i].trim(); // get the title text
        const titleSpan = document.createElement('span');
        titleSpan.innerHTML = title.replaceAll(':', '');
        titleSpan.style.fontSize = '10px';
        titleSpan.style.fontWeight = 'bold';
        titleSpan.style.cursor = 'pointer';
        titleSpan.id = i;

        titles.push(titleSpan);
        headerNavigation.appendChild(titleSpan);
        const content = sections[i + 1].replace(/^<br>|<br>$/g, '').trim(); // get the content text and remove extra whitespace and <br> tags

        const sectionContainer = document.createElement('div'); // create a container element for each section
        const titleElement = document.createElement('h4'); // create an h2 element for the title
        titleElement.id = `section${i}`;
        sectionContainer.appendChild(titleElement); // add the title element to the section container

        const contentElement = document.createElement('p'); // create a p element for the content
        sectionContainer.appendChild(contentElement); // add the content element to the section container

        container.appendChild(sectionContainer); // add the section container to the main container

        typeText(title, titleElement); // type out the title element
        typeText(content, contentElement); // type out the content element
      }

      summary.appendChild(headerNavigation);
      summary.appendChild(hr);
      summary.appendChild(container); // add the main container to the document body

      titles.forEach((titleSpan) => {
        const header = document.getElementById(`section${titleSpan.id}`);
        titleSpan.addEventListener('click', function () {
          header.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    function activateRestartBtn() {
      let restartSummary = document.getElementById('restartSummary');
      restartSummary.removeEventListener('click', callChatGPT);
      restartSummary.style.color = 'black';
      restartSummary.style.cursor = 'pointer';
      restartSummary.style.pointerEvents = '';
      restartSummary.addEventListener('click', callChatGPT);
    }

    // Typing animation function
    function typeText(text, element, callback) {
      let i = 0;
      element.innerHTML = '';
      function addChar() {
        if (i < text.length) {
          const char = text.charAt(i);
          if (char === '<') {
            const endIndex = text.indexOf('>', i) + 1;
            element.innerHTML += text.slice(i, endIndex);
            i = endIndex;
          } else {
            element.innerHTML += char;
            i++;
          }
          setTimeout(addChar, 5); // adjust typing speed here
        } else if (callback) {
          callback();
        }
      }
      addChar();
    }

    function createSpinner() {
      const loadingSpinner = document.getElementById('loading-spinner');

      loadingSpinner.style.display = 'block';
      loadingSpinner.style.top = '50%';
      loadingSpinner.style.left = '50%';
      loadingSpinner.style.textAlign = 'center';
      loadingSpinner.style.marginLeft = '56%';
      loadingSpinner.style.marginTop = '30%';
      loadingSpinner.style.transform = 'translate(-50%, -50%)';

      const spinner = document.createElement('div');
      spinner.style.display = 'block';
      spinner.style.width = '50px';
      spinner.style.height = '50px';
      spinner.style.margin = '8px';
      spinner.style.borderRadius = '50%';
      spinner.style.border = `6px solid ${SPINNER_COLOR}`;
      spinner.style.borderColor = `${SPINNER_COLOR} transparent ${SPINNER_COLOR} transparent`;
      spinner.style.animation = 'loading-spinner 1.2s linear infinite';
      loadingSpinner.appendChild(spinner);

      const keyframes = `@keyframes loading-spinner {0% {transform: rotate(0deg);}100% {transform: rotate(360deg);}}`;

      const style = document.createElement('style');
      style.appendChild(document.createTextNode(keyframes));
      document.getElementsByTagName('head')[0].appendChild(style);
    }

    function styleCopyNotification(copyNotification) {
      copyNotification.innerHTML = COPY_NOTIFICATION_TEXT;
      copyNotification.id = 'copyNotification';
      copyNotification.style.textAlign = 'center';
      copyNotification.style.fontSize = '12px';
      copyNotification.style.marginLeft = '27%';
      copyNotification.style.width = '100%';
      copyNotification.style.padding = '6px';
      copyNotification.style.color = 'black';
      copyNotification.style.backgroundColor = COPY_NOTIF_BACKGROUND_COLOR;
      copyNotification.style.marginTop = '6px';
      copyNotification.style.borderRadius = '15px';
      copyNotification.style.visibility = 'hidden';
    }

    
  }
}

