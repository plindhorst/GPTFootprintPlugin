import { EXTENSION_PREFIX } from "@/assets/constants";
import React, { useState, useEffect, useRef } from 'react';
import "@/assets/styles/tailwind.css";
import { createRoot } from "react-dom/client";

const bannerId = `${EXTENSION_PREFIX}-banner`;
const pluginClass = "bottom-full left-0 right-0 z-20";
var tokenCount = 0;

const fetchConversations = () => {
  const chats = document.querySelectorAll("div[data-message-author-role=\"assistant\"], div[data-message-author-role=\"user\"]");
  const _numberOfChats = chats.length;
  const texts = [];

  chats.forEach((chat, _idx) => {
    const text = chat.textContent.trim();
    texts.push(text);
    // console.log(idx, text);
  });

  console.log(texts.join("\n"));
  tokenCount = countTokens(texts.join("\n"))

  console.log(tokenCount)
  return texts.join("\n");
};

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const handleClick = () => {
    chrome.runtime.sendMessage("openExtension");
  };

  const handleClose = () => {
    setIsVisible(false); // Hide the banner when the close button is clicked
    setIsButtonVisible(true); // Show the small button after closing the banner
  };

  const handleShowBanner = () => {
    setIsVisible(true); // Show the banner when the small button is clicked
    setIsButtonVisible(false); // Hide the small button
  };

  const ref = useRef(null);

  useEffect(() => {
    const button = ref.current;

    if (button) {
      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("click", handleClick);
      };
    }
  }, []);

  if (!isVisible) {
    return (
      // The small round button that appears when the banner is closed
      isButtonVisible && (
        <button
        onClick={handleShowBanner}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:outline-none"
        aria-label="Show banner"
      >
        <img
          src={chrome.runtime.getURL("logo.png")}  // Path to your image
          alt="Show banner"
          className="w-6 h-6" // You can adjust the width and height to fit your design
        />
        </button>
      )
    );
  }

  return (
    <div className="relative size-full">
      <div className="mb-2 flex flex-col gap-3.5">
        <div
          className="flex w-full items-start gap-4 rounded-3xl border py-4 pl-5 pr-3 text-sm [text-wrap:pretty] dark:border-transparent lg:mx-auto shadow-xxs md:items-center border-token-border-light bg-token-main-surface-primary text-token-text-primary dark:bg-token-main-surface-secondary"
        >
          <div
            className="flex size-full items-start gap-3 md:items-center"
          >
            <div className="mt-1.5 flex grow items-start gap-4 md:mt-0 md:flex-row md:items-center md:justify-between md:gap-8 flex-col">
              <div className="flex flex-col">
                <div className="font-bold text-token-text-primary">
                  Footprint
                </div>
                <div className="text-token-text-secondary">
                  You have emitted 0.0 kg of CO2 in this conversation. Token Count = {tokenCount}.
                </div>
              </div>
              <div className="flex shrink-0 gap-2 md:pb-0">
                <button className="btn relative btn-primary shrink-0" ref={ref}>
                  <div className="flex items-center justify-center">More info</div>
                </button>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button data-testid="close-button" className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:bg-token-main-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-quaternary focus-visible:ring-offset-1 focus-visible:ring-offset-transparent dark:hover:bg-token-main-surface-tertiary"
                  aria-label="Close"
                  onClick={handleClose}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z" fill="currentColor">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const findSearchContainer = () => {
  const container = document.querySelector("[class='group relative z-[1] flex w-full items-center']");
  return container;
};

// let lastURL = window.location.href;

const observer = new MutationObserver(() => {
  fetchConversations();
  injectPluginDiv();
});

const injectPluginDiv = () => {
  // const currentURL = window.location.href;

  // prevent re-injecting
  if (document.getElementById(bannerId)) {
    return;
  }

  // lastURL = currentURL;

  const container = findSearchContainer();
  if (container) {
    const pluginDiv = document.createElement("div");
    pluginDiv.className = pluginClass;
    pluginDiv.id = bannerId;

    container.insertAdjacentElement("beforebegin", pluginDiv);
    createRoot(pluginDiv).render(<Banner />);
  }
};

observer.observe(document.body, { childList: true, subtree: true });

// track history-based URL changes
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = (...args) => {
  originalPushState.apply(this, args);
  fetchConversations();
  injectPluginDiv();
};

history.replaceState = (...args) => {
  originalReplaceState.apply(this, args);
  fetchConversations();
  injectPluginDiv();
};

window.addEventListener("popstate", fetchConversations);
window.addEventListener("popstate", injectPluginDiv);
window.addEventListener("popstate", Banner);


try {
  console.log("Banner loaded");
} catch (e) {
  console.error(e);
}

function countTokens(text: String) {
  // Match camelCase, full words, numbers, and punctuation separately
  const matches = text.match(/([A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+|[^\s\w]+|[^\s\w])/g);
  return matches.length;
}
