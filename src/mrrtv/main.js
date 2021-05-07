import { inject } from '../runtime'

inject('mrrtv')

chrome.runtime.onMessage.addListener((request) => {
  if (request.todo === 'fullScreen') {
    $('body').css({ margin: 0, maxWidth: 'unset' })
    $('.top-bar .search-wrap').css({ position: 'unset', width: 'unset' })
    $('.search-fixed').remove()
    $('video').css({height: 'unset'})
  }
})
