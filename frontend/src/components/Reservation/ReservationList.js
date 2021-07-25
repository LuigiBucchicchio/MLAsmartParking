import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { duration, FormLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useAlert } from "react-alert";

import { getAllReservationOneDriver } from "./ReservationService";

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

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editElement, setEditElement] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getAllReservationOneDriver()
      .then((listReservation) => {
        if (listReservation.data.length === 0) {
          alert.info("Make a reservation to bee");
        }
        setReservations(listReservation.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditDialog = (timeToEdit) => {
    console.log("Edit dialog");
    setIsEditOpen(!isEditOpen);
  };

  const convertStringTimestampToDay = (string) => {
    const t = new Date(string);
    return `${t.toLocaleDateString()}`;
  };

  const convertStringTimestampToTime = (string) => {
    const t = new Date(string);
    return `${t.getHours()}:${t.getMinutes()}`;
  };

  const getReservationDuration = (startingTime, endingTime) => {
    const sTime = new Date(startingTime);
    const eTime = new Date(endingTime);

    const durationInMillis = eTime.getTime() - sTime.getTime();

    //Hour 3600000
    const hours = Math.floor(Math.round(durationInMillis / 3600000));
    // minute 60000
    const minutes = Math.floor(
      Math.round((durationInMillis % 3600000) / 60000)
    );

    // data to print
    if (hours === 0) {
      return `${minutes}m`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  const reservationsList = reservations.map((reservation) => (
    <TableRow key={reservation.id}>
      <TableCell>{reservation.vehiclePlate}</TableCell>
      <TableCell align="right" component="th" scope="row">
        {reservation.parkingPlaceAddress}
      </TableCell>
      <TableCell align="right" component="th" scope="row">
        {reservation.parkingPlaceSpot}
      </TableCell>
      <TableCell align="right" component="th" scope="row">
        {convertStringTimestampToDay(reservation.startingTime)}
      </TableCell>
      <TableCell align="right">
        {convertStringTimestampToTime(reservation.startingTime)}
      </TableCell>
      <TableCell align="right">
        {getReservationDuration(
          reservation.startingTime,
          reservation.endingTime
        )}
      </TableCell>

      {
        // check if you are in time to edit the reservation
        new Date(reservation.endingTime).getTime() - new Date().getTime() >
        0 ? (
          <TableCell align="right">
            <Button onClick={() => handleEditDialog(reservation.endingTime)}>
              <EditIcon />
            </Button>
          </TableCell>
        ) : (
          <TableCell />
        )
      }
    </TableRow>
  ));

  return (
    <Fragment>
      <div className={classes.alignItemsAndJustifyContent}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Plate</TableCell>
              <TableCell align="right">Parking Place Address</TableCell>
              <TableCell align="right">Parking Spot</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.length > 0 ? reservationsList : null}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isEditOpen}
        onClose={handleEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                minDate={new Date()}
                margin="normal"
                id="date-picker-inline"
                label="Choose your new ending date"
                //value={endingTime}
                //onChange={(date) => handleReservationSelected("time", date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Choose your new ending time"
              //value={endingTime}
              //onChange={(date) => handleReservationSelected("time", date)}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
