import { Link } from 'react-router-dom'


export function AppEmailHeader(){
  return(
    <header className="app-header">
      <section className="container">
      <Link to="/">
        <img src="/src/assets/imgs/logo_gmail.png" alt="Gmail"></img>
      </Link>
      </section>
    </header>
  )
}