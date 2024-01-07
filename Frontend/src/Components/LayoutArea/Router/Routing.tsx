import { Route, Routes } from "react-router-dom";
import AddVacation from "../../DataArea/Add/AddVacation";
import EditUser from "../../DataArea/EditUser/EditUser";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import Home from "../../HomeArea/Home/Home";
import AllReports from "../../ReportsArea/AllReports/AllReports";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing({filterVacations}:{filterVacations:string}): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home Route */}
        <Route
          path="/home"
          element={<Home filterVacations={filterVacations} />}
        />

        {/* Default Route */}
        <Route path="/" element={<Home filterVacations={filterVacations} />} />

        {/* Update Vacation */}
        <Route path="/edit/:vacationUuid" element={<EditVacation />} />

        {/* Update User */}
        <Route path="edit/user/:userUuid" element={<EditUser />} />

        {/* Add vacation */}
        <Route path="/add-vacation" element={<AddVacation />} />

        {/* Reports */}
        <Route path="/reports" element={<AllReports />} />

        {/* Page not found Route*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
