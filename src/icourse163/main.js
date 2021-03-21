let answerTime = 0;
$(document).ready(function () {
  try {
    mainScript()
  } catch (e) {
    console.log('捕获异常, 1秒后重新尝试', e)
    setTimeout(mainScript, 1000)
  }
})

function mainScript() {
  const video = $('video')
  video.onpause = function () {
    // 点击一个选项
    document.querySelector('').children[answerTime].querySelector('input').click()
    // 点击
    document.querySelector('.u-btn.u-btn-default.submit.j-submit').click()
    const answerDom = document.querySelector('.analysisInfo')
    const result = answerDom.attributes.class.textContent.split(' ').includes('answrong')
    if (result) {
      console.log('回答错误，视频回退5秒，重新答题')
      video.currentTime -= 5;
      answerTime += 1
    } else {
      console.log('回答正确，继续看视频', answerDom)
      answerTime = 0
    }
    $('.u-btn.u-btn-default.cont.j-continue').click()
  }
}
