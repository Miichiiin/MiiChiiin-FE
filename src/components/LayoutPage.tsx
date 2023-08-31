
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import Index from "./Index";
import Footer from "./Footer";


const LayoutWebsite = () => {
    return <div>
        <Header/>
        <Search/>
        <Outlet/>
        <Footer/>
    </div>;
};

export default LayoutWebsite;
