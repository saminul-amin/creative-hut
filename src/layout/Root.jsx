import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Home from "../pages/Home";

export default function Root() {
    return <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
}