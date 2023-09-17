'use client'

import { useState } from "react"



export default function Bot() {
  const [popup, setPopup] = useState(false)
  function botClick(){
    if(!popup){
      setPopup(true)
    }

    setInterval(()=>{
      setPopup(false)
    },2000)
  }


  return (
    <div
    className="BotMain"
  >
    <button onClick={botClick}>
      <img src="/pikachuBot.gif" alt="" />
      {popup && <p>pika!</p>}
    </button>
  </div>

  )
}
