chrome.runtime.onMessage.addListener((request) => {
  const handler = async () => {
    const window = await chrome.windows.getCurrent();

    const height = 600;
    const width = 400;

if (request.type === "openExtension") {
      chrome.windows.create({
        focused: true,
        height,
        left: (window.width ?? 1920) - width,
        top: 0,
        type: "popup",
        url: `src/pages/popup/index.html?tokens=${encodeURIComponent(request.tokens)}`,
        width
      }, () => {
        console.log("Popup opened.");
      });
    }
  };

  handler().catch(console.error);
});
