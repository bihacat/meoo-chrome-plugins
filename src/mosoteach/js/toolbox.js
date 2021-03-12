import $ from 'jquery'

export const Toolbox = {
  // 折叠工具栏
  fold () {
    const _toolbox = $('.toolbox')
    if (_toolbox.hasClass('hidden')) {
      _toolbox.removeClass('hidden')
    } else {
      _toolbox.addClass('hidden')
    }
  }
}
