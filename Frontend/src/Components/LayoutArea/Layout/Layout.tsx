import { useEffect, useState } from "react";
import LandingPage from "../../LandingPageArea/LandingPage/LandingPage";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Router/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  const [isToken, setIsToken] = useState<boolean>(false);

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (token === true) {
      setIsToken(true);
    }
  }, [token]);
  console.log(isToken);

  return (
    <div className="Layout">
      {isToken ? (
        <div className="Home">
          <header>
            <Header />
          </header>
          <nav>
            <Menu />
          </nav>
          <main>
            <Routing isToken={isToken}/>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default Layout;
