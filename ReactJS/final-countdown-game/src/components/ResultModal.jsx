import { forwardRef, useImperativeHandle, useRef } from 'react';

/* LEARNING NOTE - 3 - use forward ref react method when passing down props
* When passing props down you must use the special forwardRef
* react function
*/
const ResultModal = forwardRef(({ result, targetTime}, ref) => {

  const dialog = useRef();
  /* LEARNING NOTE - 3 - why to useImperativeHandle
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

  return (
    <dialog ref={dialog} className='result-modal'>
      <h2>You {result} </h2>
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>X seconds left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;