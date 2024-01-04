import { Route, Routes } from "react-router-dom";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import EditUser from "../../DataArea/EditUser/EditUser";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddVacation from "../../DataArea/Add/AddVacation";
import AllReports from "../../ReportsArea/AllReports/AllReports";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Default Route */}
        <Route path="/" element={<Home />} />

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
