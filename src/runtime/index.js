/**
 * @param appName app名
 */
export const inject = (appName) => {
  chrome.runtime.sendMessage({todo: 'showPageAction'})
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.todo === 'app') {
      sendResponse(appName)
    }
  })
}
