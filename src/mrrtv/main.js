import { inject } from '../runtime/utils'

inject('mrrtv')

const fullScreen = () => {
  $('body').css({ margin: 0, maxWidth: 'unset' })
  $('.top-bar .search-wrap').css({ position: 'unset', width: 'unset' })
  $('.search-fixed').hide()
  $('video').css({height: 'unset'})
}

$(function () {
  const autoFullScreen = parseInt(localStorage.getItem('autoFullScreen'));
  if (isNaN(autoFullScreen)) {
    fullScreen();
    localStorage.setItem('autoFullScreen', 1);
  } else if (autoFullScreen === 1) {
    fullScreen();
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'webFullScreen') {
    fullScreen()
  } else if (request.action === 'auto') {
    localStorage.setItem('autoFullScreen', request.value)
  }
})
