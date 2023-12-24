import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import NotAuthorizedRouting from '../Router/NotAuthorizedRoute';
import Routing from '../Router/Routing';
import './Layout.css';
import { jwtDecode } from 'jwt-decode';

function Layout(): JSX.Element {
  const [userInSystem, setUserInSystem] = useState<boolean>(false);

  const [isToken, setIsToken] = useState<boolean>(false);

  const localStorageToken = localStorage.getItem('token');

  useEffect(() => {
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
    setUserInSystem(false)
  }, [userInSystem]);

  return (
    <div className="Layout">
      {isToken ? (
        <div className="Home">
          <header>
            <Header setToken={setIsToken} />
          </header>
          <nav className="nav">
            <Menu />
          </nav>
          <main>
            <Routing />
          </main>
        </div>
      ) : (
        <NotAuthorizedRouting setChild={setUserInSystem} />
      )}
    </div>
  );
}

export default Layout;
