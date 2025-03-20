import logo from "../../assets/img/logo.png";

const Popup = () => (
  <div className="relative text-center size-full min-h-[600px] min-w-[400px] p-3 overflow-hidden">
    <header className="flex items-center justify-center gap-3">
      <img alt="logo" className="h-10 w-10 pointer-events-none" src={logo} />
      <h1 className="text-2xl font-bold">ChatGPT Footprint Plugin</h1>
    </header>

    <div className="mt-6 text-left px-2">
      <h2 className="text-xl font-semibold mb-2">
        Your chat footprint is equivalent to:
      </h2>
      <ul className="list-disc list-inside text-white">
        <li>10 litres of water used</li>
        <li>50 km driven in a car</li>
        <li>400 hours of light bulb use</li>
      </ul>

      <p className="mt-4 text-sm text-gray-300 italic">
        Using search engines or online encyclopedias for basic queries can
        reduce energy consumption and help lower your carbon footprint.
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

export default Popup;
