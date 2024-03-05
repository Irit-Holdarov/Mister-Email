
import { useState } from "react"

export function CheckBox({ email }) { // I can use the email prop here as needed
  const [isChecked, setIsChecked] = useState(false)

  function handleCheckboxChange() {
    setIsChecked(!isChecked)
  }

  return (
    <div className="check-box">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkbox-text">Select</span>
    </div>

  )
}