import {useEffect} from 'react'

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    console.log('TIMER SET');
    // this function on it's own is not the prime issue, it's the clean up of this function
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    /* P5 - LEARNING NOTE - 5 - useEffect clean up function
     * Ensure that the timer is completed when the modal component is removed from the DOM
     */
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
