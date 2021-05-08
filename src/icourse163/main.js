import { inject } from '../runtime/utils';

inject('icourse163');

let answerTime = 0;
document.onreadystatechange = function () {
  switch (document.readyState) {
    case "complete":
      mainScript()
      break;
  }
}

function mainScript() {
  const video = document.querySelector('video')
  video.onpause = () => autoAnswer(video)
}

function autoAnswer(video) {
  // 点击一个选项
  console.log('paused')
  const answerContainer = document.querySelector('.choices.f-cb')
  if (!answerContainer) {
    console.log('获取答题区域失败，1秒后重新获取');
    setTimeout(autoAnswer, 1000);
    return
  };

  answerContainer.children[answerTime].querySelector('input').click()
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
  document.querySelector('.u-btn.u-btn-default.cont.j-continue').click()
}
