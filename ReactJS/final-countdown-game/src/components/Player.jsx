import { useState, useRef } from 'react';

    /* LEARNING NOTE - 2 - When to use useRef and useState
    * When assigning a value using state we must evaluate whether we want 
    * the code to rerender after being updated and be reflected in the UI
    * (we would not use state for 'behind the scenes' values with no direct UI impact)
    * e.g. here we wouldnt derive playername from a useRef
    * as we need the component to be reevaluated and display playerName in the h2 once amended
    * useRef would not reexecute the component function
    * though we can useRef to gain direct DOM manipulation
    */
export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    /* LEARNING NOTE - 1 - Caution around useRef manipulating DOM directly
    * This assignment is more imperative than declarative code by changing the DOM directly 
    * than letting React amend the DOM.
    * We must be careful to not let useRef read and manipulate all values on the page
    * as that deviates from the general idea of react
    */
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}