import { NavLink } from 'react-router-dom'
import imgUrl from '../assets/imgs/images.png'

export function Home() {
    return (
        <section className="home">
            <nav className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/email/inbox">Emails</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            <h1>Welcome to Gmail</h1>
            <img src={imgUrl} alt="" />
        </section>


    )
}
