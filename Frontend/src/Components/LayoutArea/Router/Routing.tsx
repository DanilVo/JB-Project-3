import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../../AuthArea/Register/Register";
import LandingPage from "../../LandingPageArea/LandingPage/LandingPage";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
      <div className="Routing">
        <Routes>
          {/* Home Route */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* landing Page */}
          <Route path="/landingPage" element={<LandingPage />} />

          {/* Register Route */}
          <Route path="/auth/register" element={<Register />} />
          
          {/* Login Route */}
          <Route path="/auth/logIn" element={<Login />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/landingPage" />} />

          {/* Page not found Route*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
}

export default Routing;
