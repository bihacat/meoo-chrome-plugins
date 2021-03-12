import toolbox from './js/toolbox.html'
import { Hack as h } from './js/complete'
import { Toolbox as t } from './js/toolbox'
import $ from 'jquery'

$(document).ready(function () {
  console.log('ok')
  h.initial()
  $('body').append(toolbox) // 追加顶部工具栏
  $('.fold').click(function () {
    t.fold()
  })
  $('.reset').click(reset)
  $('.drag').click(canDrag)
  $('.complete').click(function () {
    h.allComplete()
  })
})

// 设置所有视频为可拖拽状态
function canDrag () {
  const all = document.querySelectorAll('.res-row-open-enable.res-row.preview') // 全部需要播放的视频
  for (const item of all) {
    const row = $(item)
    row.attr('data-drag', 'Y') // 将视频设置为能拖拽
  }
  alert('已全部可拖拽')
}

// 重置所有视频为可播放状态
function reset () {
  const all = document.querySelectorAll('.res-row-open-enable.res-row.preview') // 全部需要播放的视频
  for (const item of all) {
    const row = $(item)
    row.attr('data-drag', 'Y') // 将视频设置为能拖拽
    const resInfo = $(row.children('.res-info'))
    const box = $(resInfo.children('.create-box.manual-order-hide-part'))
    const dragBox = $(box.children()[6]) // 用于判断视频是否已看的标志标签
    dragBox.attr('data-is-drag', 'N')
    dragBox.text('已重置')
  }
  console.log('重置完成')
}
