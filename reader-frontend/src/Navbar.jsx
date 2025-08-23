import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <NavLink to="/" end> Home </NavLink>
            </div>
            <div className="links">
                <NavLink to="/" end> Home </NavLink>
                <NavLink to="/" end> Profile </NavLink>
                <NavLink to="/" end> Messages </NavLink>
            </div>
        </nav>
    )
} 

export default Navbar;