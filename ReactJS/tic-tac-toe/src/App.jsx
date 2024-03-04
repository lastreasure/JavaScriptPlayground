import Player from "./components/Player"

function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialPlayerName="Player 1" symbol="O" />
          <Player initialPlayerName="Player 2" symbol="X" />
        </ol>
        </div>  
    </main>
  )
}

export default App
