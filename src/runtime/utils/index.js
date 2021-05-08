/**
 * @param appName 目录名
 */
export const inject = (appName) => {
  chrome.runtime.sendMessage({action: 'hightlightIcon'})
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getApp') {
      sendResponse(appName)
    }
  })
}