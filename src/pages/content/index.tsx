import { createRoot } from 'react-dom/client';
import './style.css'
// const div = document.createElement('div');
// div.id = '__plugin';
// document.body.appendChild(div);

const Announcement = () => (
    <div className="relative flex min-h-8 w-full items-center justify-center p-2 text-center text-xs text-yellow-300 md:px-[60px]">
        ChatGPT footprint plugin has been loaded.
    </div>
);

setTimeout(() => {
  const targetDiv = Array.from(document.querySelectorAll('div')).find(div => div.textContent?.trim() === 'ChatGPT can make mistakes. Check important info.');

  if (targetDiv) {
      const newDiv = document.createElement('div');
      newDiv.id = 'plugin_announcement';
      targetDiv.insertAdjacentElement('afterend', newDiv);
      createRoot(newDiv).render(<Announcement />);
  }
}, 1000); // Waits 1 second before executing

// const rootContainer = document.querySelector('#__plugin');
// if (!rootContainer) throw new Error("Can't find Content root element");
// const root = createRoot(rootContainer);
// root.render(
//   <div className='absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50'  >
//     content script <span className='your-class'>loaded</span>
//   </div>
// );

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
