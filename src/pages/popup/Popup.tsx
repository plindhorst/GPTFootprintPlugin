import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png"; 
import waterIcon from "../../assets/img/water.png"; 
import carIcon from "../../assets/img/car.png";
import bulbIcon from "../../assets/img/bulb.png";

const Popup = () => {
  const [tokens, setTokens] = useState(0); // State to store received tokens

  useEffect(() => {
    // Listen for messages from Banner.tsx
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "openExtension" && message.tokens !== undefined) {
        console.log("Received token count:", message.tokens);
        setTokens(message.tokens); // Update state with received tokens
      }
    });
  }, []);

  return (
    <div className="relative text-center size-full min-h-[600px] min-w-[400px] p-3 overflow-hidden">
      <header className="flex items-center justify-center gap-3">
        <img alt="logo" className="h-10 w-10 pointer-events-none" src={logo} />
        <h1 className="text-2xl font-bold">GreenChat</h1>
      </header>

      <div className="mt-6 text-left px-4">
        <h2 className="text-xl font-semibold mb-2">
          Your chat footprint is equivalent to:
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-white">
            <img src={waterIcon} alt="Water" className="h-6 w-6" />
            <span>10 litres of water used</span>
          </li>
          <li className="flex items-center gap-3 text-white">
            <img src={carIcon} alt="Car" className="h-6 w-6" />
            <span>50 km driven in a car</span>
          </li>
          <li className="flex items-center gap-3 text-white">
            <img src={bulbIcon} alt="Light Bulb" className="h-6 w-6" />
            <span>400 hours of light bulb use</span>
          </li>
        </ul>

        <p className="mt-4 text-sm text-gray-300 italic">
          Using search engines or online encyclopedias for basic queries can reduce energy consumption and help lower your carbon footprint.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Token count: <span className="font-bold">{tokens}</span>
        </p>
      </div>

      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-blue-400 hover:underline"
      >
        Learn more
      </a>
    </div>
  );
};

export default Popup;
