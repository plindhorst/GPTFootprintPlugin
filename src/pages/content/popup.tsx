// import { EXTENSION_PREFIX } from "@/assets/constants";
// import Popup from "@/pages/popup/Popup";
// import { createRoot } from "react-dom/client";

// const popupId = `${EXTENSION_PREFIX}-popup`;

// const showPopup = () => {
//   if (document.getElementById(popupId)) {
//     return;
//   }

//   const container = document.createElement("div");
//   container.id = popupId;
//   container.className = "fixed top-[10px] right-[20px] p-4 rounded-lg z-50 shadow-lg transition-opacity duration-300 ease-in-out";
//   document.body.appendChild(container);

//   const root = createRoot(container);

//   const handleClose = () => {
//     container.style.opacity = "0";

//     setTimeout(() => {
//       root.unmount();
//       container.remove();
//     }, 300);
//   };

//   root.render(<Popup onClose={handleClose} />);
// };

// showPopup();
