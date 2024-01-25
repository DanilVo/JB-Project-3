import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import LandingPage from "../../LandingPageArea/LandingPage/LandingPage";
import PasswordRecovery from "../../AuthArea/PasswordRecovery/PasswordRecovery";

interface Parent {
  setUserInSystem: Function;
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
          element={<Register setUserInSystem={prop.setUserInSystem} />}
        />

        {/* Login Route */}
        <Route
          path="/auth/logIn"
          element={<Login setUserInSystem={prop.setUserInSystem} />}
        />

        {/* Password Recovery */}
        <Route
          path="/passwordRecovery"
          element={
            localStorage.getItem("verifyUser").length ? (
              <PasswordRecovery />
            ) : (
              <Login setUserInSystem={prop.setUserInSystem} />
            )
          }
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
