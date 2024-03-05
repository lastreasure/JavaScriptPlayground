import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null]
]

/* LEARNING NOTE - 2 - Be conscious of what variables need to be in state
* Helper function to remove activePlayer from state and derive from game turns state
* this aids with duplication of code and efficiency of code preventing unneeded re-renders
* replacing:
* const [activePlayer, setActivePlayer] = useState('X');
* setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
*/
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)
  const [players, setPlayers] = useState({'X': 'Player 1', 'O': 'Player 2'})
  // Creating a deep copy, so that when the game is reset so is the initial array
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square

    gameBoard[row][col] = player
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    // Extracting each winning combination 
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns]
      return updatedTurns
    })
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialPlayerName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialPlayerName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}  
          />
        </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard} />
        </div>  
        <Log turns={gameTurns}/>
    </main>
  )
}

export default App
