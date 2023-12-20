import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import NotAuthorizedRouting from '../Router/NotAuthorizedRoute';
import Routing from '../Router/Routing';
import './Layout.css';
import { jwtDecode } from 'jwt-decode';

function Layout(): JSX.Element {
  const [isToken, setIsToken] = useState<boolean>(false);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) return;
    const token = JSON.stringify(localStorageToken);
    const decoded = jwtDecode(localStorageToken);
    if (
      token.length > 0 &&
      token != 'null' &&
      Date.now() <= decoded.exp * 1000
    ) {
      setIsToken(true);
    }
  }, []);

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
          {/* <footer>
            <Footer />
          </footer> */}
        </div>
      ) : (
        <NotAuthorizedRouting />
      )}
    </div>
  );
}

export default Layout;
