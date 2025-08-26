import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

function Layout() {
    return (
        <div className="app-layout">
            <Navbar />
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;