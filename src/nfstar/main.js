
$(document).ready(function () {
  $('.stui-pannel_hd').remove()

  document.querySelectorAll('strong').forEach(item => {
    if ($(item).text() === '广告') {
      // $(item).closest('.myui-panel').remove()
      $(item).parent().next().remove()
      $(item).remove()
    }
  })
})

let isFull = false

$('#playleft iframe').on('load', function () {
  setTimeout(() => {
    $('button.yzmplayer-icon.yzmplayer-full-in-icon', this.contentDocument).click(function () {
      isFull = !isFull
      fullScreen()
    })
  }, 1000)

  $(this.contentDocument).keydown(function (e) {
    if (e.keyCode === 27) {
      isFull = false
      fullScreen()
    }
  })
})

function fullScreen () {
  if (isFull) {
    $('.myui-player .container').css({ padding: 0, zIndex: 999, left: 0, top: 0, bottom: 0, right: 0 })
    $('header').hide()
    $('.col-lg-wide-25.col-md-wide-35.padding-0').hide()
    $('#player-left').css({ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, right: 0 })
    $('.myui-extra.clearfix').hide()
  } else {
    $('.myui-player .container').attr('style', '')
    $('header').show()
    $('.col-lg-wide-25.col-md-wide-35.padding-0').show()
    $('#player-left').attr('style', '')
    $('.myui-extra.clearfix').show()
  }
}
