import { Route, Routes } from "react-router-dom";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
import EditUser from "../../DataArea/EditUser/EditUser";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import Home from "../../HomeArea/Home/Home";
import AllReports from "../../ReportsArea/AllReports/AllReports";
import PageNotFound from "../PageNotFound/PageNotFound";
import { authStore } from "../../../Redux/AuthState";
import { RoleModel } from "../../../Models/RoleModel";
import AboutTripBlitz from "../../AboutTripBlitz/AboutTripBlitz";
import PasswordRecovery from "../../AuthArea/PasswordRecovery/PasswordRecovery";

function Routing({
  filterVacations,
  setUserInSystem,
}: {
  filterVacations: string;
  setUserInSystem:Function
}): JSX.Element {
  const user = authStore.getState().user;
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
        {user.roleId === RoleModel.Admin && (
          <Route path="/edit/:vacationUuid" element={<EditVacation />} />
        )}

        {/* Update User */}
        <Route
          path="edit/user/:userUuid"
          element={<EditUser setUserInSystem={setUserInSystem} />}
        />

        {/* Add vacation */}
        {user.roleId === RoleModel.Admin && (
          <Route path="/add-vacation" element={<AddVacation />} />
        )}

        {/* About Trip Blitz */}
        <Route path="/about-us" element={<AboutTripBlitz />} />

        {/* Reports */}
        <Route
          path="/dashboard"
          element={
            authStore.getState().user.roleId === RoleModel.Admin ? (
              <AllReports />
            ) : (
              <PageNotFound />
            )
          }
        />

        <Route
          path="/home/vacation-card/:vacationUuid"
          element={<Home filterVacations={filterVacations} />}
        />

        {/* Password Recovery */}
        <Route path="/auth/passwordRecovery" element={<PasswordRecovery />} />

        {/* Page not found Route*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
