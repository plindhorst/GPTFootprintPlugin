chrome.runtime.onMessage.addListener((request) => {
  if (request == "openExtension") {
    chrome.windows.create({
      focused: true,
      height: 600,
      type: "popup",
      url: "src/pages/popup/index.html",
      width: 400
    }, () => {
      console.log("Opened extension.");
    });
  }
});
