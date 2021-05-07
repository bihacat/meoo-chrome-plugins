chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  chrome.pageAction.show(tabs[0].id);
});

$(function() {
  // 根据app不同，显示不同的按钮
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, { todo: 'app'}, function(resp) {
      $(`#${resp}`).show()
    })
  });

  $('.full-screen').click(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'fullScreen' })
    })
  })
})
