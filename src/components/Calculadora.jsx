import './Calculadora.css'

import React from 'react'
import { useState } from 'react'

const Calculadora = () => {

  const numbers = ['1','2','3','4','5','6','7','8','9','0']
  const operations = ['+','-','*','/']

  const [currentValue, setCurrentValue] = useState('0')
  const [completeValue, setCompleteValue] = useState('')
  const [pendingValue, setPendingValue] = useState('')
  const [pendingOperation, setPendingOperation] = useState('')

  const handleClear = ()=> 
  {
    setCurrentValue('0')
    setCompleteValue('')
    setPendingOperation('')
    setPendingValue('')
  }

  const handleClick = (num)=>
  {
    setCurrentValue((prevValue) => 
    {
      if(prevValue !== '0'){
        return prevValue + num
      }
      return num
    })
    setCompleteValue(()=> completeValue + num)
  }

  const handleOperation = (operation)=> {
    setPendingValue(currentValue)
    setCurrentValue('0')
    setPendingOperation(operation)
    setCompleteValue((prevVal)=> prevVal + ' ' + operation + ' ')
  }

  const handleCalc = ()=>{

    const num1 = parseFloat(pendingValue)
    const num2 = parseFloat(currentValue)

    let result

    switch(pendingOperation){
      case '+':
        result = num1 + num2
        break
      case '-':
        result = num1 - num2
        break
      case '*':
        result = num1 * num2
        break
      case '/':
        if(num2 === 0){
          return result = 'ERROR, PRESS AC'
        }
        result = num1 / num2
        break
    }
    setCurrentValue(result.toString())
    setCompleteValue(result.toString())
  }

  return (
    <div className="calculator">
      <div className="complete-result">{completeValue}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={()=> handleClear()}>AC</button>
        {numbers.map((num)=> (
          <button onClick={()=> handleClick(num)} key={num}>{num}</button>
        ))
        }
        {operations.map((operation)=>(
          <button onClick={()=> handleOperation(operation)} key={operation}>{operation}</button>
        ))
        }
        <button onClick={()=> handleCalc()}>=</button>
      </div>
    </div>
  )
}

export default Calculadora