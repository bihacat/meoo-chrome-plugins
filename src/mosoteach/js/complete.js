import $ from 'jquery'

export const Hack = {
  initial () {
    $(document.head).append('<style>.ac-btn{border: none padding: 4px 8px margin-top: 8px}.ac-btn:hover{background-color: #eee}</style>')
    this.el_allVideo().forEach(item => {
      const button = $('<button class="ac-btn">一键完成</button>')
      button.data('row', item)
      const that = this
      button.click(function () {
        button.attr('disabled', true)
        const clazzCourseId = that.getQueryVariable('clazz_course_id')
        const v = document.getElementById('hackVideo')
        that.autoComplete($(this).data('row'), clazzCourseId, v)
      })
      $(item).before(button)
    })
  },

  // 获取浏览器地址参数
  getQueryVariable (name) {
    const url = decodeURI(location.search) // 获取url中"?"符后的字串(包括问号)
    if (url.indexOf('?') !== -1) {
      const str = url.substr(1)
      const pairs = str.split('&')
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=')
        if (pair[0] === name) return pair[1] // 返回 参数值
      }
    }
    return false
  },

  el_allVideo () {
    return document.querySelectorAll('.res-row-open-enable.res-row.preview') // 全部需要播放的视频
  },

  el_resInfo (row) {
    return $($(row).children('.res-info'))
  },

  el_box (row) {
    return $(this.el_resInfo(row).children('.create-box.manual-order-hide-part'))
  },

  el_dragBox (row) {
    return $(this.el_box(row).children()[6])
  },

  // 获取全部未播放的视频标签
  videoNotDrag () {
    const result = []
    this.el_allVideo().forEach(item => {
      const isDrag = this.el_dragBox(item).attr('data-is-drag') // 用于判断视频是否已看
      if (isDrag === 'N') { // Y：视频已看，N：视频未看
        result.push(item)
      }
    })
    return result
  },

  setHacked (row, text) {
    console.log(row)
    $(row.find('.res-name'))[0].append(' - ' + text)
  },

  allComplete () {
    const rows = this.videoNotDrag()
    const clazzCourseId = this.getQueryVariable('clazz_course_id')
    const v = document.getElementById('hackVideo')
    rows.forEach(row => {
      this.autoComplete(row, clazzCourseId, v)
    })
    alert('视频已全部播放完毕，请刷新网页查看是否有遗漏')
  },

  autoComplete (rowEl, clazzCourseId, v) {
    return new Promise(resolve => {
      const row = $(rowEl)
      this.setHacked(row, '正在播放')
      v.onloadedmetadata = () => {
        this.savePlayDuration(clazzCourseId, row.data('value'), v.duration).then(() => {
          setTimeout(() => {
            this.setHacked(row, '已完成')
            $('.ac-btn').attr('disabled', false)
            resolve()
          }, 3000)
        })
      }
      v.src = row.data('href')
    })
  },

  // 保存播放进度
  savePlayDuration (clazzCourseId, resId, duration) {
    return new Promise(resolve => {
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'https://www.mosoteach.cn/web/index.php?c=res&m=save_watch_to',
        data: {
          clazzCourseId,
          resId,
          watch_to: Math.ceil(duration),
          duration: Math.ceil(duration),
          current_watch_to: 1
        },
        success: function () {
          resolve()
        }
      })
    })
  }
}
