import { useState } from "react"

export default function Cal(){

  const [operatorClicked, setOperatorClicked] = useState(false)
  const [oldValue, setOldValue] = useState("") 
  const [currentOperator, setCurrentOperator] = useState(null) 
  const [displayNum, setDisplayNum] = useState('0') 
  const btnValues=["CE","%","/","7","8","9","x","4","5","6","-","1","2","3","+","0",".","="]
  const handleNumberValue = (e) => {
    if (operatorClicked === false) {
      if (displayNum === "0" && e.target.value !== ".") {
        setDisplayNum(e.target.value)
      } else if (displayNum === "0" && e.target.value === ".") {
        setDisplayNum((prev) => prev + e.target.value)
      } else if (displayNum.includes(".") && e.target.value === ".") {
        setDisplayNum((prev) => prev)
      }else {
        setDisplayNum((prev) => prev + e.target.value)
      }
    } else if (operatorClicked === true) {
      setOldValue((prev)=>prev==="-"?prev+displayNum:displayNum)
      setDisplayNum(e.target.value)
      setOperatorClicked(false) 
    }
    
  }

  const handleOperatorValue = (e) => {
    if (displayNum==="0") {
        setOldValue(e.target.value)
        setCurrentOperator(null)  
      }if (e.target.value === "=") {
      handleCal()
      setOldValue("")
      setCurrentOperator(null)
    }else if (currentOperator!==null) {
       handleCal()
       setOldValue("")
       setOperatorClicked(true)
       setCurrentOperator(e.target.value)
    }else {
      setOperatorClicked(true)
      setCurrentOperator(e.target.value)
    }
  }

  const handleCal=()=>{
    if(currentOperator==="+"){
     setDisplayNum((prev)=>Number(oldValue) + Number(prev))
   }else if(currentOperator==="-"){
     setDisplayNum((prev)=>Number(oldValue) - Number(prev))
   } else if(currentOperator==="x"){
    setDisplayNum((prev)=>Number(oldValue) * Number(prev))
   } else if(currentOperator==="/"){
     setDisplayNum((prev)=>Number(oldValue) / Number(prev))
   } 

  }
const handlePer=()=>{
  setDisplayNum((prev)=> Number(prev)/100)
}
  const handleReset=()=>{
    setCurrentOperator(null)
    setDisplayNum("0")
    setOldValue("")
  }
  
  return(
   
  <div className="calculator-wrapper">
  <p className="display-screen">{displayNum}</p>  
  <div className="keys">
    {btnValues.map((val)=>
      <button
        key={val} 
        className={val==="=" ||val==="+"||val==="/"||val==="x"||val==="-"?"orange":val==="0"?"bg-dg zero":val==="CE"?"zero":"bg-dg"} 
        value={val}
        onClick=
        {val==="=" ||val==="+"||val==="/"||val==="x"||val==="-"
        ?handleOperatorValue
        :val==="CE"
        ?handleReset
        :val==="%"
        ?handlePer
        :handleNumberValue
        }
        >
        {val}
      </button>
    )}   
  </div>
</div>  
    )
}