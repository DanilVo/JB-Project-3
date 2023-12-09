import { Navigate, Route, Routes } from "react-router-dom";
import Add from "../../DataArea/Add/Add";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                {/* Home Route */}
                <Route path="/home" element={<Home />} />

                {/* List Route */}
                <Route path="/list" element={<List />} />

                {/* Add Route */}
                <Route path="/add" element={<Add />} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found Route*/}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
