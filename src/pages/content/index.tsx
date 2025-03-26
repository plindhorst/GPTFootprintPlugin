/* eslint-disable @typescript-eslint/unbound-method */
import "@/assets/styles/tailwind.css";
import { bannerId, createBanner } from "@/pages/banner/Banner";
import { getText } from "@/utils";

let lastText = "";

// const observer = new MutationObserver(() => {
//   injectBanner();
// });

const containerQuery = "[class='relative z-[1] flex max-w-full flex-1 flex-col h-full']";
const injectBanner = () => {
  const text = getText();

  // prevent re-injecting
  if (!text || text === lastText) {
    return;
  }
  lastText = text;

  // remove existing banner
  if (document.getElementById(bannerId)) {
    document.getElementById(bannerId)?.remove();
  }

  // create new banner
  const container = document.querySelector(containerQuery);
  if (container) {
    createBanner(container, text);
  }
};

// run every 2s
setInterval(injectBanner, 2000);

// observer.observe(document.body, { childList: true, subtree: true });

// track history-based URL changes
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = (...args) => {
  originalPushState.apply(this, args);
  injectBanner();
};

history.replaceState = (...args) => {
  originalReplaceState.apply(this, args);
  injectBanner();
};

window.addEventListener("popstate", injectBanner);

try {
  console.log("Loaded banner script.");
} catch (e) {
  console.error(e);
}
