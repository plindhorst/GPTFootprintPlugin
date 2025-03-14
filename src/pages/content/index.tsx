import { useEffect, useRef } from "react";

import "./style.css";

import { createRoot } from "react-dom/client";
// const div = document.createElement('div');
// div.id = '__plugin';
// document.body.appendChild(div);

// const Announcement = () => (
//   <div className="mb-3 z-[100] w-full text-center mx-auto empty:hidden">
//     <div className="inline-flex rounded-xl border border-gray-100 dark:border-gray-700">
//       <div className="flex items-center justify-center gap-4 px-4 py-3 text-sm text-yellow-300">
//         Plugin has been loaded.
//         {" "}
//         <p className="text-token-text-secondary">More info...</p>
//       </div>
//     </div>
//   </div>
// );

const pluginClass = "bottom-full left-0 right-0 z-20";

const Announcement2 = () => {
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

const findAdjacent = () => {
  const container = document.querySelector("[class='group relative z-[1] flex w-full items-center']");
  return container;
};

const _findParent = () => {
  const chats = document.querySelectorAll(".group\\/conversation-turn");
  const lastChat = chats[chats.length - 1];

  return lastChat;
};

const observer = new MutationObserver((mutations, observer) => {
  const container = findAdjacent();

  if (container && !document.getElementById("plugin_announcement")) {
    const pluginDiv = document.createElement("div");
    pluginDiv.className = pluginClass;
    pluginDiv.id = "plugin_announcement";

    container.insertAdjacentElement("beforebegin", pluginDiv);
    createRoot(pluginDiv).render(<Announcement2 />);

    // const button = document.getElementById("plugin_announcement").querySelector("button");
    // if (button) {
    //   button.addEventListener("click", () => {
    //     chrome.runtime.sendMessage("openExtension");
    //   });
    // }

    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// const rootContainer = document.querySelector('#__plugin');
// if (!rootContainer) throw new Error("Can't find Content root element");
// const root = createRoot(rootContainer);
// root.render(
//   <div className='absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50'  >
//     content script <span className='your-class'>loaded</span>
//   </div>
// );

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
