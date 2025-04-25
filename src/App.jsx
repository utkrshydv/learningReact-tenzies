import { useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [tries, setTries] = useState(0)

  const [dice, setDice] = useState(() => generateAllNewDice())


  let gameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)

  if(gameWon){
    console.log("Game won!")
  }

  function generateAllNewDice(){
   return new Array(10)
    .fill(0)
    .map(() => ({
      value:  Math.ceil(Math.random()*6 + 0.00001), 
      isHeld: false,
      id: nanoid()
    }))
  }

  const buttonElements = dice.map((element) => {
    return(
      <Die 
      key={element.id}
      value={element.value}
      isHeld = {element.isHeld}
      hold = {hold}
      id = {element.id}
      />
    )    
  })

  function hold(id){
   setDice(prevArray => prevArray.map(die => {
    return die.id === id ? {...die, isHeld:!die.isHeld} : die
   })) 
  }
 


  function rollDice(){
    setDice(oldDice => oldDice.map(die => die.isHeld? 
      die:
      {...die, value:Math.ceil(Math.random()*6 + 0.0001)}
    ))

    setTries(prevTries => prevTries + 1)
  }

  function reset(){
    setDice(generateAllNewDice())

    setTries(0)
  }

  return (
    <main>

      {gameWon && <Confetti />}

      <h1 className="title">Tenzies</h1>

      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>

     <div className ="dice-container">
      {buttonElements}
     </div>
   <div>
    <button style={{marginRight:"10px"}}
     onClick={gameWon? reset : rollDice}
     className="roll">
      {gameWon? "New Game": "Roll 🎲"}</button>
     <button style={{marginRight:"10px"}}
     className="tries">Tries: {tries} </button>
     <button
     className="reset"
     onClick={reset}
     >Reset </button>
   </div>
     

    </main>

  )
}


