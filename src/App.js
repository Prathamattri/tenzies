import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App(){

  const [diceValues , setDiceValues] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
    const allHeld = diceValues.every(die => die.isHeld)
    const firstVal = diceValues[0].value
    const allSame = diceValues.every(die => die.value === firstVal)

    if(allHeld && allSame){
      setTenzies(true)
    }else(
      setTenzies(false)
    )

    // checkIfWon()
  }, [diceValues])
  
  // function for checking if Won tenzies

  /*function checkIfWon(){
    let flagHeld = 0
    let mySameValArr = []
    let flagVal = 0
    for (let index = 0; index < 10; index++) {
        if (diceValues[index].isHeld === true){
          flagHeld++;
          mySameValArr.push(diceValues[index].value)
        }
    }
    if(mySameValArr.length !== 0){
        for (let i=0;i<mySameValArr.length;i++){
            flagVal = flagVal ^ mySameValArr[i]
        }
    }
    if(flagHeld === 10 && flagVal === 0){
      setTenzies(true)
    }
  }
 ------------- */

  function allNewDice(){
    let diceArray=[]
    for(let i=0;i<10;i++){
      diceArray.push({
        'value':(Math.floor((Math.random() *6)+1)),
        'isHeld': false,
        'id':nanoid()
      })
    }
    return diceArray
  }
  
  function rollDice() {
    if(tenzies === false){
    setDiceValues(oldDice => oldDice.map(dice => {
      return !dice.isHeld ? {
        value:(Math.floor((Math.random() *6)+1)),
        isHeld: false,
        id: nanoid()
      } : dice
    }))} else {
      setDiceValues(allNewDice())
    }
  }

  function holdDice(userId){
    setDiceValues(oldDice => oldDice.map(dice => {
      return userId === dice.id 
            ? {...dice, isHeld:!dice.isHeld}
            : dice 
    }))
  }


  const diceElements =
  diceValues.map(dice => 
  <Die  id={dice.id} 
        key={dice.id}
        value={dice.value} 
        isHeld={dice.isHeld} 
        holdDice={!tenzies && holdDice} 
  />)
  const { width , height} = useWindowSize()
  return (
    <main className="app flex">
      {tenzies && <Confetti 
        width={width}
        height={height}
      />}
      <div className="info">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. 
          Click each die to freeze it at its 
          current value between rolls.</p>
      </div>
      <div className="dice_container">
        {diceElements}
      </div>
      <button
        onClick={rollDice}
        className="dice--roller"
      >
        {tenzies?"You Won 🎉 Click to play again":"Roll"}
      </button>
    </main>
  )
}