import Home from "../../HomeArea/LandingPage/LandingPage";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Router/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <Routing />
    </div>
  );
}

export default Layout;
