import { useState } from 'react'
import { Link } from 'react-router-dom'

export function AppEmailHeader() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  // function toggleNav() {
  //   setIsMenuOpen(!isMenuOpen)
  // }

  return (
    <header className="app-header">
      <section className="container">
        {/* <botton className="hamburger-button" onClick={toggleNav}>
          {isMenuOpen ? 'X' : '☰'}
        </botton> */}

        <Link to="/">
          <img className="email_logo" src="/src/assets/imgs/logo_gmail.png" alt="Gmail"></img>
        </Link>
      </section>
    </header>
  )
}