import { useMatches, useNavigate } from "react-router-dom";
import backArrow from "../assets/backarrow.svg"
import "./Header.css"

function GoBack({children}) {
    let navigate = useNavigate();
    return (
        <span  onClick={() => { navigate(-1); }} className="go-back">
            {children}
    </span>
    )
}

function Header() {
    const matches = useMatches();
    const current = matches[matches.length - 1]
    const title = current?.handle?.title || "Untilted";

    return (
        <div className="header">
            <div className="title">
                {title != "Home" ? (
                    <GoBack >
                     <img className = "back-arrow" src={backArrow}></img>
                    </GoBack>
                ):(
                    null
                )}
                <span className="title-text">{title}</span>
            </div>
        </div>
    )
}

export default Header;