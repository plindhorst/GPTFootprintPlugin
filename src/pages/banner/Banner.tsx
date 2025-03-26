import { EXTENSION_PREFIX } from "@/assets/constants";
import { countTokens } from "@/utils";
import { FC, useState } from "react";
import { createRoot } from "react-dom/client";

export const bannerId = `${EXTENSION_PREFIX}-banner`;
const bannerClass = "bottom-full left-0 right-0 z-20";

export const createBanner = (container: Element, text: string) => {
  const banner = document.createElement("div");
  banner.className = bannerClass;
  banner.id = bannerId;

  container.insertAdjacentElement("beforebegin", banner);
  createRoot(banner).render(<Banner text={text} />);
};

type BannerProps = { text: string };
const Banner: FC<BannerProps> = ({ text }) => {
  const handleClick = () => {
    chrome.runtime.sendMessage("openExtension").catch(console.error);
  };

  const [isVisible, setIsVisible] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false); // Hide the banner when the close button is clicked
    setIsButtonVisible(true); // Show the small button after closing the banner
  };

  const handleShowBanner = () => {
    setIsVisible(true); // Show the banner when the small button is clicked
    setIsButtonVisible(false); // Hide the small button
  };

  // const ref = useRef<HTMLButtonElement | null>(null);

  const tokens = countTokens(text);

  if (!isVisible) {
    return (
      // The small round button that appears when the banner is closed
      isButtonVisible && (
        <button
          aria-label="Show banner"
          className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={handleShowBanner}
        >
          <img
            alt="Show banner"
            className="w-6 h-6" // You can adjust the width and height to fit your design
            src={chrome.runtime.getURL("logo.png")} // Path to your image
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
                  You have emitted between
                  {" "}
                  {tokens * 0.0002574}
                  {" "}
                  and
                  {" "}
                  {tokens * 0.0002145}
                  {" "}
                  g of CO2 in this conversation. Token count:
                  {" "}
                  {tokens}
                  .
                </div>
              </div>
              <div className="flex shrink-0 gap-2 md:pb-0">
                <button className="btn relative btn-primary shrink-0">
                  <div className="flex items-center justify-center" onClick={handleClick}>More info</div>
                </button>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:bg-token-main-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-quaternary focus-visible:ring-offset-1 focus-visible:ring-offset-transparent dark:hover:bg-token-main-surface-tertiary"
                  data-testid="close-button"
                  onClick={handleClose}
                >
                  <svg className="icon-md" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z" fill="currentColor" fill-rule="evenodd">
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

export default Banner;
