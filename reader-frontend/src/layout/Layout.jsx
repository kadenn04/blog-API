import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

function Layout() {
    return (
        <div className="app-layout">
            <Navbar />
            <Searchbar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;