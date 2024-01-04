import Chart from "../Chart/Chart";
import CsvReports from "../CsvReports/CsvReports";
import "./AllReports.css";

function AllReports(): JSX.Element {
    return (
        <div className="AllReports">
			<Chart/>
            <CsvReports/>
        </div>
    );
}

export default AllReports;
