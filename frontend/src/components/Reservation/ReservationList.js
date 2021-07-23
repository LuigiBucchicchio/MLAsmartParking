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

import { getAllReservationOneDriver } from "./ReservationService"

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
  const classes = useStyles();
  const alert = useAlert();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteElement, setDeleteElement] = useState("");
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    getAllReservationOneDriver()
    .then(listReservation => {
      
      if (listReservation.data === 0){
        alert.info("Reserve to be in this hall of fame")
      }
      setReservations(listReservation.data);
    }).catch(err => {
      console.log(err)
    })
  }, []);

  const handleAddDialog = () => {
    setIsAddOpen(!isAddOpen);
  };

  const handleDeleteDialog = (deleteReservation) => {
    console.log("Delete dialog");
    setDeleteElement(deleteReservation)
    console.log(deleteReservation)
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleDeleteReservation = () => {
  };

  // const reservationsList = reservations.map((reservation) => (
  //   <TableRow key={reservation.id}>
  //     <TableCell>{reservation.vehiclePlate}</TableCell>
  //     <TableCell align="right" component="th" scope="row">
  //       {reservation.parkingSpot}
  //     </TableCell>
  //     <TableCell align="right">{reservation.startingTime}</TableCell>
  //     <TableCell align="right">
  //       <Button onClick={() => handleDeleteDialog(reservation.endingTime)} >
  //         <DeleteIcon />
  //       </Button>
  //     </TableCell>  
  //   </TableRow>
  // ));

  return (
    <Fragment>
      <div className={classes.alignItemsAndJustifyContent}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Plate</TableCell>
              <TableCell align="right">Parking Place</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(reservations)}
          </TableBody>
        </Table>
      </div>
      <div className={classes.divButtonAdd}>
        <Button
          className={classes.buttonAdd}
          color="primary"
          onClick={handleAddDialog}
        >
          <AddCircle className={classes.addCircle} style={{ fontSize: 50 }} />
        </Button>
      </div>

    </Fragment>
  );
}
