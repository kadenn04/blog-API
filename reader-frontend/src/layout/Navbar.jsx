import { Link, NavLink } from "react-router-dom";
import home from "../assets/home.svg"
import messages from "../assets/messages.svg"
import inbox from "../assets/inbox.svg"
import notifications from "../assets/notifications.svg"
import journal from "../assets/journal.svg"
import "./Navbar.css"

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <NavLink to="/" end>
                    <div className="icon-wrapper">
                        <img className="icon" id="logo-symbol" src={journal} alt="home" />
                    </div>
                </NavLink>
            </div>
            <div className="links">
                <NavLink to="/" end>
                    <div className="icon-wrapper">
                        <img className="icon" src={home} alt="home" />
                        <span className="icontext">Home</span>
                    </div>
                </NavLink>
                <NavLink to="/" end>
                    <div className="icon-wrapper">
                        <img className="icon" src={messages} alt="messages" />
                        <span className="icontext">Messages</span>
                    </div>
                </NavLink>
                <NavLink to="/" end>
                    <div className="icon-wrapper">
                        <img className="icon" src={inbox} alt="inbox" />
                        <span className="icontext">Inbox</span>
                    </div>
                </NavLink>
                <NavLink to="/" end>
                    <div className="icon-wrapper">
                        <img className="icon" src={notifications} alt="notifications" />
                        <span className="icontext">Notifications</span>
                    </div>
                </NavLink>
            </div>
        </nav>
    )
} 

export default Navbar;