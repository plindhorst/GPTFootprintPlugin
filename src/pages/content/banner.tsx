import { EXTENSION_PREFIX } from "@/assets/constants";
import { useEffect, useRef } from "react";
import "@/assets/styles/tailwind.css";
import { createRoot } from "react-dom/client";

const bannerId = `${EXTENSION_PREFIX}-banner`;
const pluginClass = "bottom-full left-0 right-0 z-20";

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
  return texts.join("\n");
};

const Banner = () => {
  const handleClick = () => {
    chrome.runtime.sendMessage("openExtension");
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
                  You have emitted 0.0 kg of CO2 in this conversation.
                </div>
              </div>
              <div className="flex shrink-0 gap-2 md:pb-0">
                <button className="btn relative btn-primary shrink-0" ref={ref}>
                  <div className="flex items-center justify-center">More info</div>
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
