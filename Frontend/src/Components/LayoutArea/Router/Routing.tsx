import { Navigate, Route, Routes } from "react-router-dom";
import Add from "../../DataArea/Add/Add";
import List from "../../DataArea/List/List";
import LandingPage from "../../HomeArea/LandingPage/LandingPage";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
      <div className="Routing">
        <Routes>
          {/* Home Route */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* landing Page */}
          <Route path="/landingPage" element={<LandingPage />} />

          {/* List Route */}
          <Route path="/list" element={<List />} />

          {/* Add Route */}
          <Route path="/add" element={<Add />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/landingPage" />} />

          {/* Page not found Route*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    );
}

export default Routing;
