import { Route, Routes } from 'react-router-dom';
import Login from '../../AuthArea/Login/Login';
import Register from '../../AuthArea/Register/Register';
import LandingPage from '../../LandingPageArea/LandingPage/LandingPage';

interface Parent {
  setChild: Function;
}

function NotAuthorizedRouting(prop: Parent): JSX.Element {
  return (
    <div className="NotAuthorizedRouting">
      <Routes>
        {/* landing Page */}
        <Route path="/landingPage" element={<LandingPage />} />

        {/* Register Route */}
        <Route
          path="/auth/register"
          element={<Register setChild={prop.setChild} />}
        />

        {/* Login Route */}
        <Route
          path="/auth/logIn"
          element={<Login setChild={prop.setChild} />}
        />

        {/* Default Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Page not found Route*/}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default NotAuthorizedRouting;
