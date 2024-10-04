chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector("video");
  if (request.action === "play" && video) {
    video.play();
  } else if (request.action === "pause" && video) {
    video.pause();
  }
});
