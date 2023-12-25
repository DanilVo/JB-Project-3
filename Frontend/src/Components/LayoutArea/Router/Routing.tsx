import { Route, Routes } from 'react-router-dom';
import Edit from '../../DataArea/Edit/Edit';
import Home from '../../HomeArea/Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import EditUser from '../../DataArea/EditUser/EditUser';

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Default Route */}
        <Route path="/" element={<Home />} />

        {/* Update Route */}
        <Route path="/edit/:vacationId" element={<Edit />} />

        {/* Update Route */}
        <Route path="edit/user/:userId" element={<EditUser />} />

        {/* Page not found Route*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
