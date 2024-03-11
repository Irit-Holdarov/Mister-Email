import { useState } from "react"


export function UserMsg() {

  const [msg, setMsg] = useState(null)

  function onCloseMsg() {
    setMsg(null)
  }

  if (!msg) return <></>
  return (
    <div className={`user-msg ${msg.type}`}>
      <span className="user-msg-text">{msg.txt}</span>
      <button className="user-msg-close-button" onClick={onCloseMsg} />
    </div>
  )
}