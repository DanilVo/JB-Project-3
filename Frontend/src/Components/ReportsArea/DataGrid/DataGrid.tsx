import { Avatar, Box } from "@mui/material";
import { DataGrid as Datagrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import VacationModel from "../../../Models/VacationModel";
import { vacationStore } from "../../../Redux/VacationState";
import "./DataGrid.css";
import moment from "moment";

function DataGrid(): JSX.Element {
  const vacations: VacationModel[] = vacationStore.getState().vacations;
  console.log(vacations);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "vacationId", headerName: "Id", width: 50 },
      {
        field: "icon",
        headerName: "Flag",
        width: 60,
        sortable: false,
        filterable: false,
        // renderCell: (flags=> <Avatar src={flagIcon}/>)
      },
      { field: "destination", headerName: "Destination", width: 150 },
      { field: "followersCount", headerName: "Followers", width: 80 },
      { field: "price", headerName: "Price", width: 60 },
      {
        field: "vacationStartDate",
        headerName: "Start Date",
        width: 120,
        renderCell: (params) =>
          moment(params.row.vacationStartDate).format("YYYY-MM-DD"),
      },
      {
        field: "vacationEndDate",
        headerName: "End Date",
        width: 120,
        renderCell: (params) =>
          moment(params.row.vacationStartDate).format("YYYY-MM-DD"),
      },
    ],
    []
  );

  return (
    <Box sx={{height: ''}}>
      {vacations.length && (
        <Datagrid
          rows={vacations}
          columns={columns}
          getRowId={(row) => row.vacationUuid}
        />
      )}
    </Box>
  );
}

export default DataGrid;
