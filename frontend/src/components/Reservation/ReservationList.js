import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useAlert } from "react-alert";

const useStyles = makeStyles({
  addCircle: {
    maxWidth: 100,
    height: 100,
  },
  backgroundWallpaper: {
    backgroundColor: "grey",
  },
  marginAutoContainer: {
    display: "flex",
    backgroundColor: "gold",
  },
  marginAutoItem: {
    margin: "auto",
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },

  centeredIcon: {
    display: "flex",
    alignItems: "center",
  },
  divButtonAdd: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  buttonAdd: {
    justifyContent: "center",
  },
});

export default function ReservationList() {
//   const classes = useStyles();
//   const alert = useAlert();

//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [deleteElement, setDeleteElement] = useState("");
  

//   const handleAddDialog = () => {
//     setIsAddOpen(!isAddOpen);
//   };

//   const handleDeleteDialog = (deleteReservation) => {
//     console.log("Delete dialog");
//     setDeleteElement(deleteReservation)
//     console.log(deleteReservation)
//     setIsDeleteOpen(!isDeleteOpen);
//   };


//   const handleDeleteReservation = () => {
//   };



//   useEffect(() => {

//   }, []);

//   const vehiclesList = reservations.map((reservation) => (
//     <TableRow key={reservation.id}>
//       <TableCell>{reservation.vehiclePlate}</TableCell>
//       <TableCell align="right" component="th" scope="row">
//         {vehicle.parkingSpot}
//       </TableCell>
//       <TableCell align="right">{reservation.startingTime}</TableCell>
//       <TableCell align="right">
//         <Button onClick={() => handleDeleteDialog(reservation.endingTime)} >
//           <DeleteIcon />
//         </Button>
//       </TableCell>
      
//     </TableRow>
//   ));

//   return (
//     <Fragment>
//       <div className={classes.alignItemsAndJustifyContent}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Plate</TableCell>
//               <TableCell align="right">Brand</TableCell>
//               <TableCell align="right">Type</TableCell>
//               <TableCell align="right"></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {vehiclesList}
//             {/* <TableContainer component={Paper}>{cars}</TableContainer> */}
//           </TableBody>
//         </Table>
//       </div>
//       <div className={classes.divButtonAdd}>
//         <Button
//           className={classes.buttonAdd}
//           color="primary"
//           onClick={handleAddDialog}
//         >
//           <AddCircle className={classes.addCircle} style={{ fontSize: 50 }} />
//         </Button>
//       </div>

//       <Dialog
//         open={isDeleteOpen}
//         onClose={handleDeleteDialog}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle>Are you sure you want to delete this?</DialogTitle>
//         <DialogContent>
//           <DialogActions>
//           <Button onClick={handleDeleteDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteVehicle} color="primary">
//             Yes
//           </Button>
//           </DialogActions>
//         </DialogContent>
//       </Dialog>

//       <Dialog
//         open={isAddOpen}
//         onClose={handleAddDialog}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Add a new Vehicle</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Target Plate*"
//             type="text"
//             fullWidth
//             onChange={handleVehiclePlate}
//           />
//           <TextField
//             margin="dense"
//             id="name"
//             label="Brand*"
//             type="text"
//             fullWidth
//             onChange={handleBrand}
//           />

//           <FormLabel component="legend">Type*</FormLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             style={{ width: 70 }}
//             value={type}
//             onChange={handleType}
//           >
//             <MenuItem value={"CAR"}>CAR</MenuItem>
//             <MenuItem value={"MOTORCYCLE"}>MOTORCYCLE</MenuItem>
//             <MenuItem value={"AUTOBUS"}>AUTOBUS</MenuItem>
//             <MenuItem value={"MOTORCARRIAGE"}>MOTORCARRIAGE</MenuItem>
//             <MenuItem value={"CARTRIDGE"}>CARTRIDGE</MenuItem>
//             <MenuItem value={"CYCLOMOTOR"}>CYCLOMOTOR</MenuItem>
//             <MenuItem value={"MACHINE_OPERATOR"}>MACHINE OPERATOR</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleNewVehicle} color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Fragment>
//   );
}
