import { Box } from "@mui/material";
import { DataGrid as Datagrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./DataGrid.css";

function DataGrid({ vacations }: { vacations: VacationModel[] }): JSX.Element {

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "vacationId", headerName: "Id", width: 80 },

      { field: "destination", headerName: "Destination", width: 140 },
      { field: "followersCount", headerName: "Followers", width: 80 },
      {
        field: "price",
        headerName: "Price",
        width: 60,
        renderCell: (params) => params.row.price + "$",
      },
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
    <Box
      sx={{
        height: "300px",
        borderRadius: 1,
        boxShadow: " 11px 11px 22px #acacac,-11px -11px 22px #ffffff;",
        bgcolor: "white",
      }}
    >
      {vacations?.length && (
        <Datagrid
          rows={vacations}
          columns={columns}
          getRowId={(row) => row.vacationUuid}
          rowSelection={false}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, vacations.length]}
        />
      )}
    </Box>
  );
}

export default DataGrid;
