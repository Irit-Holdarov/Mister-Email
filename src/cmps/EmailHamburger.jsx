import { useState } from "react"


export function EmailHamburger() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleNav() {
    setIsMenuOpen(!isMenuOpen)
  }
  
  <div className="email-hamburger">
    <button className="hamburger-button" onClick={toggleNav}>
      {isMenuOpen ? 'X' : '☰'}
    </button>
  </div>
}