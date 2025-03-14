import logo from "@/assets/img/logo.png";

export default function Popup() {
  return (
    <div className="text-center size-full min-h-[600px] min-w-[400px] p-3 bg-gray-600">
      <header className="flex flex-col items-center justify-center text-white">
        <img alt="logo" className="h-36 pointer-events-none" src={logo} />
        <h1 className="text-2xl font-bold">ChatGPT Footprint Plugin.</h1>
      </header>
    </div>
  );
}
