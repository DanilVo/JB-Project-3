import { Box } from "@mui/material";
import { DataGrid as Datagrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import VacationModel from "../../../Models/VacationModel";
import "./DataGrid.css";

interface Props {
  vacations: VacationModel[];
  isNewVacations: boolean;
}

function DataGrid(props: Props): JSX.Element {
  console.log(props.vacations);
  
  const existingVacation: GridColDef[] = [
    { field: "vacationId", headerName: "Id", width: 80 },

    {
      field: "destination",
      headerName: "Destination",
      width: 140,
    },
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
  ];

  const addNewVacation: GridColDef[] = [
    {
      field: "destination",
      headerName: "Destination",
      width: 140,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 60,
      editable: true,
      renderCell: (params) => params.row.price + "$",
    },
    {
      field: "vacationStartDate",
      headerName: "Start Date",
      width: 120,
      editable: true,
      renderCell: (params) =>
        moment(params.row.vacationStartDate).format("YYYY-MM-DD"),
    },
    {
      field: "vacationEndDate",
      headerName: "End Date",
      width: 120,
      editable: true,
      renderCell: (params) =>
        moment(params.row.vacationStartDate).format("YYYY-MM-DD"),
    },
    {
      field:''
    }
  ];

  return (
    <Box
      sx={{
        height: "300px",
        borderRadius: 1,
        boxShadow: " 11px 11px 22px #acacac,-11px -11px 22px #ffffff;",
        bgcolor: "white",
      }}
    >
      {props.vacations?.length && (
        <Datagrid
          checkboxSelection={false}
          rows={props.vacations}
          columns={props.isNewVacations ? addNewVacation : existingVacation}
          getRowId={(row) => row.destination}
          rowSelection={false}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, props.vacations.length]}
        />
      )}
    </Box>
  );
}

export default DataGrid;
