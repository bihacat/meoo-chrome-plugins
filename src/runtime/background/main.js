chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'hightlightIcon') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
