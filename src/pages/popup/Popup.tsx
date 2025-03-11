import logo from '@assets/img/logo.png';

export default function Popup() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-600">
      <header className="flex flex-col items-center justify-center text-white">
        <img src={logo} className="h-36 pointer-events-none" alt="logo" />
        <h1 className="text-2xl font-bold">ChatGPT Footprint Plugin</h1>
      </header>
    </div>
  );
}
