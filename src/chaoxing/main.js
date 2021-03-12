import $ from 'jquery'

$(function () {
  reTriggerVideoTag();

  // 监听新课程播放
  const observer = new MutationObserver(function (mutation, observer) {
    console.log(mutation, observer, "节点变化");
    monitorIframeLoad();
  });
  observer.observe(document.querySelector("#mainid"), {
    childList: true,
    attributes: true,
  });

  monitorIframeLoad();
});

// 重新点击视频标签，避免第一个标签当前点击的不是视频
function reTriggerVideoTag() {
  $('.tabtags span[title="视频"]').trigger("click");
}

function monitorIframeLoad() {
  reTriggerVideoTag();
  $("#iframe").on("load", beginPlayVideo);
}
function beginPlayVideo() {
  console.log("loaded");
  const videoIframe = $("#iframe").contents().find("iframe").contents(); // 获取video所在的iframe
  console.log("get videoIframe", videoIframe);

  const bigPlayButton = videoIframe.find("button.vjs-big-play-button"); // 获取大播放按钮对象
  console.log("get bigPlayButton", bigPlayButton);
  bigPlayButton.trigger("click"); // 自动开始播放

  const v = videoIframe.find("video").get(0); // 获取video对象
  if (v === undefined) {
    console.log("未获取到video对象，1秒后重新获取");
    setTimeout(beginPlayVideo, 1000);
    return;
  }
  console.log("get video target", v);

  v.onpause = v.play; // 防止鼠标移出浏览器自动暂停
  console.log("video start play");

  v.onended = () => {
    const current = $(".ncells>.currents").parent();
    // 去下一个视频
    if (current.siblings().length === current.index()) {
      console.log('下一章')
      // 当前级别最后一个，跳转到下一章
      $(".ncells>.currents")
        .parent()
        .parent()
        .next()
        .children(".ncells:first")
        .children("h4")
        .children("a")
        .children("span")
        .click();
    } else {
      // 不是当前级别最后一个，跳转下一节
      console.log('下一节')
      $(".ncells>.currents")
        .parent()
        .next()
        .children("h4")
        .children("a")
        .children("span")
        .click();
    }
    monitorIframeLoad();
  };
}
