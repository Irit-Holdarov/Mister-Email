import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SideBar } from './SideBar'


export function AppEmailHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleNav() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="app-header">
      <section className="container">

        <div className="email-hamburger">
          <button className="hamburger-button" onClick={toggleNav}>
            {isMenuOpen ? 'X' : '☰'}
          </button>
        </div>

        <Link to="/">
          <img className="email_logo" src="/src/assets/imgs/logo_gmail.png" alt="Gmail"></img>
        </Link>
      </section>

      {/* {isMenuOpen ? <SideBar className="show" /> : <SideBar />} */}
      {isMenuOpen && <SideBar/>}
    </header>
  )
}