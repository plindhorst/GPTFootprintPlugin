chrome.runtime.onMessage.addListener(async (request) => {
  const window = await chrome.windows.getCurrent();

  const height = 600;
  const width = 400;

  if (request == "openExtension") {
    chrome.windows.create({
      focused: true,
      height,
      left: window.width - width,
      top: 0,
      type: "popup",
      url: "src/pages/popup/index.html",
      width
    }, () => {
      console.log("Popup opened.");
    });
  }
});
