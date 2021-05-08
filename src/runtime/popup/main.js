const sendMessage = (obj, resp) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, obj, resp)
  })
}

$(function() {
  // 根据app不同，显示不同的按钮
  sendMessage({action: 'getApp'}, (resp) => { $(`#${resp}`).show() })

  MRRTV()
  
})

/// m.rr.tv 功能区
function MRRTV() {
  // 获取自动网页全屏
  const autoFullScreen = parseInt(localStorage.getItem('mrrtv-auto'))
  if (isNaN(autoFullScreen)) {
    $('#mrrtv-fullscreen-auto').prop('checked', true);
    localStorage.setItem('mrrtv-auto', 1);
  } else if (autoFullScreen === 1) {
    $('#mrrtv-fullscreen-auto').prop('checked', true);
  }
  // 触发网页全屏
  $('#mrrtv input[type="radio"][name="fullscreen"]').on('change', function() {
    sendMessage({ action: {full: 'webFullScreen', unfull: 'webUnFullScreen'}[$(this).val()] })
  });
  // 修改自动网页全屏
  $('#mrrtv input[type="checkbox"][name="auto"]').on('change', function () {
    const value = $('#mrrtv input[type="checkbox"][name="auto"]:checked').val() === 'auto' ? '1' : '0';
    localStorage.setItem('mrrtv-auto', value);
    sendMessage({ action: 'auto', value })
  })
}