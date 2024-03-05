import {useState} from 'react';

const Player = ({initialPlayerName, symbol, isActive}) => {

  const [playerName, setPlayerName] = useState(initialPlayerName)
  const [isEditing, setIsEditing] = useState(false)


  function handleEditClick() {
    /* LEARNING NOTE - 1 - Why to pass state updates with a function
    * Pass a function rather than just the state to guarantee latest state value
    * this is because state updates are not instantaneous but scheduled 
    * e.g. having two consecutive states like so 
    * setIsEditing(!isEditing) -> state update scheduled
    * setIsEditing(!isEditing) -> state update executed on the same current state
    * would produce the same output as a single on due to them both being evaluated on the current state
    */ 
    setIsEditing((isEditing) => !isEditing)

  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName =  <span className="player-name">{playerName}</span>

  if(isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};

export default Player;