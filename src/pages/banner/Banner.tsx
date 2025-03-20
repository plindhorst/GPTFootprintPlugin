import { EXTENSION_PREFIX } from "@/assets/constants";
import { countTokens } from "@/utils";
import { FC, useEffect, useRef } from "react";
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

  const ref = useRef<HTMLButtonElement | null>(null);

  const tokens = countTokens(text);

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
                  You have emitted 0.0 kg of CO2 in this conversation. Token count:
                  {" "}
                  {tokens}
                  .
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

export default Banner;
