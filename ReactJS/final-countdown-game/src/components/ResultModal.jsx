import { forwardRef, useImperativeHandle, useRef } from 'react';
/* P2 - LEARNING NOTE - 5 - Purpose of React Portal
* Purpose of a portal is essentially to teleport the html code that
* will be renderered by the component into a different place in the DOM
* to accomplish this wrap the component in the createPortal method
* which takes two arguments the component and then the id of where in
* the index.html you're teleporting to
*/
import {createPortal} from 'react-dom'

/* P2 - LEARNING NOTE - 4 - Use forward ref react method when passing down ref in props
* When passing props down you must use the special forwardRef
* react function
*/
const ResultModal = forwardRef(({ targetTime, remainingTime, onReset}, ref) => {

  const dialog = useRef();
  const userLost = remainingTime <=0;
  const formattedRemainingTime =(remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime /(targetTime * 1000)) * 100);

  /* P2 - LEARNING NOTE - 3 - Why to use useImperativeHandle 
  * useImperativeHandle allows child components to expose certain functions or properties to parent components
  * in this scenario this is to detach the timerchallenge component from the resultmodal
  * this way we can define the exact method we want explicitly
  * to be used by any parent component, retaining flexibility of changes
  * */
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  })

  return createPortal(
    <dialog ref={dialog} className='result-modal' onClose={onReset}>
      {userLost && <h2>You lost </h2>}
      {!userLost &&  <h2> Your score {score} </h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button >Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;