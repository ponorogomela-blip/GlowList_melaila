import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="d-flex flex-column w-100 min-vh-100">
            <Header />

            <div className="d-flex flex-grow-1">
                <Sidebar />

                <div className="container-fluid">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
