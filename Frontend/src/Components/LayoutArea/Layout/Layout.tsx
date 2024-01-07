import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import NotAuthorizedRouting from '../Router/NotAuthorizedRoute';
import Routing from '../Router/Routing';
import './Layout.css';
import { jwtDecode } from 'jwt-decode';
import UserModel from '../../../Models/UserModel';

interface decodedToken {
  user: UserModel;
  iat: number;
  exp: number;
}

function Layout(): JSX.Element {
  const [userInSystem, setUserInSystem] = useState<boolean>(false);

  const [filterVacations, setFilterVacations] =
    useState<string>("All Vacations");
  

  const [userRole, setUserRole] = useState<number>();

  const [isToken, setIsToken] = useState<boolean>(false);

  const localStorageToken = localStorage.getItem('token');

  useEffect(() => {
    if (!localStorageToken) return;
    const token = JSON.stringify(localStorageToken);
    const decoded: decodedToken = jwtDecode(localStorageToken);
    setUserRole(decoded.user.roleId);
    if (
      token.length > 0 &&
      token != 'null' &&
      Date.now() <= decoded.exp * 1000
    ) {
      setIsToken(true);
    }
    setUserInSystem(false);
  }, [userInSystem]);

  return (
    <div className="Layout">
      {isToken ? (
        <div className="Home">
          <header>
            <Header setToken={setIsToken} />
          </header>
          <nav className="nav">
            <Menu userRole={userRole} setFilterVacations={setFilterVacations}/>
          </nav>
          <main>
            <Routing filterVacations={filterVacations}/>
          </main>
        </div>
      ) : (
        <NotAuthorizedRouting setUserInSystem={setUserInSystem} />
      )}
    </div>
  );
}

export default Layout;
