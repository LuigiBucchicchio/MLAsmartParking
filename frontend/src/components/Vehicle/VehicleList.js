import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

import ParkingService from "../Parking/ParkingService";

const vehicles = [];

// ParkingService.getParkingPlaces().then((response) => {
//   this.setState({ vehicles : response.data})
// });

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "plate",
    headerName: "Plate",
    width: 150,
    editable: false,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 150,
    editable: false,
  },
  {
    field: "type",
    headerName: "Type",
    width: 130,
    editable: false,
  },
  // {
  //   field: "actions",
  //   headerName: "Actions",
  //   sortable: false,
  //   width: 140,
  //   disableClickEventBubbling: true,
  //   renderCell: (params) => {
  //     return (
  //       <div
  //         className="d-flex justify-content-between align-items-center"
  //         style={{ cursor: "pointer" }}
  //       >
  //         <EditIcon index={params.row.id} />
  //       </div>
  //     );
  //   },
  // },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, DeleteIcon },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function VehicleList() {
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", height: 800, width: "80%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
