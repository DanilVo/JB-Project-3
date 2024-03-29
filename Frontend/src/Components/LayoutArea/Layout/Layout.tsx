import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import UserModel from '../../../Models/UserModel';
import Header from '../Header/Header';
import NavMenu from '../Menu/Menu';
import NotAuthorizedRouting from '../Router/NotAuthorizedRoutes';
import Routing from '../Router/Routes';
import './Layout.css';

interface decodedToken {
  user: UserModel;
  iat: number;
  exp: number;
}

function Layout(): JSX.Element {
  const [userInSystem, setUserInSystem] = useState<boolean>(false);
  
  const [filterVacations, setFilterVacations] = useState<string>('');

  const [userRole, setUserRole] = useState<number>();

  const localStorageToken = localStorage.getItem('token');

  useEffect(() => {
    if (!localStorageToken) return;
    const token = JSON.stringify(localStorageToken);
    const decoded: decodedToken = jwtDecode(localStorageToken);
    setUserRole(decoded.user.roleId);
    if (token.length > 0 && Date.now() <= decoded.exp * 1000) {
      setUserInSystem(true);
    }
  }, [userInSystem]);

  return (
    <div className="Layout">
      {userInSystem ? (
        <div className="Home">
          <header>
            <Header setUserInSystem={setUserInSystem} />
          </header>
          <nav className="nav">
            <NavMenu
              userRole={userRole}
              setFilterVacations={setFilterVacations}
            />
          </nav>
          <main>
            <Routing
              filterVacations={filterVacations}
              setUserInSystem={setUserInSystem}
            />
          </main>
        </div>
      ) : (
        <NotAuthorizedRouting setUserInSystem={setUserInSystem} />
      )}
    </div>
  );
}

export default Layout;
