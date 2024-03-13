import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  },[open])

  /* P5 - LEARNING NOTE - 4 - Another example of when to use useEffect 
  * This if statement wont work because the dialog jsx has not ran
  * when the dialog ref is defined so it's initially not set 
  * 
  * Error: Uncaught TypeError: can't access property "close", dialog.current is undefined
  */
  // if (open) {
  //   dialog.current.showModal();
  // } else {
  //   dialog.current.close();
  // }

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;



// Refactored code

// import { forwardRef, useImperativeHandle, useRef } from 'react';
// import { createPortal } from 'react-dom';

// const Modal = forwardRef(function Modal({ children }, ref) {
//   const dialog = useRef();

//   useImperativeHandle(ref, () => {
//     return {
//       open: () => {
//         dialog.current.showModal();
//       },
//       close: () => {
//         dialog.current.close();
//       },
//     };
//   });

//   return createPortal(
//     <dialog className="modal" ref={dialog}>
//       {children}
//     </dialog>,
//     document.getElementById('modal')
//   );
// });

// export default Modal;
