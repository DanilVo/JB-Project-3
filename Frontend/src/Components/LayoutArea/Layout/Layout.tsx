import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import NotAuthorizedRouting from '../Router/NotAuthorizedRoute';
import Routing from '../Router/Routing';
import './Layout.css';

function Layout(): JSX.Element {
  const [isToken, setIsToken] = useState<boolean>(false);

  const token = JSON.stringify(localStorage.getItem('token'));
  useEffect(() => {
    if (token.length > 0 && token != 'null') {
      setIsToken(true);
    }
  }, [token]);

  return (
    <div className="Layout">
      {isToken ? (
        <div className="Home">
          <header>
            <Header />
          </header>
          <nav className="nav">
            <Menu />
          </nav>
          <main>
            <Routing />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      ) : (
        <NotAuthorizedRouting />
      )}
    </div>
  );
}

export default Layout;
